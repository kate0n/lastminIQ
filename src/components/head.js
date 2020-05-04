import React from "react"
import { Helmet } from "react-helmet"
import Context from "../context/Context"

const Head = () => {
  const { state } = React.useContext(Context)
  const title = "Lastmin IQ - play and win!"
  const currentUrl = state.isBrowser && window.location.href
  console.log("LOCATION HEAD", currentUrl)
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <base href="/" />
      <title>LastminIQ</title>
      <link rel="canonical" href={currentUrl} />
      <meta property="og:url" content={currentUrl} />
      {/* <meta property="og:url" content="https://iq.lastmin.tv" />  */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="iq.lastmin.tv" />
      <meta
        property="og:image"
        content="https://iq.lastmin.tv/LastminIQ_sharing.png"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content="Lastmin Logo" />
      <meta property="og:image:width" content="470" />
      <meta property="og:image:height" content="246" />
      <meta name="description" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={title} />
      {/* <meta property="fb:app_id" content="133123123123" /> */}
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
