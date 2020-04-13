import React from "react"

const TextOverlay = ({ text }) => (
  <div className="quiz-start__title">
    <div
      className="quiz-start__title__overlay text-md"
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  </div>
)

export default TextOverlay
