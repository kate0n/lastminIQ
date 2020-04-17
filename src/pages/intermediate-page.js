import React from "react"
import Layout from "../components/layout"
import QuizHeader from "../components/quiz-header"
import Button from "../components/button"
import { FacebookLoginButton } from "../components/button"
import Context from "../context/Context"
import TextOverlay from "../components/text-overlay"
import { CurrentProgress } from "../utils/isUserHaveFreeQuestions"
import "../styles/index.scss"

const IntermediatePage = () => {
  const { state } = React.useContext(Context)

  React.useEffect(() => {
    state.isBrowser && document.body.scrollTo(0, 0)
  }, [])

  const currentProgress = CurrentProgress()
  const accuralPointsToAnswer =
    currentProgress / state.dictionary.settings.accrualPoints

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="final-page">
        <QuizHeader />
        <TextOverlay
          text={state.dictionary.info.intermediatePageText
            .replace("{accuralPointsToAnswer}", accuralPointsToAnswer)
            .replace(
              "{intermediatePart}",
              state.dictionary.settings.intermediatePart
            )
            .replace("{accrualPoints}", state.dictionary.settings.accrualPoints)
            .replace("{currentProgress}", currentProgress)}
        />
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

export default IntermediatePage
