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
          width: 470,
          height: 246,
          alt: "Og Image Alt",
        },
        {
          url: "https://iq.lastmin.tv/LastminIQ_sharing.png",
          width: 470,
          height: 246,
          alt: "Og Image Alt",
        },
        {
          url: "https://iq.lastmin.tv/LastminIQ_sharing.png",
          width: 470,
          height: 246,
          alt: "Og Image Alt",
        },
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

export default OpenGraph
