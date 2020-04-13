import React from "react"
import Context from "../context/Context"

const QuizHeader = () => {
  const { state } = React.useContext(Context)

  return (
    <div className="quiz-header text-md">
      <div className="quiz-header__text">{state.dictionary.info.titleText}</div>
    </div>
  )
}

export default QuizHeader
