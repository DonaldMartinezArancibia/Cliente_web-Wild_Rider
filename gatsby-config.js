/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = {
  developMiddleware: app => {
    app.use(
      "/apis",
      createProxyMiddleware({
        target: "https://maps.googleapis.com",
        changeOrigin: true,
        pathRewrite: {
          "^/apis":
            "/maps/api/place/details/json?placeid=ChIJkUvR8VbjoI8RjlaQqi1QI1U&fields=reviews&language=de&key=AIzaSyB2H-WpOFQN0yyp8ARh4sl36uWL_Mb0ALE",
        },
      })
    )
  },

  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-image`,
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
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-graphcms",
      options: {
        endpoint: process.env.GATSBY_GRAPHCMS_ENDPOINT,
        token: process.env.GATSBY_GRAPHCMS_TOKEN,
        locales: ["en", "es"],
      },
    },
    // Add to gatsby-config.js
    {
      resolve: `gatsby-plugin-i18n`,
      options: {
        langKeyDefault: "en",
        langKeyForNull: "en",
        prefixDefault: false,
        useLangKeyLayout: false,
      },
    },
  ],
}
