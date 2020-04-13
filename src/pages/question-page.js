import React from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"

import { StatusArray } from "../utils/statusArray"

const QuestionPage = () => {
  const { state, dispatch } = React.useContext(Context)
  const questions = state.questions
  const answers = state.answers
  const statusArray = StatusArray()
  let timer
  let currentQuestionNumber = parseInt(
    (state.isBrowser && localStorage.getItem("countUserQuestions")) ||
      state.countUserQuestions
  )

  let questionText =
    questions.questions[currentQuestionNumber] &&
    questions.questions[currentQuestionNumber].questionText

  let answerOption = questions.questions[currentQuestionNumber]
  let correctAnswer = answers.answers[currentQuestionNumber]

  // обновление стейта при выборе или истечении таймера
  const updateLocalState = isCorrect => {
    if (isCorrect) {
      statusArray[1] =
        (parseInt(localStorage.getItem("score")) || state.score) +
        state.accrualPoints
    }
    statusArray[2] = parseInt(currentQuestionNumber) + 1
    fetch("/api/updateStatusForUser", {
      method: "POST",
      body: JSON.stringify(statusArray),
    })
      .then(response => response.json())
      .then(updatedUser => console.log("UPDATED USER:", updatedUser))

    // +1 бесплатный вопрос
    dispatch({
      type: "COUNT_USER_QUESTIONS",
      payload: parseInt(currentQuestionNumber) + 1,
    })

    // кол-во очков +5
    isCorrect &&
      dispatch({
        type: "SCORE",
        payload:
          (parseInt(localStorage.getItem("score")) || state.score) +
          state.accrualPoints,
      })
  }

  // нахождение верного ответа
  const checkCorrectAnswer = correctAnswer => {
    if (correctAnswer === 1) return answerOption.answer1Text
    else if (correctAnswer === 2) return answerOption.answer2Text
    else if (correctAnswer === 3) return answerOption.answer3Text
  }

  // клик на кнопку с вариантом ответа
  const checkUserChoice = answerNumber => {
    // добавить: отправка результатов
    clearTimeout(timer)

    let isCorrect = parseInt(answerNumber) === parseInt(correctAnswer.correct)

    navigate("answer-result-page", {
      state: {
        isCorrect: isCorrect,
        commentText: correctAnswer.commentText,
        imgLink: correctAnswer.imgLink,
        correctAnswer: checkCorrectAnswer(correctAnswer.correct),
      },
    })

    updateLocalState(isCorrect)
  }

  // запуск таймера
  const createSetTimeout = () => {
    timer = setTimeout(() => {
      navigate("/timeout-page", {
        state: {
          isCorrect: false,
          commentText: correctAnswer.commentText,
          imgLink: correctAnswer.imgLink,
          correctAnswer: checkCorrectAnswer(correctAnswer.correct),
        },
      })
      updateLocalState(false)
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
        <div className="question-page__question text-sm">{questionText}</div>
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
