/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
import React from "react"
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import { MDXProvider } from "@mdx-js/react"
import fetch from "isomorphic-fetch"
import Layout from "./src/components/layout"
import "./src/styles/global.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "video-react/dist/video-react.css"

const httpLink = new HttpLink({
  uri: process.env.GATSBY_GRAPHCMS_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.GATSBY_GRAPHCMS_TOKEN}`,
  },
  fetch,
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)

const wrapRootElement = ({ element }) => (
  <ApolloProvider client={apolloClient}>
    <MDXProvider>{element}</MDXProvider>
  </ApolloProvider>
)

export { wrapPageElement, wrapRootElement }
