import React from "react"
import { navigate } from "gatsby"
import Head from "../components/head"
import "../styles/index.scss"
import LastminLogo from "../images/lastmin-logo.svg"
import Context from "../context/Context"
import FacebookLogin from "react-facebook-login"
import IsUserHaveFreeQuestion, {
  IsSubsribtionOffer,
} from "../utils/isUserHaveFreeQuestions"

const LoginPage = ({ location }) => {
  const { state, dispatch } = React.useContext(Context)
  const { isReload = false } = location.state || ""
  if (isReload) {
    navigate("/login-page", { state: { isReload: false } })
    window.location.reload()
  }

  const isUserHaveFreeQuestions = IsUserHaveFreeQuestion()
  const isSubsribtionOffer = IsSubsribtionOffer()
  const responseFacebook = response => {
    response.status !== "unkown" &&
      dispatch({
        type: "LOGIN",
        payload: {
          name: response.name,
          photo: response.picture.data.url,
          email: response.email,
          userID: response.userID,
        },
      })

    const registrationArray = [
      response.userID,
      state.score,
      state.countUserQuestions,
      state.subscription,
      state.lang,
      response.name,
      response.email,
    ]

    dispatch({ type: "MIRAGE", payload: true })

    //проверка наличия в системе
    fetch("/api/getStatusForUser", {
      method: "POST",
      body: response.userID,
    })
      .then(response => (response.status === 500 ? false : response.json()))
      .then(
        data => (
          console.log("registrationArray", JSON.stringify(registrationArray)),
          data
            ? updateLocalStoreFromServer(data)
            : // создание нового юзера
              fetch("/api/createUser", {
                method: "POST",
                body: JSON.stringify(registrationArray),
              })
                .then(response => response.json())
                .then(createdUser => console.log("CREATED USER:", createdUser))
        )
      )

    const updateLocalStoreFromServer = response => {
      dispatch({
        type: "SCORE",
        payload: response[1],
      })
      dispatch({
        type: "COUNT_USER_QUESTIONS",
        payload: response[2],
      })
      dispatch({
        type: "ADD_SUBSCRIPTION",
        payload: response[3],
      })
      dispatch({
        type: "LANG",
        payload: response[4],
      })
    }
    navigate("/home-page")
    response.status === "unkown" && navigate("/")
  }

  // кол-во вопросов, на которые ответил юзер
  const userQuestions =
    state.isBrowser &&
    parseInt(
      localStorage.getItem("countUserQuestions") ||
        parseInt(state.countUserQuestions)
    )

  React.useEffect(
    () =>
      state.isBrowser && !localStorage.getItem("isAuthenticated")
        ? navigate("/login-page")
        : userQuestions === 0
        ? navigate("/quiz-start")
        : isUserHaveFreeQuestions
        ? navigate("/continue-page")
        : isSubsribtionOffer
        ? "subsription-offer"
        : "master-final-page",
    [
      state.isBrowser,
      userQuestions,
      isUserHaveFreeQuestions,
      isSubsribtionOffer,
    ]
  )

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <>
      <Head />
      <div className="outer-container">
        <main className="inner-container main">
          <div className="logo__wrapper">
            <img className="logo__img" src={LastminLogo} alt="LastminIQ logo" />
          </div>
          <FacebookLogin
            appId={state.dictionary.settings.facebookToken}
            // appId="226488818440629" // for localhost
            fields="name,email,picture"
            onClick={console.log("")}
            callback={responseFacebook}
            icon="fa-facebook"
          />
        </main>
      </div>
    </>
  )
}

export default LoginPage
