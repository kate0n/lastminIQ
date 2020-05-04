import React, { FC } from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import Context from "../context/Context"

const OpenGraph = () => {
  const { state } = React.useContext(Context)

  const currentUrl = state.isBrowser && window.location.href
  const url = currentUrl || "https://iq.lastmin.tv/"
  console.log("OpenGraph current URL", url)
  return (
    <GatsbySeo
      title="Lastmin IQ - play and win!"
      description="Lastmin IQ - play and win!"
      canonical="https://iq.lastmin.tv/"
      openGraph={{
        url: url,
        title: "Lastmin IQ - play and win!",
        description: "Lastmin IQ - play and win!",
        images: [
          {
            url: "https://iq.lastmin.tv/LastminIQ_sharing.png",
            width: 470,
            height: 246,
            alt: "Og Image Alt",
          },
        ],
        site_name: "iq.lastmin.tv",
      }}
    />
  )
}
export default OpenGraph
