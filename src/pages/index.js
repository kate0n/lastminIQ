import React from "react"
import { navigate } from "gatsby"
import Head from "../components/head"
import "../styles/index.scss"
import LastminLogo from "../images/lastmin-logo.svg"
import Context from "../context/Context"

const langs = [
  {
    icon: "ee",
    lang: "Eesti",
    langShort: "EE",
  },
  {
    icon: "lv",
    lang: "Latviski",
    langShort: "LV",
  },
  {
    icon: "lt",
    lang: "Lietuvių",
    langShort: "LT",
  },
  {
    icon: "ru",
    lang: "Русский",
    langShort: "RU",
  },
  {
    icon: "fi",
    lang: "Soumen",
    langShort: "SU",
  },
  {
    icon: "gb",
    lang: "English",
    langShort: "EN",
  },

  {
    icon: "de",
    lang: "Deutcsh",
    langShort: "DE",
  },
  {
    icon: "es",
    lang: "Español",
    langShort: "DE",
  },
]

const IndexPage = props => {
  const { state, dispatch } = React.useContext(Context)

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
            {langs.map((lang, i) => (
              <div
                onClick={() => handleLangClick(lang.langShort)}
                className="lang-wrapper"
                key={i}
              >
                <img
                  src={`https://hatscripts.github.io/circle-flags/flags/${lang.icon}.svg`}
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
