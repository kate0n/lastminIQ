import React from "react"
import Layout from "../components/layout"
import Button, { ButtonWidthExternalLink } from "../components/button"
import Context from "../context/Context"
import IsUserHaveFreeQuestion, {
  IsSubsribtionOffer,
} from "../utils/isUserHaveFreeQuestions"
import { StatusArray } from "../utils/statusArray"

const HomePage = () => {
  const { state } = React.useContext(Context)
  const isUserHaveFreeQuestions = IsUserHaveFreeQuestion()
  const isSubsribtionOffer = IsSubsribtionOffer()

  // console.log("isSubsribtionOffer", isSubsribtionOffer)

  // кол-во вопросов, на которые ответил юзер
  const userQuestions =
    state.isBrowser &&
    parseInt(
      localStorage.getItem("countUserQuestions") ||
        parseInt(state.countUserQuestions)
    )
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
                  : "master-final-page "
                //  на подписку если 5 вопросов, на master-nial-page если 15 вопросов
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
