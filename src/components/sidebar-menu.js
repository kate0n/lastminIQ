import React from "react"
import { navigate } from "gatsby"
import Context from "../context/Context"

const SidebarMenu = ({ isMenuOpen }) => {
  const { state, dispatch } = React.useContext(Context)

  const logout = () => {
    dispatch({ type: "MIRAGE", payload: false })
    dispatch({ type: "LOGOUT" })
    navigate("/login-page", { state: { isReload: true } })
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
            (state.isBrowser && localStorage.getItem("score")) || 0
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
