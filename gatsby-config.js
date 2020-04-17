module.exports = {
  siteMetadata: {
    title: `LastminIQ`,
    description: ``,
    author: `@gatsbyjs`,
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
    // {
    //   resolve: `gatsby-plugin-intl`,
    //   options: {
    //     // language JSON resource path
    //     path: `${__dirname}/locale`,
    //     // supported language
    //     languages: [`LV`, `RU`, `LT`, `EE`, `EN`, `FI`],
    //     // language file path
    //     defaultLanguage: `EN`,
    //     // option to redirect to `/EN` when connecting `/`
    //     redirect: true,
    //   },
    // },
  ],
}
