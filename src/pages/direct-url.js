import React from "react"
import "../styles/index.scss"
import LastminLogo from "../images/lastmin-logo.svg"
import FbMessengerLogo from "../images/fb-msng-logo.svg"

const DirectUrlVisitPage = () => {
  return (
    <div className="outer-container">
      <main className="inner-container main text-gray">
        <div className="logo__wrapper">
          <img className="logo__img" src={LastminLogo} alt="LastminIQ logo" />
        </div>
        <div className="direct__desc">
          To proceed with the page, please, go to messenger and type "
          <b>Lastmin IQ</b>"
        </div>
        <div className="direct__messenger">
          <a
            className="direct__messenger-logo"
            href="https://www.messenger.com/"
          >
            <img src={FbMessengerLogo} alt="Facebook messenger logo" />
          </a>
          <div>Connect with us on Messenger</div>
        </div>
      </main>
    </div>
  )
}

export default DirectUrlVisitPage
