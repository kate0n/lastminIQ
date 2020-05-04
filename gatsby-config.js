module.exports = {
  siteMetadata: {
    title: `LastminIQ`,
    titleTemplate: `Lastmin IQ - play and win!`,
    description: `Lastmin IQ - play and win!`,
    url: `https://iq.lastmin.tv`,
    image: `https://iq.lastmin.tv/LastminIQ_sharing.png`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon-16x16.png`, // favicon
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-next-seo",
      options: {
        openGraph: {
          type: "website",
          locale: "en_IE",
          // url: "https://iq.lastmin.tv/",
          site_name: "iq.lastmin.tv",
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
        },
      },
    },
  ],
}
