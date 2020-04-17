import React, { useMemo } from "react"
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import { StatusArray } from "../utils/statusArray"
import * as config from "../../static/locale/EN.json"
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

const stripePromise = loadStripe(config.settings.stipeToken)

const Form = () => {
  const { state, dispatch } = React.useContext(Context)
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()
  const statusArray = StatusArray()
  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }
    //const { token } = await stripe.createToken()

    //   stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
    //   payment_method: {
    //     card: cardElement,
    //     billing_details: {
    //       name: 'Jenny Rosen',
    //     },
    //   },
    // })
    // .then(function(result) {
    // Handle result.error or result.paymentIntent
    // });

    const name = event.target.name.value
    const email = event.target.email.value

    const payload = await stripe
      .createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          email: email,
          name: name,
        },
      })
      .then(function(result) {
        console.log("createPaymentMethod result", result)
      })
    // PAYMENT METHOD CREATED, POST TO SERVER TO CREATE INTENT  server send secret key
    // IF SUCCESS res.status === 200 &&
    dispatch({ type: "ADD_SUBSCRIPTION", payload: true })
    statusArray[3] = true
    // statusArray[5] = name
    // statusArray[6] = email

    fetch("/api/updateStatusForUser", {
      method: "POST",
      body: JSON.stringify(statusArray),
    })
      .then(response => response)
      .then(navigate("/payment-confirmation-page"))
    // .then(updatedUser => console.log("UPDATED USER:", updatedUser))

    console.log("[PaymentMethod]", payload)
  }

  return (
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
      <div className="payment-page__agree">
        <input type="checkbox" required />I agree with
        <a href="">
          <b>Terms and conditions</b>
        </a>
      </div>
      <button type="submit" disabled={!stripe} className="payment-button">
        1.99 EUR
      </button>
    </form>
  )
}

const PaymentPage = () => (
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

export default PaymentPage
