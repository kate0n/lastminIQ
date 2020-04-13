import React from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import TextOverlay from "../components/text-overlay"
import Context from "../context/Context"

const SubsriptionOffer = () => {
  const { state } = React.useContext(Context)

  const score =
    (state.isBrowser && localStorage.getItem("score")) || state.score

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="quiz-start" style={{ justifyContent: "flex-start" }}>
        <div className="quiz-start__wrapper">
          <QuizHeader />
          <TextOverlay
            text={state.dictionary.info.subscribeOfferActionText
              .replace("{totalScore}", score)
              .replace("{totalScore}", score)}
          />
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
            link="/final-page"
            locationState={{ isFinalPage: true }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default SubsriptionOffer
