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

  // дефолтное кол-во free вопросов
  const countFreeAnswers = parseInt(state.intermediatePart)

  const isSubsribtionOffer = userQuestions === countFreeAnswers
  const isSubsribtionOffer2 =
    userQuestions === countFreeAnswers ||
    (!subscription && userQuestions < questionCount) // если у юзера 12 вопросов, отменил подписку то подписку можно предложить вновь

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

// есть ли у юзера неотвеченные вопросы (беспалтные или по подписке)
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
    ? userQuestions < questionCount // 14 < 15 есть фри вопросы, 15 < 15 нет фри вопросов
    : userQuestions < intermediatePart // 4 < 5 есть фри вопросы, 12 < 5 нет фри вопросов
  return isUserHaveFreeQuestions
}

// кол-во отчков
export const CurrentProgress = () => {
  const { state } = React.useContext(Context)
  const currentProgress =
    (state.isBrowser && localStorage.getItem("score")) || state.score
  return currentProgress
}

// кол-во правильно отвеченных
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

  // const currentQuestionNumber = СountUserQuestions()
  // let answerOption = state.questions.questions[currentQuestionNumber]
  // // текущий ответ в answers.json
  // let correctAnswer = state.answers.answers[currentQuestionNumber]
  // // нахождение верного ответа
  // const checkCorrectAnswer = correctAnswer => {
  //   if (correctAnswer === 1) return answerOption.answer1Text
  //   else if (correctAnswer === 2) return answerOption.answer2Text
  //   else if (correctAnswer === 3) return answerOption.answer3Text
  // }
  // console.log(
  //   "correctAnswer",
  //   checkCorrectAnswer(correctAnswer.correct),
  //   "currentQuestionNumber",
  //   currentQuestionNumber
  // )

  const replacedStr = str
    .replace("{accuralPointsToAnswer}", accuralPointsToAnswer)
    .replace("{questionCount}", state.questionCount)
    .replace("{accrualPoints}", state.dictionary.settings.accrualPoints) // кол-во очков за 1 вопрос
    .replace("{currentProgress}", currentProgress)
    .replace("{currentProgress}", currentProgress)
    .replace("{awardDate}", state.dictionary.settings.awardDate)
    .replace("{intermediatePart}", state.dictionary.settings.intermediatePart) // кол-во бесплатных вопросов
    .replace(
      "{additionalPartCount}",
      state.questionCount - state.intermediatePart // кол-во платных вопросов
    )
  return replacedStr
}

export default IsUserHaveFreeQuestion
