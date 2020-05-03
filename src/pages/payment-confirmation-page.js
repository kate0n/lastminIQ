import React from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import "../styles/index.scss"
import { Replace } from "../utils/isUserHaveFreeQuestions"

const PaymentConfirmationPage = () => {
  const { state } = React.useContext(Context)

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="quiz-start">
        <div className="quiz-start__wrapper">
          <QuizHeader />
          <div
            className="quiz-start__title text-md"
            dangerouslySetInnerHTML={{
              __html: Replace(state.dictionary.info.paymentSuccessActionText),
            }}
          />
          <div
            className="quiz-start__desc text-sm"
            dangerouslySetInnerHTML={{
              __html: Replace(state.dictionary.info.paymentSuccessHintText),
            }}
          />
        </div>
        <Button
          text={state.dictionary.info.continueBtnText}
          className="green"
          link="/question-page"
        />
      </div>
    </Layout>
  )
}

export default PaymentConfirmationPage
