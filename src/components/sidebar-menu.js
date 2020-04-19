import React from "react"
import { navigate } from "gatsby"
import Context from "../context/Context"
import { CurrentProgress } from "../utils/isUserHaveFreeQuestions"

const SidebarMenu = ({ isMenuOpen }) => {
  const { state, dispatch } = React.useContext(Context)
  const score = CurrentProgress()

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/login-page")
  }

  return (
    <div className={`sidebar-menu ${isMenuOpen ? "sidebar-menu--open" : ""}`}>
      <div className="sidebar-menu__user-wrapper text-sm">
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

        {/* score */}
        <div className="sidebar-menu__user-score">
          {state.dictionary.info.sidebarScoreText.replace(
            "{currentProgress}",
            score
          )}
        </div>

        {/* score */}
        <div onClick={logout} className="sidebar-menu__user-logout">
          {state.dictionary.info.sidebarLogoutBtnText}
        </div>
      </div>
    </div>
  )
}

export default SidebarMenu
