import React, { useEffect } from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import "../styles/index.scss"

const SubsriptionOffer = () => {
  const { state } = React.useContext(Context)

  // const currentProgress =
  //   (state.isBrowser && localStorage.getItem("score")) || state.score

  useEffect(() => {
    state.isBrowser && document.body.scrollTo(0, 0)
  }, [])

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="quiz-start" style={{ justifyContent: "flex-start" }}>
        <div className="quiz-start__wrapper">
          <QuizHeader />
          <div className="quiz-start__title text-md">
            {state.dictionary.info.subscribeOfferActionText
              .replace(
                "{accrualPoints}",
                state.dictionary.settings.accrualPoints
              )
              .replace(
                "{additionalPartCount}",
                state.questionCount - state.intermediatePart
              )}
          </div>
        </div>
        <div className="subcription">
          <Button
            text={state.dictionary.info.subscribeOfferYesBtnText}
            className="green"
            link="/payment-page"
          />
          <Button
            text={state.dictionary.info.subscribeOfferNoBtnText}
            className="gray"
            link="/intermediate-page"
            locationState={{ isFinalPage: true }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default SubsriptionOffer
