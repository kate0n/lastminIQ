import React, { FC } from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"

const OpenGraph = () => (
  <GatsbySeo
    title="Lastmin IQ - play and win!"
    description="Lastmin IQ - play and win!"
    canonical="https://iq.lastmin.tv/"
    openGraph={{
      url: "https://iq.lastmin.tv/",
      title: "Lastmin IQ - play and win!",
      description: "Lastmin IQ - play and win!",
      images: [
        {
          url: "https://iq.lastmin.tv/LastminIQ_sharing.png",
        },
      ],
      site_name: "iq.lastmin.tv",
    }}
  />
)

export default OpenGraph
