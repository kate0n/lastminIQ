import React from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import { CurrentProgress } from "../utils/isUserHaveFreeQuestions"
import "../styles/index.scss"

const FinalPage = () => {
  const { state } = React.useContext(Context)

  const currentProgress = CurrentProgress()

  // кол-во верных ответов
  const accuralPointsToAnswer =
    currentProgress / state.dictionary.settings.accrualPoints

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
              __html: state.dictionary.info.finalPageText
                .replace("{accuralPointsToAnswer}", accuralPointsToAnswer)
                .replace("{questionCount}", state.questionCount)
                .replace(
                  "{accrualPoints}",
                  state.dictionary.settings.accrualPoints
                )
                .replace("{currentProgress}", currentProgress)
                .replace("{currentProgress}", currentProgress)
                .replace("{awardDate}", state.dictionary.settings.awardDate),
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
