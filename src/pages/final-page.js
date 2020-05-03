import React from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import { Replace } from "../utils/isUserHaveFreeQuestions"
import "../styles/index.scss"

// MASTER FINAL PAGE после исчерпания всех вопросов

const FinalPage = () => {
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
              __html: Replace(state.dictionary.info.finalPageText),
            }}
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
