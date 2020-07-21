import React from "react"
import Layout from "../components/layout"
import Button, { ButtonWidthExternalLink } from "../components/button"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import { Replace } from "../utils/isUserHaveFreeQuestions"
import "../styles/index.scss"

// MASTER FINAL PAGE после исчерпания всех вопросов

const FinalPage = () => {
  const { state } = React.useContext(Context)

  const text =
    "OK. You have {currentProgress} votes for the lottery. The drawing will take place on {awardDate}. We'll announce the winner on our Facebook page, good reason to <a href=‘https://www.facebook.com/lastmin.tv/’ target=‘_blank’> Facebook</a>"

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
