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

  // console.log(
  //   "subscription",
  //   subscription,
  //   "userQuestions",
  //   userQuestions,
  //   "questionCount",
  //   questionCount,
  //   "intermediatePart",
  //   intermediatePart
  // )
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
export default IsUserHaveFreeQuestion
