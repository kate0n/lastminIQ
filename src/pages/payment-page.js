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
      // CREATE CUSTOMER and SUBSCRIPTION (server-side)
      .then(result => {
        setIsPaymentProcessing(true)
        if (result.error) {
          setIsPaymentProcessing(false)
          setIsPaymentFailed(true)
          console.error("createPaymentMethod error", result.error)
        } else {
          return fetch(`${state.url}/create-customer`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              payment_method: result.paymentMethod.id,
            }),
          })
        }
      })
      .then(result => {
        return result.json()
      })
      // HANDLE SUBSCRIPTION object from server
      .then(subscription => {
        if (subscription.error) {
          console.error("CREATE CUSTOMER server error", subscription.error)
          setIsPaymentProcessing(false)
          setIsPaymentFailed(true)
          setResultText(subscription.error)
          // ТРЕБУЕТСЯ ПОДТВЕРЖДЕНИЕ
        } else {
          userObject.stripe_id = subscription.id
          userObject.username = name
          userObject.email = email
          handleSubsciption(subscription)
        }
        console.log("[PaymentMethod]", payload)
      })
  }

  const handleSubsciption = subscription => {
    const { latest_invoice } = subscription
    const { payment_intent } = latest_invoice

    if (payment_intent) {
      const { client_secret, status } = payment_intent

      if (status === "requires_action") {
        confirmPayment(client_secret, subscription.id)
      } else {
        sendUpdatedUserToServer()
      }
    } else {
      sendUpdatedUserToServer()
    }
  }

  // name, email, payment_ok to servevr
  const sendUpdatedUserToServer = () => {
    // обновляем локальный стейт
    console.log("sendUpdatedUserToServer userObject", userObject)
    dispatch({ type: "ADD_SUBSCRIPTION", payload: true })
    dispatch({ type: "STRIPE_ID", payload: userObject.stripe_id })

    const userObjectURI = `username=${encodeURI(
      userObject.username
    )}&email=${encodeURI(userObject.email)}&facebook_id=${encodeURI(
      userObject.facebook_id
    )}&progress=${encodeURI(userObject.progress)}&current_question=${encodeURI(
      userObject.current_question
    )}&stripe_id=${encodeURI(userObject.stripe_id)}&payment_ok=${encodeURI(
      userObject.payment_ok
    )}&localize=${userObject.localize}`

    fetch(`${state.url}/update_user`, {
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

  // НУЖНА ПРОВЕРКА (status === 'require_action')
  const confirmPayment = function(client_secret, subscription_id) {
    stripe.confirmCardPayment(client_secret).then(data => {
      if (data.error) {
        console.error("error stripe confirming payment", data.error)
        setIsPaymentProcessing(false)
        setIsPaymentFailed(true)
        setResultText("Your card was not authenticated, please try again")
      }
      // CONFIRM SUBSCRIBTION to server
      else if (data.paymentIntent.status === "requires_confirmation") {
        fetch(`${state.url}/subscription`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: subscription_id,
          }),
        })
          .then(result => {
            return result.json()
          })
          .then(json => {
            if (json.error) {
              console.error("error server confirming payment", json.error)
              setIsPaymentProcessing(false)
              setIsPaymentFailed(true)
              setResultText(json.error)
            } else {
              sendUpdatedUserToServer()
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
      <form onSubmit={handleSubmit} noValidate>
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
