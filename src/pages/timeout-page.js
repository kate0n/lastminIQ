import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import "../styles/index.scss"
import { navigate } from "gatsby"
import IsUserHaveFreeQuestion, {
  IsSubsribtionOffer,
} from "../utils/isUserHaveFreeQuestions"

const TimeoutPage = ({ location }) => {
  const { state } = React.useContext(Context)
  const isUserHaveFreeQuestions = IsUserHaveFreeQuestion()
  const isSubsribtionOffer = IsSubsribtionOffer()

  React.useEffect(() => {
    !isUserHaveFreeQuestions && isSubsribtionOffer
      ? navigate("subsription-offer")
      : navigate("final-page")
  }, [])

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
