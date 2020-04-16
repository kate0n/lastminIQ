import React from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import TextOverlay from "../components/text-overlay"
import Context from "../context/Context"
import "../styles/index.scss"

const ContinuePage = () => {
  const { state } = React.useContext(Context)
  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="quiz-start">
        <div className="quiz-start__wrapper">
          <QuizHeader />
          <TextOverlay text={state.dictionary.info.continueActionText} />
          <div className="quiz-start__desc text-sm">
            {state.dictionary.info.startHintText.replace(
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

export default ContinuePage
