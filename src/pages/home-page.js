import React from "react"
import Layout from "../components/layout"
import Button, { ButtonWidthExternalLink } from "../components/button"
import Context from "../context/Context"
import IsUserHaveFreeQuestion, {
  IsSubsribtionOffer,
  СountUserQuestions,
} from "../utils/isUserHaveFreeQuestions"
import "../styles/index.scss"

const HomePage = () => {
  const { state } = React.useContext(Context)

  const isUserHaveFreeQuestions = IsUserHaveFreeQuestion()
  const isSubsribtionOffer = IsSubsribtionOffer()
  const userQuestions = СountUserQuestions()

  // state.isBrowser &&
  //   window.addEventListener("resize", () => {
  //     // We execute the same script as before
  //     let vh = window.innerHeight * 0.01
  //     document.documentElement.style.setProperty("--vh", `${vh}px`)
  //   })

  React.useEffect(() => {
    state.isBrowser && document.body.scrollTo(0, 0)
  }, [])

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="home-page">
        <div className="inner-container">
          <div className="home-page__button-group">
            <Button
              text={state.dictionary.info.quizBtnText}
              className="pink"
              link={
                userQuestions === 0
                  ? "quiz-start"
                  : isUserHaveFreeQuestions
                  ? "continue-page"
                  : isSubsribtionOffer
                  ? "subsription-offer"
                  : "final-page "
              }
            />
            <ButtonWidthExternalLink
              text={state.dictionary.info.videosBtnText}
              className="blue"
              link="twitter.com"
            />
            <ButtonWidthExternalLink
              text={state.dictionary.info.findAtourBtnText}
              className="green"
              link="twitter.com"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
