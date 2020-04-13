import React from "react"
import { Helmet } from "react-helmet"

const Head = () => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <base href="/" />
      <title>LastminIQ</title>
      <meta name="Description" content="LastminIQ" />
      <meta property="og:title" content="LastminIQ" />
      <meta property="og:description" content="LastminIQ" />
      {/* <link
    rel="apple-touch-icon"
    sizes="57x57"
    href="/favicon/apple-icon-57x57.png"
   /> */}
      {/* <link rel="manifest" href="/favicon/manifest.json" /> */}
      <meta name="msapplication-TileColor" content="#ffffff" />
      {/* <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" /> */}
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  )
}

export default Head
