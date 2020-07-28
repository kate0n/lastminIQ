import React from "react"
import { Link } from "gatsby"

const Button = ({ text, className, link, locationState, onClick }) => {
  return (
    <button className={`button button--${className}`} onClick={onClick}>
      <Link to={link} state={locationState && locationState}>
        {text}
      </Link>
    </button>
  )
}

export const ButtonWidthExternalLink = ({
  text,
  className,
  link,
  notBlank = false,
}) => {
  return (
    <button className={`button button--${className}`}>
      <a href={link} target={notBlank ? "_self" : "__blank"}>
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
