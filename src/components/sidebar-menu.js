import React from "react"
import { navigate } from "gatsby"
import Context from "../context/Context"
import { CurrentProgress } from "../utils/isUserHaveFreeQuestions"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css

const SidebarMenu = ({ isMenuOpen }) => {
  const { state, dispatch } = React.useContext(Context)
  const score = CurrentProgress()

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
                navigate("/final-page")
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

  const handleLogoClick = () => {
    navigate("/home-page")
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/login-page")
  }

  const subscription =
    (state.isBrowser &&
      localStorage.getItem("subscription") &&
      JSON.parse(localStorage.getItem("subscription"))) ||
    state.subscription

  const defaultAvatar =
    "https://am.jpmorgan.com/FundsMarketingHandler/images/default-user-image.png"

  return (
    <div className={`sidebar-menu ${isMenuOpen ? "sidebar-menu--open" : ""}`}>
      <div className="sidebar-menu__user-wrapper">
        {/* photo + name */}
        <div className="sidebar-menu__user">
          <div className="sidebar-menu__user-photo">
            <img
              src={(userInfo && userInfo.photo) || defaultAvatar}
              alt="User photo"
            />
          </div>
          <div>{userInfo && userInfo.name}</div>
        </div>

        {/* subscription info */}
        {subscription ? (
          <div className="sidebar-menu__item iq_master">
            IQ Master
            <span
              onClick={handleUnsubscribe}
              className="sidebar-menu__unsubscribe"
            >
              unsubscribe
            </span>
          </div>
        ) : (
          <div className="sidebar-menu__item iq_basic">IQ Basic</div>
        )}

        {/* score */}
        <div className="sidebar-menu__user-score sidebar-menu__item">
          {state.dictionary.info.sidebarScoreText.replace(
            "{currentProgress}",
            score
          )}
        </div>

        {/* log out */}
        <div
          onClick={logout}
          className="sidebar-menu__user-logout sidebar-menu__item"
        >
          {state.dictionary.info.sidebarLogoutBtnText}
        </div>
      </div>
    </div>
  )
}

export default SidebarMenu
