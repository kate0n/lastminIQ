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
  accrualPoints: 5, // кол-во очков за верный ответ (0!!)
  subscription: false, // есть ли подписка
  countUserQuestions: 0, // кол-во вопросов, на которые юзер ответил
  countFreeAnswers: 5, // кол-во free вопросов (оставить 0)
  maxFreeQuestions: 15, // макс.кол-во вопросов (с подпиской) (оставить 0)
  dictionary: config.default,
  isLoading: false, //!!!!
  isBrowser: typeof document !== `undefined`,
  lang: "eng",
  questions: questions.default,
  answers: answers.default,
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
      console.log("subscription", action.payload, typeof action.payload)
      localStorage.setItem("subscription", action.payload)
      return {
        ...state,
        subscription: action.payload,
      }

    case "DICTIONARY":
      return {
        ...state,
        dictionary: action.payload,
        accrualPoints: parseInt(action.payload.settings.accrualPoints),
        countFreeAnswers: parseInt(action.payload.settings.intermediatePart),
        maxFreeQuestions: 15,
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
          const users = JSON.parse(localStorage.getItem("users"))
          let id = JSON.parse(request.requestBody)[0]
          let updatedUserInfo = JSON.parse(request.requestBody)
          console.log(
            "id",
            id,
            "updatedUserInfo",
            updatedUserInfo,
            "find in LS",
            users[id]
          )
          users[id] = updatedUserInfo
          localStorage.setItem("users", JSON.stringify(users))
          return users
        })
      },
    })

  // React.useEffect(() => {
  //   fetch("/config.json")
  //     .then(response => {
  //       return response.text()
  //     })
  //     .then(data => {
  //       dispatch({ type: "DICTIONARY", payload: JSON.parse(data) })
  //       dispatch({ type: "IS_LOADING", payload: false })
  //     })
  //     .catch(err => console.log("Error Reading data ", +err))

  //   // запрос вопросов
  //   fetch("/questions.json")
  //     .then(response => {
  //       dispatch({ type: "IS_LOADING", payload: true })
  //       return response.text()
  //     })
  //     .then(data => {
  //       dispatch({ type: "QUESTIONS", payload: JSON.parse(data) })
  //       dispatch({ type: "IS_LOADING", payload: false })
  //     })
  //     .catch(err => console.log("Error Reading data ", +err))
  //   // запрос ответов
  //   fetch("/answers.json")
  //     .then(response => {
  //       dispatch({ type: "IS_LOADING", payload: true })
  //       return response.text()
  //     })
  //     .then(data => {
  //       dispatch({ type: "ANSWERS", payload: JSON.parse(data) })
  //       dispatch({ type: "IS_LOADING", payload: false })
  //     })
  //     .catch(err => console.log("Error Reading data ", +err))
  // }, [])
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
