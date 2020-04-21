import React from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import "../styles/index.scss"
import { UserObject } from "../utils/userObject"
import {
  СountUserQuestions,
  CurrentProgress,
} from "../utils/isUserHaveFreeQuestions"

const QuestionPage = () => {
  const { state, dispatch } = React.useContext(Context)
  let timer
  const userObject = UserObject()
  const currentQuestionNumber = СountUserQuestions()
  const score = CurrentProgress()
  // текущий текст вопроса
  let questionText =
    state.questions.questions[currentQuestionNumber] &&
    state.questions.questions[currentQuestionNumber].questionText
  // текущий элемент в массиве questions
  let answerOption = state.questions.questions[currentQuestionNumber]
  // текущий элемент в массиве ответов
  let correctAnswer = state.answers.answers[currentQuestionNumber]

  // нахождение верного ответа
  const checkCorrectAnswer = correctAnswer => {
    if (correctAnswer === 1) return answerOption.answer1Text
    else if (correctAnswer === 2) return answerOption.answer2Text
    else if (correctAnswer === 3) return answerOption.answer3Text
  }

  // обновление стейта при выборе ответа // истечении таймера
  const updateState = isCorrect => {
    if (isCorrect) {
      userObject.progress =
        parseInt(score) + parseInt(state.dictionary.settings.accrualPoints)
    }
    userObject.current_question = parseInt(currentQuestionNumber) + 1

    const userObjectURI = `username=${encodeURI(
      userObject.username
    )}&email=${encodeURI(userObject.email)}&facebook_id=${encodeURI(
      userObject.facebook_id
    )}&progress=${encodeURI(userObject.progress)}&current_question=${encodeURI(
      userObject.current_question
    )}&stripe_id=${encodeURI(userObject.stripe_id)}&payment_ok=${encodeURI(
      userObject.payment_ok
    )}&localize=${userObject.localize}`

    fetch("https://lastmin.makaroff.tech/update_user", {
      method: "POST",
      headers: {
        "cache-control": "no-cache",
        pragma: "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: userObjectURI,
    }).then(reponse => console.log("UPDATE RESPONSE", reponse))
    // .then(
    //   dispatch({
    //     type: "COUNT_USER_QUESTIONS",
    //     payload: currentQuestionNumber + 1,
    //   })
    // )

    // кол-во очков + 5
    isCorrect &&
      dispatch({
        type: "SCORE",
        payload:
          (parseInt(localStorage.getItem("score")) || state.score) +
          state.dictionary.settings.accrualPoints,
      })
  }

  // клик на кнопку с вариантом ответа
  const checkUserChoice = answerNumber => {
    // добавить: отправка результатов

    let isCorrect = parseInt(answerNumber) === parseInt(correctAnswer.correct)

    navigate("answer-result-page", {
      state: {
        isCorrect: isCorrect,
        commentText: correctAnswer.commentText,
        imgLink: correctAnswer.imgLink,
        correctAnswer: checkCorrectAnswer(correctAnswer.correct),
      },
    })

    clearTimeout(timer)

    updateState(isCorrect)
  }

  // таймер
  const createSetTimeout = () => {
    timer = setTimeout(() => {
      navigate("/timeout-page", {
        state: {
          isCorrect: false,
          commentText: correctAnswer.commentText,
          imgLink: correctAnswer.imgLink,
          correctAnswer: checkCorrectAnswer(correctAnswer.correct),
          timesUpAnswerTitleText: true,
        },
      })
      updateState(false)
    }, parseInt(state.dictionary.settings.timer) * 1000)
  }

  React.useEffect(() => {
    !state.isLoading && createSetTimeout()
  }, [])

  if (state.isLoading) {
    return "Loading..."
  }

  return (
    <Layout>
      <QuizHeader />
      <div className="inner-container question-page">
        <div className="question-page__question">{questionText}</div>
        <div className="question-page__btn-group">
          <button
            onClick={() =>
              checkUserChoice(1, answerOption && answerOption.answer1Text)
            }
            className="button button--green"
          >
            {answerOption && answerOption.answer1Text}
          </button>
          <button
            onClick={() =>
              checkUserChoice(2, answerOption && answerOption.answer2Text)
            }
            className="button button--green"
          >
            {answerOption && answerOption.answer2Text}
          </button>
          <button
            onClick={() =>
              checkUserChoice(3, answerOption && answerOption.answer3Text)
            }
            className="button button--green"
          >
            {answerOption && answerOption.answer3Text}
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default QuestionPage
