import React, { useEffect, useReducer } from "react"
import { Server, Model } from "miragejs"
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
  questions: questions.default, //questions.default
  answers: answers.default, // answers.default
  lang: "EN",
  // <===
  isLoading: true, // вернуть на true
  isBrowser: typeof document !== `undefined`,

  mirage: false,
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
      const users = localStorage.getItem("users")
      localStorage.clear()
      localStorage.setItem("users", users)
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
        isPremium: false,
      }

    // сколько вопросов использовано пользователем
    case "COUNT_USER_QUESTIONS":
      localStorage.setItem("countUserQuestions", action.payload)
      console.log("countUserQuestions", action.payload)
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
      return {
        ...state,
        questions: action.payload,
        questionCount: action.payload.questions.length,
      }
    case "ANSWERS":
      return {
        ...state,
        answers: action.payload,
      }

    case "MIRAGE":
      return {
        ...state,
        mirage: action.payload,
      }
    default:
      return state
  }
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // <=========== MIRAGE ========>
  state.mirage &&
    new Server({
      models: {
        users: Model,
      },
      routes() {
        this.passthrough()
        this.namespace = "api"

        // НАЙТИ ЮЗЕРА
        this.post("/getStatusForUser", (schema, request) => {
          const users = JSON.parse(localStorage.getItem("users"))
          let id = JSON.parse(request.requestBody)
          console.log(users, id, users[id])
          const findUser = JSON.stringify(users[id])
          return findUser
        })

        // СОЗДАТЬ ЮЗЕРА
        this.post("/createUser", (schema, request) => {
          let users = localStorage.getItem("users")
            ? JSON.parse(localStorage.getItem("users"))
            : new Object()
          let newUserId = JSON.parse(request.requestBody)[0]
          users[newUserId] = request.requestBody
          localStorage.setItem("users", JSON.stringify(users))
          let user = JSON.parse(request.requestBody)
          // schema.users.create(user)
          return user
        })

        // ОБНОВИТЬ ЮЗЕРА
        this.post("/updateStatusForUser", (schema, request) => {
          // все юзеры в LS%
          console.log("!!!!")
          const users = JSON.parse(localStorage.getItem("users"))
          console.log("user in LS", JSON.parse(localStorage.getItem("users")))
          // юзер с обновленной инфой:
          let updatedUserInfo = JSON.parse(request.requestBody)
          // нужный юзер в LS%
          users[updatedUserInfo[0]] = updatedUserInfo
          localStorage.setItem("users", JSON.stringify(users))
          return users
        })
      },
    })
  // <=========== MIRAGE ========>

  // <=========== DICTIONARY, QUESTIONS, ANSWERS ========>
  const lang = state.isBrowser && localStorage.getItem("lang")

  React.useEffect(() => {
    // console.log(`/locale/${lang}.json`)
    fetch(`/locale/${lang}.json`)
      .then(response => {
        dispatch({ type: "IS_LOADING", payload: true })
        return response.text()
      })
      .then(data => {
        console.log("DICTIONARY  fetch")
        dispatch({ type: "DICTIONARY", payload: JSON.parse(data) })
        dispatch({ type: "IS_LOADING", payload: false })
      })
      .catch(err => console.log("Error Reading data ", +err))

    // QUESTIONS
    fetch("/questions.json")
      .then(response => {
        dispatch({ type: "IS_LOADING", payload: true })
        return response.text()
      })
      .then(data => {
        console.log("QUESTIONS  fetch")
        dispatch({ type: "QUESTIONS", payload: JSON.parse(data) })
        dispatch({ type: "IS_LOADING", payload: false })
      })
      .catch(err => console.log("Error Reading data ", +err))
    // ANSWERS
    fetch("/answers.json")
      .then(response => {
        dispatch({ type: "IS_LOADING", payload: true })
        return response.text()
      })
      .then(data => {
        console.log("ANSWERS  fetch")
        dispatch({ type: "ANSWERS", payload: JSON.parse(data) })
        dispatch({ type: "IS_LOADING", payload: false })
      })
      .catch(err => console.log("Error Reading data ", +err))
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
