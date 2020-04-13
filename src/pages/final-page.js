import React from "react"
import Layout from "../components/layout"
import QuizHeader from "../components/quiz-header"
import Button from "../components/button"
import { FacebookLoginButton } from "../components/button"
import Context from "../context/Context"
import TextOverlay from "../components/text-overlay"

const FinalPage = () => {
  const { state } = React.useContext(Context)
  const score =
    (state.isBrowser && localStorage.getItem("score")) || state.score

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="inner-container final-page">
        <QuizHeader />
        <TextOverlay
          text={state.dictionary.info.finalPageText
            .replace("{totalScore}", score)
            .replace("{totalScore}", score)}
        />
        <Button
          text={state.dictionary.info.finalPageBtnText}
          className="green"
          link="home-page"
        />
        {/* 
        <Button
          text={state.dictionary.info.finalPageBtnText}
          className="green"
          link="home-page"
        />
        {/* {isFinalPage && (
          <FacebookLoginButton
            onClick={() => console.log("share")}
            text="Share"
          />
        )} */}
      </div>
    </Layout>
  )
}

export default FinalPage
