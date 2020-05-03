import React from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import "../styles/index.scss"
import { Replace } from "../utils/isUserHaveFreeQuestions"

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
          <div
            className="quiz-start__title text-md"
            dangerouslySetInnerHTML={{
              __html: Replace(state.dictionary.info.startActionText),
            }}
          />
          <div
            className="quiz-start__desc text-sm"
            dangerouslySetInnerHTML={{
              __html: Replace(state.dictionary.info.startHintText),
            }}
          />
        </div>
        <Button
          text={state.dictionary.info.startBtnText}
          className="green"
          link="question-page"
        />
        <div className="quiz-start__agree">
          <a
            href="/lastmin_Travel_quiz_Terms_and_Conditions.pdf"
            target="__blank"
          >
            <b>Terms and conditions</b>
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default QuizStart
