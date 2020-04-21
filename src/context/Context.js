import React, { useEffect, useReducer } from "react"
import * as questions from "../questions.json"
import * as answers from "../answers.json"
import * as config from "../config.json"

const Context = React.createContext()

const initialState = {
  isAuthenticated: false,
  userInfo: {
    name: "",
    photo: "",
    email: "",
    userID: "",
  },
  score: 0, // текущий счет
  subscription: false, // есть ли подписка
  countUserQuestions: 0, // кол-во вопросов, на которые юзер ответил
  intermediatePart: "", // кол-во free вопросов (оставить 0)
  questionCount: "", // (длина массива в questions)
  dictionary: config.default, // ""
  questions: questions.default,
  answers: answers.default,
  lang: "EN",
  isLoading: true,
  isBrowser: typeof document !== `undefined`,
  answerTitleIndex: 0,
  stripeToken: "",
  stripeID: "",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
      localStorage.setItem("isAuthenticated", true)
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload,
      }

    case "LOGOUT":
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        userInfo: {
          name: "",
          photo: "",
          email: "",
          userID: "",
        },
        score: 0,
        subscription: false,
      }

    // сколько вопросов использовано пользователем
    case "COUNT_USER_QUESTIONS":
      localStorage.setItem("countUserQuestions", action.payload)
      return {
        ...state,
        countUserQuestions: action.payload,
      }

    // кол-во верных
    case "SCORE":
      console.log("SCORE", action.payload)
      localStorage.setItem("score", action.payload)
      return {
        ...state,
        score: action.payload,
      }

    case "ADD_SUBSCRIPTION":
      localStorage.setItem("subscription", action.payload)
      return {
        ...state,
        subscription: action.payload,
      }

    case "DICTIONARY":
      localStorage.setItem(
        "intermediatePart",
        action.payload.settings.intermediatePart
      )
      return {
        ...state,
        dictionary: action.payload,
        intermediatePart: parseInt(action.payload.settings.intermediatePart),
      }

    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }

    case "LANG":
      localStorage.setItem("lang", action.payload)
      return {
        ...state,
        lang: action.payload,
      }
    case "QUESTIONS":
      localStorage.setItem("questionCount", action.payload.questions.length)
      return {
        ...state,
        questions: action.payload,
        questionCount: action.payload.questions.length,
      }
    case "ANSWERS":
      // console.log("action.payload", action.payload)
      return {
        ...state,
        answers: action.payload,
      }

    case "ANSWER_TITLE_INDEX":
      console.log("ANSWER_TITLE_INDEX", action.payload)
      return {
        ...state,
        answerTitleIndex: action.payload,
      }

    case "STRIPE_TOKEN":
      return {
        ...state,
        stripeToken: action.payload,
      }

    case "STRIPE_ID":
      return {
        ...state,
        stripeID: action.payload,
      }
    default:
      return state
  }
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // <=========== DICTIONARY, QUESTIONS, ANSWERS ========>
  const lang = (state.isBrowser && localStorage.getItem("lang")) || state.lang
  //${lang}
  useEffect(() => {
    fetch(`/locale/EN/config.json`)
      .then(response => {
        dispatch({ type: "IS_LOADING", payload: true })
        return response.text()
      })
      .then(data => {
        console.log("DICTIONARY  fetch", data)
        dispatch({ type: "DICTIONARY", payload: JSON.parse(data) })
        dispatch({ type: "IS_LOADING", payload: false })
      })
      .catch(err => console.log("Error Reading data ", +err))

    // QUESTIONS
    fetch(`/locale/EN/questions.json`)
      .then(response => {
        dispatch({ type: "IS_LOADING", payload: true })
        return response.text()
      })
      .then(data => {
        console.log("QUESTIONS  fetch", data)
        dispatch({ type: "QUESTIONS", payload: JSON.parse(data) })
        dispatch({ type: "IS_LOADING", payload: false })
      })
      .catch(err => console.log("Error Reading data ", +err))

    // ANSWERS
    fetch(`/locale/EN/answers.json`)
      .then(response => {
        dispatch({ type: "IS_LOADING", payload: true })
        return response.text()
      })
      .then(data => {
        dispatch({ type: "ANSWERS", payload: JSON.parse(data) })
        dispatch({ type: "IS_LOADING", payload: false })
        console.log("ANSWERS  fetch", data)
      })
      .catch(err => console.log("Error Reading data ", +err))

    // STRIPE_KEY
    fetch("https://lastmin.makaroff.tech/stripe-key")
      .then(result => {
        return result.json()
      })
      .then(data => {
        dispatch({ type: "STRIPE_TOKEN", payload: data.publishableKey })
        localStorage.setItem("stripeToken", data.publishableKey)
      })
  }, [lang])

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
export { ContextProvider }
