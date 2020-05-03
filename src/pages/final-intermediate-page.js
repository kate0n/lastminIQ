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

  // const text =
  //   "OK. You have {currentProgress} votes for the lottery. The drawing will take place on {awardDate}. We'll announce the winner on our Facebook page, good reason to <a href=‘https://www.facebook.com/lastmin.tv/’ target=‘_blank’> Facebook</a>"

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
