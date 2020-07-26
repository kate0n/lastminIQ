import React from "react"
import Layout from "../components/layout"
import { ButtonWidthExternalLink } from "../components/button"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import { Replace } from "../utils/isUserHaveFreeQuestions"
import "../styles/index.scss"

// MASTER FINAL PAGE после исчерпания всех вопросов

const FinalPage = () => {
  const { state, dispatch } = React.useContext(Context)

  React.useEffect(() => {
    dispatch({
      type: "EXTERNAL_LINK",
      payload: false,
    })
  }, [])

  if (state.isLoading) {
    return "Loading..."
  }

  return (
    <Layout>
      <div className="quiz-start">
        <div className="quiz-start__wrapper">
          <QuizHeader />
          <div
            className="quiz-start__title text-md link"
            dangerouslySetInnerHTML={{
              __html: `<p>${Replace(
                Replace(state.dictionary.info.finalPageText)
              )}</p>`,
            }}
          />
        </div>
        <ButtonWidthExternalLink
          text={state.dictionary.info.finalPageBtnText}
          className="green"
          link="https://m.me/lastmin.tv?ref=w11889107"
        />
      </div>
    </Layout>
  )
}

export default FinalPage
