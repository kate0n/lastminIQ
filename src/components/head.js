import React from "react"
import { Helmet } from "react-helmet"
import Context from "../context/Context"

const Head = () => {
  const { state } = React.useContext(Context)

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <base href="/" />
      <title>LastminIQ</title>
      <meta name="description" content="Lastmin IQ - play and win!" />
      <meta name="author" content="https://iq.lastmin.tv/" />
      <meta property="og:title" content="LastminIQ" />
      <meta property="og:description" content="Lastmin IQ - play and win!" />
      <meta
        property="og:image"
        content={`${state.url}/LastminIQ_sharing.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:url" content="https://iq.lastmin.tv/" />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="iq.lastmin.tv" />
      {/* <meta property="fb:app_id" content="133123123123" /> */}
      {/* <meta property="og:image:width" content="968">
      <meta property="og:image:height" content="504"> */}
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/favicon/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/favicon/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/favicon/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/favicon/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/favicon/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/favicon/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/favicon/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicon/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  )
}

export default Head
