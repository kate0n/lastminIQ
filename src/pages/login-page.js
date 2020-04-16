import React from "react"
import { navigate } from "gatsby"
import Head from "../components/head"
import "../styles/index.scss"
import LastminLogo from "../images/lastmin-logo.svg"
import Context from "../context/Context"
import FacebookLogin from "react-facebook-login"
import IsUserHaveFreeQuestion, {
  IsSubsribtionOffer,
  СountUserQuestions,
} from "../utils/isUserHaveFreeQuestions"

const LoginPage = ({ location }) => {
  const { state, dispatch } = React.useContext(Context)

  // <------------------------удалить после отключения miragejs
  const { isReload = false } = location.state || ""
  if (isReload) {
    navigate("/login-page", { state: { isReload: false } })
    window.location.reload()
  } // ------------------------------------------------------->

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
      state.isBrowser && localStorage.getItem("lang"),
      response.name,
      response.email,
    ]

    // <------ удалить после отключения miragejs
    dispatch({ type: "MIRAGE", payload: true })
    // ---------->

    // <=======================  наличие в системе или создание юзера
    fetch("/api/getStatusForUser", {
      method: "POST",
      body: response.userID,
    })
      .then(response => (response.status === 500 ? false : response.json()))
      .then(data => {
        data
          ? updateLocalStoreFromServer(data)
          : // создание нового юзера
            fetch("/api/createUser", {
              method: "POST",
              body: JSON.stringify(registrationArray),
            })
              .then(response => response.json())
              .then(createdUser => console.log("CREATED USER:", createdUser))
      })

    const updateLocalStoreFromServer = response => {
      console.log("update", JSON.parse(response))
      const responseUserArray = JSON.parse(response)
      dispatch({
        type: "SCORE",
        payload: responseUserArray[1],
      })
      dispatch({
        type: "COUNT_USER_QUESTIONS",
        payload: responseUserArray[2],
      })
      dispatch({
        type: "ADD_SUBSCRIPTION",
        payload: responseUserArray[3],
      })
      dispatch({
        type: "LANG",
        payload: responseUserArray[4],
      })
    }

    navigate("/home-page")
    response.status === "unkown" && navigate("/login-page")
  } // ====================================================>

  // <==============РЕДИРЕКТ АВТОРИЗОВАННОГО=================
  const isUserHaveFreeQuestions = IsUserHaveFreeQuestion()
  const isSubsribtionOffer = IsSubsribtionOffer()
  const userQuestions = СountUserQuestions()
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
  ) // ====================================================>

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
            appId="630697047779114"
            //appId={state.dictionary.settings.facebookToken}
            // appId="226488818440629" // for localhost
            fields="name,email,picture"
            onClick={console.log("")}
            callback={responseFacebook}
            icon="fa-facebook"
            disableMobileRedirect={true}
            textButton={
              state.dictionary.info.facebookBtnText || "LOG IN WITH FACEBOOK"
            }
          />
        </main>
      </div>
    </>
  )
}

export default LoginPage
