import React from "react"
import Context from "../context/Context"

export const StatusArray = () => {
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

  const statusArray = [
    userInfo.userID || "",
    score || "",
    userQuestions || "",
    subscription || "",
    lang || "",
    userInfo.name || "",
    userInfo.email || "",
  ]

  return statusArray
}
