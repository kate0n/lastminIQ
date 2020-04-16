import React from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import IsUserHaveFreeQuestion, {
  IsSubsribtionOffer,
} from "../utils/isUserHaveFreeQuestions"
import "../styles/index.scss"

const AnswerResultPage = ({ location }) => {
  const { isCorrect, correctAnswer, commentText, imgLink } =
    location.state || ""

  const { state } = React.useContext(Context)

  const isUserHaveFreeQuestions = IsUserHaveFreeQuestion()
  const isSubsribtionOffer = IsSubsribtionOffer()

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="result-page">
        {/* <div className="result-page__wrapper"> */}
        <QuizHeader />
        <div
          className={
            isCorrect
              ? "result-page__title--correct text-sm"
              : "result-page__title--incorrect text-sm"
          }
        >
          {isCorrect
            ? state.dictionary.info.correctAnswerTitleText
            : state.dictionary.info.incorrectAnswerTitleText.replace(
                "{correctAnswer}",
                correctAnswer
              )}
        </div>

        <div className="result-page__img-wrapper text-gray">
          <img src={imgLink} alt="correct answer img" />
        </div>

        <div className="result-page__comment text-sm">{commentText}</div>
        <Button
          text="Continue"
          className="green"
          link={
            isUserHaveFreeQuestions
              ? "question-page"
              : isSubsribtionOffer
              ? "subsription-offer"
              : "final-page"
          }
        />
        {/* </div> */}
      </div>
    </Layout>
  )
}

export default AnswerResultPage
