import React from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import TextOverlay from "../components/text-overlay"
import Context from "../context/Context"
import "../styles/index.scss"

const PaymentConfirmationPage = () => {
  const { state } = React.useContext(Context)
  console.log("!!!", state.dictionary.info.paymentSuccessActionText)

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
              __html: state.dictionary.info.paymentSuccessActionText.replace(
                "{additionalPartCount}",
                state.questionCount - state.intermediatePart
              ),
            }}
          />
          <div className="quiz-start__desc text-sm">
            {state.dictionary.info.paymentSuccessHintText.replace(
              "{accrualPoints}",
              state.dictionary.settings.accrualPoints
            )}
          </div>
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
