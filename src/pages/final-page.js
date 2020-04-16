import React from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import TextOverlay from "../components/text-overlay"
import Context from "../context/Context"
import { CurrentProgress } from "../utils/isUserHaveFreeQuestions"
import "../styles/index.scss"

const FinalPage = () => {
  const { state } = React.useContext(Context)

  const currentProgress = CurrentProgress()

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="quiz-start">
        <div className="quiz-start__wrapper">
          <QuizHeader />
          <TextOverlay
            text={state.dictionary.info.finalPageText
              .replace("{currentProgress}", currentProgress)
              .replace("{currentProgress}", currentProgress)}
          />
        </div>
        <Button
          text={state.dictionary.info.finalPageBtnText}
          className="green"
          link="/home-page"
        />
      </div>
    </Layout>
  )
}

export default FinalPage
