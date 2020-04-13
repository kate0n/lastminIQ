import React from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"

const QuizStart = () => {
  const { state } = React.useContext(Context)
  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="quiz-start">
        <div className="quiz-start__wrapper">
          <QuizHeader />
          <div className="quiz-start__title text-lg">
            {state.dictionary.info.startActionText}
          </div>

          <div className="quiz-start__desc text-sm">
            {state.dictionary.info.startHintText}
          </div>
        </div>
        <Button
          text={state.dictionary.info.startBtnText}
          className="green"
          link="question-page"
        />
      </div>
    </Layout>
  )
}

export default QuizStart
