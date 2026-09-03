/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
import React from "react"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import Layout from "./src/components/layout"
import "./src/styles/global.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const httpLink = new HttpLink({
  uri: process.env.GATSBY_GRAPHCMS_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.GATSBY_GRAPHCMS_TOKEN}`,
  },
})

// Hygraph returns the same `id` for every locale of a translated entry, so the
// default Apollo cache key (__typename:id) collides across locales and lets a
// stale-language response overwrite the current one. Include the query's
// locale in the key so each language gets its own cache entry.
const localizedTypenames = [
  "AboutUsAndOurTeam",
  "AirportAndOfficePage",
  "CampingPage",
  "Car",
  "CarQuoteForm",
  "CarsAndQuote",
  "ContactAndLocation",
  "Faq",
  "FrequentAnswersAndQuestion",
  "HeaderAndFooterElement",
  "Imprint",
  "Index",
  "Insurance",
  "Menu",
  "Post",
  "RentalInfo",
  "Review",
  "RoadSafety",
  "Seos",
  "Testimonial",
  "TravelPlanner",
]

const localizedKeyFields = (obj, { variables }) => {
  // Some queries (e.g. the language selector) fetch these types without
  // selecting `id`. Leave those un-normalized instead of colliding on
  // "TypeName:undefined:..." with every other id-less query for the type.
  if (obj.id == null) return false
  return `${obj.__typename}:${obj.id}:${JSON.stringify(variables?.locale ?? "")}`
}

const typePolicies = Object.fromEntries(
  localizedTypenames.map(typename => [
    typename,
    { keyFields: localizedKeyFields },
  ])
)

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({ typePolicies }),
  // Revisiting a locale (e.g. switching languages back and forth) reuses the
  // same query variables Apollo already has a root-query cache entry for.
  // cache-first would then serve that stale response instead of refetching,
  // so always revalidate against the network on every render of these queries.
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-and-network" },
  },
})

import { I18nProvider } from "./src/context/i18nContext"
// ...existing code...
const wrapPageElement = ({ element, props }) => (
  <I18nProvider>
    <Layout {...props}>{element}</Layout>
  </I18nProvider>
)

const wrapRootElement = ({ element }) => (
  <ApolloProvider client={apolloClient}>{element}</ApolloProvider>
)

export { wrapPageElement, wrapRootElement }
