import React from "react"
import { Link } from "gatsby"

const Button = ({ text, className, link, locationState }) => {
  return (
    <button className={`button button--${className}`}>
      <Link to={link} state={locationState && locationState}>
        {text}
      </Link>
    </button>
  )
}

export const ButtonWidthExternalLink = ({ text, className, link }) => {
  return (
    <button className={`button button--${className}`}>
      <a href={link} target="__blank">
        {text}
      </a>
    </button>
  )
}

export const FacebookLoginButton = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="button button--fb text-sm">
      {text}
    </button>
  )
}

export default Button
