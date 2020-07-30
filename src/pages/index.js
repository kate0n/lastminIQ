import React from "react"
import { navigate } from "gatsby"
import { useQueryParam, NumberParam, StringParam } from "use-query-params"
import Head from "../components/head"
import OpenGraph from "../components/openGraph"
import "../styles/index.scss"
import LastminLogo from "../images/lastmin-logo.svg"
import Context from "../context/Context"

const IndexPage = props => {
  const { state, dispatch } = React.useContext(Context)
  const [langsList, setLangsList] = React.useState()

  const [facebookID, setFacebookID] = useQueryParam("id", NumberParam)
  // console.log("QUERY PARAMETER", facebookID)

  function openInBrowser(target, browserScheme) {
    var ifc = document.createElement("div")
    ifc.innerHTML = `<iframe src='${browserScheme}${target}' style='width:0;height:0;border:0; border:none;visibility: hidden;'></iframe>`
    document.body.appendChild(ifc)
  }

  function isInApp(appSpecificUserAgents) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera
    for (i = 0; i <= appSpecificUserAgents.length; i++) {
      if (userAgent.indexOf(appSpecificUserAgents[i]) > -1) return true
    }
  }

  React.useEffect(() => {
    ;(function tryOpenBrowser() {
      if (document.body) {
        if (isInApp(["FBAN", "FBAV"])) {
          //https://iq.lastmin.tv/id?=facebookID
          openInBrowser(window.location.href, "googlechrome://navigate?url=")
        }
      } else {
        window.requestAnimationFrame(tryOpenBrowser)
      }
    })()

    fetch(`${state.url}/localize/main.json`)
      .then(response => response.json())
      .then(mainJson => mainJson)
      .then(a => setLangsList(a))

    // <=========  наличие в системе или создание юзера ==============
    fetch(`${state.url}/get_user?facebook_id=${facebookID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        console.log("QUERY PARAMETER response", response)
        if (response.status === 400) {
          console.log("no USER")
        } else {
          return response.json()
        }
      })
      .then(user => user && updateLocalStoreFromServer(user))

    // обновление локального стейта из ответа от сервера
    const updateLocalStoreFromServer = user => {
      // add only userID, rest fields in login-page.js (name, lastname, email, photo)
      dispatch({
        type: "SET_USERID",
        payload: user.facebook_id,
      })
      dispatch({
        type: "SCORE",
        payload: user.progress,
      })
      dispatch({
        type: "COUNT_USER_QUESTIONS",
        payload: user.current_question,
      })
      dispatch({
        type: "ADD_SUBSCRIPTION",
        payload: user.payment_ok,
      })
      dispatch({
        type: "LANG",
        payload: user.localize,
      })
      dispatch({
        type: "STRIPE_ID",
        payload: user.stripe_id,
      })
      dispatch({
        type: "EXTERNAL_LINK",
        payload: true,
      })
      navigate("/login-page", {
        state: { isReload: true },
      })
    }
  }, [])

  const handleLangClick = lang => {
    state.isBrowser && localStorage.getItem("isAuthenticated")
      ? navigate("/home-page")
      : navigate("login-page", { state: { isReload: true } })
    dispatch({
      type: "LANG",
      payload: lang,
    })
  }

  if (state.isLoading || facebookID) {
    return "Loading..."
  }

  return (
    <>
      <Head />
      <OpenGraph />
      <div className="outer-container">
        <main className="inner-container main">
          <div className="logo__wrapper">
            <img className="logo__img" src={LastminLogo} alt="LastminIQ logo" />
          </div>
          <div className="langs">
            {langsList &&
              langsList.map((lang, i) => (
                <div
                  onClick={() => handleLangClick(lang.langShort)}
                  className="lang-wrapper"
                  key={i}
                >
                  <img
                    src={`${state.url}/localize/icons/${lang.icon}`}
                    width="25px"
                    height="25px"
                  />
                  <div className="lang">{lang.lang}</div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default IndexPage
