import React from "react"
import { navigate } from "gatsby"
import Head from "../components/head"
import "../styles/index.scss"
import LastminLogo from "../images/lastmin-logo.svg"
import Context from "../context/Context"

const langs = [
  {
    icon: "lv",
    lang: "Latviski",
    langShort: "LV",
  },
  {
    icon: "ru",
    lang: "По-русски",
    langShort: "RU",
  },
  {
    icon: "lt",
    lang: "Lietuva",
    langShort: "LT",
  },
  {
    icon: "ee",
    lang: "Eesti",
    langShort: "EE",
  },
  {
    icon: "gb",
    lang: "English",
    langShort: "EN",
  },
  {
    icon: "fi",
    lang: "Suomija",
    langShort: "FI",
  },
]

const IndexPage = () => {
  const { state, dispatch } = React.useContext(Context)

  const handleLangClick = lang => {
    navigate("login-page", { state: { isReload: true } })
    dispatch({
      type: "LANG",
      payload: lang,
    })
    // lang to server
  }

  // if (state.isLoading) {
  //   return "Loading..."
  // }
  return (
    <>
      <Head />
      <div className="outer-container">
        <main className="inner-container main">
          <div className="logo__wrapper">
            <img className="logo__img" src={LastminLogo} alt="LastminIQ logo" />
          </div>
          {langs.map((lang, i) => (
            <div
              onClick={() => handleLangClick(lang.langShort)}
              className="lang-wrapper"
              key={i}
            >
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${lang.icon}.svg`}
                width="25"
              />
              <div className="lang">{lang.lang}</div>
            </div>
          ))}
        </main>
      </div>
    </>
  )
}

export default IndexPage
