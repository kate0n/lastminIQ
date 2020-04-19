import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import "../styles/index.scss"

const TimeoutPage = ({ location }) => {
  const { state } = React.useContext(Context)

  console.log("state in timout", location.state)
  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <QuizHeader />
      <div className="inner-container timeout-page">
        <Link to="/answer-result-page" state={location.state}>
          <div className="timeout-page__warning text-md">
            <b>
              {(state.dictionary && state.dictionary.info.timerText) ||
                state.timerText}
            </b>
          </div>
        </Link>
      </div>
    </Layout>
  )
}

export default TimeoutPage
