import React, { useContext } from "react"
import { navigate } from "gatsby"
import LasminLogo from "../images/lastmin-logo.svg"
import Context from "../context/Context"
import { CurrentProgress } from "../utils/isUserHaveFreeQuestions"

const Header = ({ isMenuOpen, handleMenuClick }) => {
  const { state, dispatch } = useContext(Context)
  const [isMobile, setIsMobile] = React.useState(false)
  const score = CurrentProgress()

  React.useEffect(() => {
    state.isBrowser && window.innerWidth <= 700
      ? setIsMobile(true)
      : setIsMobile(false)
  }, [])

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/login-page")
  }

  const userInfo =
    state.isBrowser &&
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"))

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
            src={(userInfo && userInfo.photo) || state.userInfo.photo}
            alt="User photo"
          />
        </div>
        {/* user info mobile < 700px */}
        <div
          onClick={handleMenuClick}
          className="header__user__dropdown text_sm"
        >
          {userInfo && userInfo.name}&nbsp;
        </div>
        {/* user  info desktop  */}
        <div
          onClick={isMobile ? handleMenuClick : null}
          className="header__user-info text_sm"
        >
          <div>{(userInfo && userInfo.name) || ""}&nbsp; &nbsp;</div>
          <div>
            {state.dictionary.info.sidebarScoreText.replace(
              "{currentProgress}",
              score
            )}
            &nbsp; &nbsp;
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
