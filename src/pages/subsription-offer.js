import React, { useEffect } from "react"
import Layout from "../components/layout"
import Button from "../components/button"
import QuizHeader from "../components/quiz-header"
import Context from "../context/Context"
import "../styles/index.scss"
import { Replace } from "../utils/isUserHaveFreeQuestions"

//  intermediate-page + subscribe-page

const SubsriptionOffer = () => {
  const { state } = React.useContext(Context)

  useEffect(() => {
    state.isBrowser && document.body.scrollTo(0, 0)
  }, [])

  if (state.isLoading) {
    return "Loading..."
  }
  return (
    <Layout>
      <div className="quiz-start" style={{ justifyContent: "flex-start" }}>
        <div className="quiz-start__wrapper">
          <QuizHeader />
          <div
            className="quiz-start__title text-md"
            dangerouslySetInnerHTML={{
              __html:
                Replace(state.dictionary.info.intermediatePageText) +
                Replace(state.dictionary.info.subscribeOfferActionText),
            }}
          />
        </div>
        <div className="subcription">
          <Button
            text={state.dictionary.info.subscribeOfferYesBtnText}
            className="green"
            link="/payment-page"
          />
          <Button
            text={state.dictionary.info.subscribeOfferNoBtnText}
            className="gray"
            link="/final-intermediate-page"
            locationState={{ isFinalPage: true }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default SubsriptionOffer
