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
import StripeCheckout from "react-stripe-checkout"
import Layout from "../components/layout"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import { StatusArray } from "../utils/statusArray"

const useOptions = () => {
  const options = useMemo(
    () => ({
      supportedCountries: ["SEPA"],

      style: {
        base: {
          fontSize: "17px",
          color: "#424770",
          letterSpacing: "0.025em",
          // fontFamily: "Source Code Pro, monospace",
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

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh")

const Form = () => {
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billingDetails: {
        email: event.target.email.value,
        name: event.target.name.value,
      },
    })

    console.log("[PaymentMethod]", payload)
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <input type="checkbox" />I agree with
        <a href="">
          <b>Terms and conditions</b>
        </a>
      </div>
      <button type="submit" disabled={!stripe} className="payment-button">
        Pay 1€
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
