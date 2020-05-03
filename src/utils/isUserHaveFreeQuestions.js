import React from "react"
import Context from "../context/Context"

// для определения редиректить ли юзера на subscription-offer
export const IsSubsribtionOffer = () => {
  const { state } = React.useContext(Context)

  // кол-во вопросов, на которые ответил юзер
  const userQuestions =
    state.isBrowser &&
    parseInt(
      localStorage.getItem("countUserQuestions") ||
        parseInt(state.countUserQuestions)
    )

  // дефолтное кол-во free вопросов
  const countFreeAnswers = parseInt(state.intermediatePart)

  const isSubsribtionOffer = userQuestions === countFreeAnswers

  return isSubsribtionOffer
}

// кол-во вопросов, на которые ответил юзер
export const СountUserQuestions = () => {
  const { state } = React.useContext(Context)
  const userQuestions =
    state.isBrowser &&
    parseInt(
      localStorage.getItem("countUserQuestions") ||
        parseInt(state.countUserQuestions)
    )

  return userQuestions
}

const IsUserHaveFreeQuestion = () => {
  const { state } = React.useContext(Context)

  // кол-во вопросов, на которые ответил юзер
  const userQuestions =
    state.isBrowser &&
    parseInt(
      localStorage.getItem("countUserQuestions") ||
        parseInt(state.countUserQuestions)
    )

  // дефолтное кол-во free вопросов
  const intermediatePart =
    state.isBrowser &&
    parseInt(
      localStorage.getItem("intermediatePart") ||
        parseInt(state.intermediatePart)
    )
  parseInt(state.intermediatePart)

  // макс.кол-во вопросов
  const questionCount =
    state.isBrowser &&
    parseInt(
      localStorage.getItem("questionCount") || parseInt(state.questionCount)
    )

  const subscription =
    state.isBrowser && localStorage.getItem("subscription")
      ? JSON.parse(localStorage.getItem("subscription"))
      : state.subscription

  const isUserHaveFreeQuestions = subscription
    ? !(userQuestions === questionCount)
    : !(userQuestions === intermediatePart) // true когда остались free вопросы
  return isUserHaveFreeQuestions
}

export const CurrentProgress = () => {
  const { state } = React.useContext(Context)
  const currentProgress =
    (state.isBrowser && localStorage.getItem("score")) || state.score
  return currentProgress
}

export const AccuralPointsToAnswer = () => {
  const { state } = React.useContext(Context)
  const currentProgress =
    (state.isBrowser && localStorage.getItem("score")) || state.score

  const accuralPointsToAnswer =
    currentProgress / state.dictionary.settings.accrualPoints

  return accuralPointsToAnswer
}

export const Replace = str => {
  const { state } = React.useContext(Context)
  const accuralPointsToAnswer = AccuralPointsToAnswer()
  const currentProgress = CurrentProgress()

  const currentQuestionNumber = СountUserQuestions()
  let answerOption = state.questions.questions[currentQuestionNumber]
  // текущий ответ в answers.json
  let correctAnswer = state.answers.answers[currentQuestionNumber]
  // нахождение верного ответа
  const checkCorrectAnswer = correctAnswer => {
    if (correctAnswer === 1) return answerOption.answer1Text
    else if (correctAnswer === 2) return answerOption.answer2Text
    else if (correctAnswer === 3) return answerOption.answer3Text
  }
  console.log(
    "correctAnswer",
    checkCorrectAnswer(correctAnswer.correct),
    "currentQuestionNumber",
    currentQuestionNumber
  )

  const replacedStr = str
    .replace("{accuralPointsToAnswer}", accuralPointsToAnswer)
    .replace("{questionCount}", state.questionCount)
    .replace("{accrualPoints}", state.dictionary.settings.accrualPoints)
    .replace("{currentProgress}", currentProgress)
    .replace("{currentProgress}", currentProgress)
    .replace("{awardDate}", state.dictionary.settings.awardDate)
    .replace("{intermediatePart}", state.dictionary.settings.intermediatePart)
    .replace(
      "{additionalPartCount}",
      state.questionCount - state.intermediatePart
    )
  return replacedStr
}

export default IsUserHaveFreeQuestion
