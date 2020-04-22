import React, { useMemo, useState } from "react"
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import { UserObject } from "../utils/userObject"
import "../styles/index.scss"

const useOptions = () => {
  const options = useMemo(
    () => ({
      supportedCountries: ["SEPA"],

      style: {
        base: {
          fontSize: "17px",
          color: "#424770",
          letterSpacing: "0.025em",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  )

  return options
}

let stripeToken =
  (typeof document !== `undefined` && localStorage.getItem("stripeToken")) ||
  "pk_test_QOjrIQfNwuLcE4LpNOPWeU50"
const stripePromise = loadStripe(stripeToken)

const Form = () => {
  const { state, dispatch } = React.useContext(Context)
  console.log("stripeToken", stripeToken)
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()
  const userObject = UserObject()
  const [isPaymentFailed, setIsPaymentFailed] = React.useState(false)
  const [isPaymentProcessing, setIsPaymentProcessing] = React.useState(false)
  const [resultText, setResultText] = React.useState("Payment failed")

  const [isChecked, setIsChecked] = useState({
    default: false,
    showMsg: false,
  })

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    if (!isChecked.default) {
      setIsChecked({
        default: false,
        showMsg: true,
      })
      return
    }

    const name = event.target.name.value
    const email = event.target.email.value

    const orderData = {
      items: [{ id: "subscription" }],
      currency: "eur",
    }

    // <========== СОЗДАНИЕ ПЛАТЕЖНОГО МЕТОДА ============
    const payload = await stripe
      .createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          email: email,
          name: name,
        },
      })
      .then(result => {
        // console.log("createPaymentMethod result", result)
        setIsPaymentProcessing(true)
        if (result.error) {
          setIsPaymentProcessing(false)
          setIsPaymentFailed(true)
          console.log("result.error", result.error)
        } else {
          orderData.paymentMethodId = result.paymentMethod.id
          return fetch("https://lastmin.makaroff.tech/pay", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          })
        }
      })
      .then(function(result) {
        return result.json()
      })
      .then(function(response) {
        if (response.error) {
          console.log("PAYMENT FAILED", response.error)
          setIsPaymentProcessing(false)
          setIsPaymentFailed(true)
          setResultText(response.error)
        } else if (response.requiresAction) {
          // Request authentication
          handleAction(response.clientSecret)
        } else {
          orderComplete(response.clientSecret)
          sendUpdatedUserToServer(name, email)
        }
      })

    console.log("[PaymentMethod]", payload)
  }

  /* Shows a success / error message when the payment is complete */
  const orderComplete = function(clientSecret) {
    stripe.retrievePaymentIntent(clientSecret).then(function(result) {
      const paymentIntent = result.paymentIntent
      const paymentIntentJson = JSON.stringify(paymentIntent, null, 2)
      console.log("paymentIntentJson", paymentIntentJson)
    })
  }

  // name, email, payment_ok to servevr
  const sendUpdatedUserToServer = (name, email) => {
    // обновляем локальный стейт
    dispatch({ type: "ADD_SUBSCRIPTION", payload: true })
    // отправлем на север
    userObject.username = name
    userObject.email = email
    userObject.payment_ok = true

    console.log("userObject", userObject)

    const userObjectURI = `username=${encodeURI(
      userObject.username
    )}&email=${encodeURI(userObject.email)}&facebook_id=${encodeURI(
      userObject.facebook_id
    )}&progress=${encodeURI(userObject.progress)}&current_question=${encodeURI(
      userObject.current_question
    )}&stripe_id=${encodeURI(userObject.stripe_id)}&payment_ok=${encodeURI(
      userObject.payment_ok
    )}&localize=${userObject.localize}`

    fetch("https://lastmin.makaroff.tech/update_user", {
      method: "POST",
      headers: {
        "cache-control": "no-cache",
        pragma: "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: userObjectURI,
    })
      .then(reponse => console.log("UPDATE RESPONSE", reponse))
      .then(navigate("/payment-confirmation-page"))
  }

  // Request authentication
  const handleAction = function(clientSecret) {
    stripe.handleCardAction(clientSecret).then(function(data) {
      if (data.error) {
        setIsPaymentProcessing(false)
        setIsPaymentFailed(true)
        setResultText("Your card was not authenticated, please try again")
      } else if (data.paymentIntent.status === "requires_confirmation") {
        fetch("https://lastmin.makaroff.tech/pay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: data.paymentIntent.id,
          }),
        })
          .then(function(result) {
            return result.json()
          })
          .then(function(json) {
            if (json.error) {
              setIsPaymentProcessing(false)
              setIsPaymentFailed(true)
              setResultText(json.error)
            } else {
              orderComplete(clientSecret)
            }
          })
      }
    })
  }

  const checxbox = state.isBrowser && document.getElementById("checkbox")

  const handleCheckbox = () => {
    console.log("checxbox.checked", state.isBrowser && checxbox.checked)
    state.isBrowser &&
      checxbox.checked &&
      setIsChecked({
        default: true,
        showMsg: false,
      })
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            className="payment-page__input"
            name="email"
            type="email"
            placeholder="jane.doe@example.com"
            required
          />
        </label>
        <label>
          Name
          <input
            className="payment-page__input"
            name="name"
            type="text"
            placeholder="Jane Doe"
            required
          />
        </label>

        <label>
          Card number
          <CardNumberElement
            options={options}
            onReady={() => {
              console.log("CardNumberElement [ready]")
            }}
            onChange={event => {
              console.log("CardNumberElement [change]", event)
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]")
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]")
            }}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            options={options}
            onReady={() => {
              console.log("CardNumberElement [ready]")
            }}
            onChange={event => {
              console.log("CardNumberElement [change]", event)
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]")
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]")
            }}
          />
        </label>
        <label>
          CVC
          <CardCvcElement
            options={options}
            onReady={() => {
              console.log("CardNumberElement [ready]")
            }}
            onChange={event => {
              console.log("CardNumberElement [change]", event)
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]")
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]")
            }}
          />
        </label>
        <div>
          <div className="payment-page__agree">
            <input
              type="checkbox"
              // required
              id="checkbox"
              onChange={handleCheckbox}
            />
            I agree with
            <a
              href="/IQ_Master_service_Terms_And_Conditions.pdf"
              target="__blank"
            >
              <b>Terms and conditions</b>
            </a>
          </div>
          {isChecked.showMsg && (
            <p className="eror-msg">Confirmation required to continue</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!stripe || isPaymentProcessing}
          className="payment-button"
        >
          {isPaymentProcessing
            ? "Processing..."
            : state.dictionary.info.paymentBtnText}
        </button>
      </form>
      <div
        className={`${
          isPaymentFailed
            ? "payment-page__failed-msg--show"
            : "payment-page__failed-msg"
        }`}
      >
        {resultText}
      </div>
    </>
  )
}

const PaymentPage = () => {
  return (
    <>
      <Layout>
        <QuizHeader />
        <div className="payment-page">
          <Elements stripe={stripePromise}>
            <Form />
          </Elements>
        </div>
      </Layout>
    </>
  )
}

export default PaymentPage
