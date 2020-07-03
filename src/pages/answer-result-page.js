import React from "react"
import Layout from "../components/layout"
import { navigate } from "gatsby"

import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import IsUserHaveFreeQuestion, {
  IsSubsribtionOffer,
  СountUserQuestions,
} from "../utils/isUserHaveFreeQuestions"
import "../styles/index.scss"
import { Link } from "gatsby"

const AnswerResultPage = ({ location }) => {
  const {
    isCorrect,
    correctAnswer, // del
    commentText, // del
    imgLink, // del
    timesUpAnswerTitleText = false,
  } = location.state || ""

  const { state, dispatch } = React.useContext(Context)
  let currentQuestionNumber = СountUserQuestions()

  // ------------------------------------------------------------------
  // текущий ответ в answers.json
  // let answer =
  //   state.answers.answers[
  //     currentQuestionNumber === 0 ? 0 : currentQuestionNumber - 1
  //   ]
  // // текущий элемент в массиве questions
  // let answerOption =
  //   state.questions.questions[
  //     currentQuestionNumber === 0 ? 0 : currentQuestionNumber - 1
  //   ]
  // // нахождение верного ответа текстом
  // const checkCorrectAnswer = correctAnswer => {
  //   if (correctAnswer === 1) return answerOption.answer1Text
  //   else if (correctAnswer === 2) return answerOption.answer2Text
  //   else if (correctAnswer === 3) return answerOption.answer3Text
  // }
  // console.log("ANSWER PAGE current Question", currentQuestionNumber)
  // console.log("ANSWER PAGE answer", answer)
  // console.log("ANSWER PAGE correct", checkCorrectAnswer(answer.correct))
  // ------------------------------------------------------------------

  React.useEffect(() => {
    if (!isUserHaveFreeQuestions && isSubsribtionOffer) {
      navigate("subsription-offer")
    } else if (!isUserHaveFreeQuestions && !isSubsribtionOffer) {
      navigate("final-page")
    }

    return dispatch({
      type: "COUNT_USER_QUESTIONS",
      payload: currentQuestionNumber + 1,
    })
  }, [])

  const maxIndex = parseInt(
    state.dictionary.info.correctAnswerTitleText.length - 1
  )

  // тут +1 вопрос (т.к. question-page появляется на миг след.вопрос)
  const handleAnswerTitleChange = () => {
    if (parseInt(state.answerTitleIndex) === maxIndex) {
      dispatch({
        type: "ANSWER_TITLE_INDEX",
        payload: 0,
      })
    } else {
      dispatch({
        type: "ANSWER_TITLE_INDEX",
        payload: parseInt(state.answerTitleIndex) + 1,
      })
    }
  }

  const isUserHaveFreeQuestions = IsUserHaveFreeQuestion()
  const isSubsribtionOffer = IsSubsribtionOffer()

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="result-page">
        <QuizHeader />
        <div
          className={
            isCorrect
              ? "result-page__title--correct"
              : "result-page__title--incorrect"
          }
        >
          {isCorrect
            ? state.dictionary.info.correctAnswerTitleText[
                state.answerTitleIndex
              ]
            : timesUpAnswerTitleText // если из-за таймера
            ? state.dictionary.info.timesUpAnswerTitleText.replace(
                "{correctAnswer}",
                correctAnswer
              )
            : state.dictionary.info.incorrectAnswerTitleText[
                state.answerTitleIndex
              ].replace("{correctAnswer}", correctAnswer)}
        </div>

        <div className="result-page__img-wrapper text-gray">
          <img src={imgLink} alt="correct answer img" />
        </div>

        <div
          className="result-page__comment text-sm"
          dangerouslySetInnerHTML={{
            __html: commentText,
          }}
        />
        <Link
          className="button button--green"
          onClick={handleAnswerTitleChange}
          to={
            isUserHaveFreeQuestions
              ? "question-page"
              : isSubsribtionOffer
              ? "subsription-offer"
              : "final-page"
          }
        >
          {state.dictionary.info.continueBtnText}
        </Link>
      </div>
    </Layout>
  )
}

export default AnswerResultPage
