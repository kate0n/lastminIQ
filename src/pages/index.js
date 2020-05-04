import React from "react"
import { navigate } from "gatsby"
import Head from "../components/head"
import OpenGraph from "../components/openGraph"
import "../styles/index.scss"
import LastminLogo from "../images/lastmin-logo.svg"
import Context from "../context/Context"

const IndexPage = props => {
  const { state, dispatch } = React.useContext(Context)
  const [langsList, setLangsList] = React.useState()

  React.useEffect(() => {
    fetch(`${state.url}/localize/main.json`)
      .then(response => response.json())
      .then(mainJson => mainJson)
      .then(a => setLangsList(a))
  }, [])

  const handleLangClick = lang => {
    state.isBrowser && localStorage.getItem("isAuthenticated")
      ? navigate("/home-page")
      : navigate("login-page", { state: { isReload: true } })
    dispatch({
      type: "LANG",
      payload: lang,
    })
    // lang to server
  }

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
