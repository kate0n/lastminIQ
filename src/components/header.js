import React, { useContext } from "react"
import { navigate } from "gatsby"
import LasminLogo from "../images/lastmin-logo.svg"
import Context from "../context/Context"

const Header = ({ isMenuOpen, handleMenuClick }) => {
  const { state, dispatch } = useContext(Context)

  const logout = () => {
    dispatch({ type: "MIRAGE", payload: false })
    dispatch({ type: "LOGOUT" })
    navigate("/")
  }

  return (
    <header
      className="header__wrapper"
      onClick={isMenuOpen ? handleMenuClick : null}
    >
      {/* logo */}
      <div className="header__logo">
        <img
          className="header__logo-img"
          src={LasminLogo}
          alt="LastminIQ logo"
        />
      </div>

      <div className="header__user">
        <div className="header__user-photo">
          <img
            className="header__user-photo-img"
            src={
              (state.isBrowser &&
                localStorage.getItem("userInfo") &&
                JSON.parse(localStorage.getItem("userInfo")).photo) ||
              state.userInfo.photo
            }
            alt="User photo"
          />
        </div>
        {/* user info mobile < 700px */}
        <div
          onClick={handleMenuClick}
          className="header__user__dropdown text_sm"
        >
          {state.isBrowser &&
            localStorage.getItem("userInfo") &&
            JSON.parse(localStorage.getItem("userInfo")).name}{" "}
          &nbsp;
        </div>
        {/* user  info desktop  */}
        <div onClick={handleMenuClick} className="header__user-info text_sm">
          <div>{state.userInfo.name || ""} &nbsp; &nbsp;</div>
          <div>
            {state.dictionary.info.sidebarScoreText}:{" "}
            {(state.isBrowser && localStorage.getItem("score")) || 0} &nbsp;
            &nbsp;
          </div>
          <div onClick={logout} className="header__user-info__logout ">
            {state.dictionary.info.sidebarLogoutBtnText}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
