import React from "react"
import Layout from "../components/layout"
import QuizHeader from "../components/quiz-header"
import Button from "../components/button"
import Context from "../context/Context"
import "../styles/index.scss"
import { Replace } from "../utils/isUserHaveFreeQuestions"

const IntermediatePage = () => {
  const { state } = React.useContext(Context)

  React.useEffect(() => {
    state.isBrowser && document.body.scrollTo(0, 0)
  }, [])

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="final-page">
        <QuizHeader />
        <div
          className="quiz-start__title text-md link"
          dangerouslySetInnerHTML={{
            __html: `<p>${Replace(
              state.dictionary.info.finalIntermediatePageText
            )}</p>`,
          }}
        />
        <Button
          text={state.dictionary.info.finalPageBtnText}
          className="green"
          link="home-page"
        />
      </div>
    </Layout>
  )
}

export default IntermediatePage
