import React from "react"
import { navigate } from "gatsby"
import Context from "../context/Context"
import { CurrentProgress } from "../utils/isUserHaveFreeQuestions"

const SidebarMenu = ({ isMenuOpen }) => {
  const { state, dispatch } = React.useContext(Context)
  const score = CurrentProgress()

  const handleUnsubscribe = () => {
    console.log("unsubscribe")
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/login-page")
  }

  return (
    <div className={`sidebar-menu ${isMenuOpen ? "sidebar-menu--open" : ""}`}>
      <div className="sidebar-menu__user-wrapper">
        {/* photo + name */}
        <div className="sidebar-menu__user">
          <div className="sidebar-menu__user-photo">
            <img
              src={
                (state.isBrowser &&
                  localStorage.getItem("userInfo") &&
                  JSON.parse(localStorage.getItem("userInfo")).photo) ||
                state.userInfo.photo
              }
              alt="User photo"
            />
          </div>
          <div>
            {(state.isBrowser &&
              localStorage.getItem("userInfo") &&
              JSON.parse(localStorage.getItem("userInfo")).name) ||
              ""}
          </div>
        </div>

        {/* subscription info */}
        {state.subscription ? (
          <div className="sidebar-menu__item">
            IQ MASTER
            <span
              onClick={handleUnsubscribe}
              className="sidebar-menu__unsubscribe"
            >
              unsubscribe
            </span>
          </div>
        ) : (
          <div className="sidebar-menu__item">FREE</div>
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
