import React from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import TextOverlay from "../components/text-overlay"
import Context from "../context/Context"

const MasterFinalPage = () => {
  const { state } = React.useContext(Context)

  const score =
    (state.isBrowser && localStorage.getItem("score")) || state.score

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="quiz-start">
        <div className="quiz-start__wrapper">
          <QuizHeader />
          <TextOverlay
            text={state.dictionary.info.masterFinalPage
              .replace("{totalScore}", score)
              .replace("{totalScore}", score)}
          />
        </div>
        <Button
          text={state.dictionary.info.masterFinalBtnText}
          className="green"
          link="/home-page"
        />
      </div>
    </Layout>
  )
}

export default MasterFinalPage
