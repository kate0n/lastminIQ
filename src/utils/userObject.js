import React from "react"
import Context from "../context/Context"

// массив значений для отправки на сервер при создании/обновлении юзера
export const UserObject = () => {
  const { state } = React.useContext(Context)

  const score =
    state.isBrowser &&
    parseInt(localStorage.getItem("score") || parseInt(state.score))

  const userQuestions =
    state.isBrowser &&
    parseInt(
      localStorage.getItem("countUserQuestions") ||
        parseInt(state.countUserQuestions)
    )

  const subscription =
    (state.isBrowser && localStorage.getItem("subscription")) ||
    state.subscription

  const lang = (state.isBrowser && localStorage.getItem("lang")) || state.lang

  const userInfo =
    (state.isBrowser && JSON.parse(localStorage.getItem("userInfo"))) ||
    state.userInfo

  const userObject = {
    username: userInfo.name,
    email: userInfo.email,
    facebook_id: userInfo.userID,
    progress: score,
    current_question: userQuestions,
    stripe_id: "",
    payment_ok: subscription,
    localize: lang,
  }

  return userObject
}
