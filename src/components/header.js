import React, { useContext } from "react"
import { navigate } from "gatsby"
import LasminLogo from "../images/lastmin-logo.svg"
import Context from "../context/Context"
import { CurrentProgress } from "../utils/isUserHaveFreeQuestions"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css

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

  const handleUnsubscribe = () => {
    confirmAlert({
      message: "Unsubscribe IQ MASTER level?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`${state.url}/unsubscription`, {
              method: "post",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `facebook_id=${encodeURI(userInfo.userID)}`,
            })
              .then(result => {
                console.log("unsubscribe result", result)
                return result.json()
              })
              .then(data => {
                data.status === "canceled" &&
                  dispatch({ type: "ADD_SUBSCRIPTION", payload: false })
                navigate("/final-intermediate-page")
              })
          },
        },
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
      ],
    })
  }

  const subscription =
    (state.isBrowser &&
      localStorage.getItem("subscription") &&
      JSON.parse(localStorage.getItem("subscription"))) ||
    state.subscription

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
        {/* <===== user-name with arrow-down mobile < 700px */}
        <div onClick={handleMenuClick} className="header__user__dropdown">
          {userInfo && userInfo.name}&nbsp;
        </div>
        {/* ==========> */}

        {/* user  info desktop  */}
        <div
          onClick={isMobile ? handleMenuClick : null}
          className="header__user-info"
        >
          <div className="header__user-info__name">
            {(userInfo && userInfo.name) || ""}
            <img src="/logout.svg" onClick={logout} alt="logout" />
          </div>

          {/* subscription info   */}
          {subscription ? (
            <div className="unsubscribe">
              IQ Master
              <img
                src="/unsubscribeBtn.svg"
                onClick={handleUnsubscribe}
                alt="unsubscribe"
              />
            </div>
          ) : (
            <div className="unsubscribe">IQ Basic</div>
          )}

          <div>
            {state.dictionary.info.sidebarScoreText.replace(
              "{currentProgress}",
              score
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
