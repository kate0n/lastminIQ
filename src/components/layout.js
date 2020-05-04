import React from "react"
import Header from "./header"
import SidebarMenu from "./sidebar-menu"
import Head from "./head"
import Context from "../context/Context"
import OpenGraph from "./openGraph"

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { state } = React.useContext(Context)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  if (state.isLoading) {
    return "Loading..."
  }

  return (
    <>
      <Head />
      <OpenGraph />
      <SidebarMenu isMenuOpen={isMenuOpen} />
      <div className={`${isMenuOpen ? "app-wrapper--open" : "app-wrapper"}`}>
        <main
          onClick={isMenuOpen ? handleMenuClick : null}
          className="outer-container"
        >
          <Header isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout
