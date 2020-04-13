import React from "react"
import Context from "../context/Context"

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
  const countFreeAnswers =
    state.isBrowser &&
    parseInt(
      localStorage.getItem("countFreeAnswers") ||
        parseInt(state.countFreeAnswers)
    )

  const isSubsribtionOffer = userQuestions === countFreeAnswers

  return isSubsribtionOffer
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
  const countFreeAnswers =
    state.isBrowser &&
    parseInt(
      localStorage.getItem("countFreeAnswers") ||
        parseInt(state.countFreeAnswers)
    )

  // макс.кол-во вопросов (с подпиской)
  const maxQuestions = parseInt(state.maxFreeQuestions)

  const subscription =
    state.isBrowser && localStorage.getItem("subscription")
      ? JSON.parse(localStorage.getItem("subscription"))
      : state.subscription

  const isUserHaveFreeQuestions = subscription
    ? !(userQuestions === maxQuestions)
    : !(userQuestions === countFreeAnswers) // true когда остались free вопросы
  return isUserHaveFreeQuestions
}

export default IsUserHaveFreeQuestion
