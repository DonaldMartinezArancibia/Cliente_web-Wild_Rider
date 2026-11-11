/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
import React from "react"
import { ApolloProvider } from "@apollo/client/react"
import Layout from "./src/components/layout"
// Fuentes autoalojadas (antes: @import de Google Fonts, que bloqueaba el render).
// Mismos pesos que se cargaban antes.
import "@fontsource/carter-one/400.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/inter/400.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/700.css"
import "@fontsource/inter-tight/700.css"
import "./src/styles/global.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { I18nProvider } from "./src/context/i18nContext"
import { createApolloClient } from "./src/lib/apolloClient"

const wrapPageElement = ({ element, props }) => (
  <I18nProvider>
    <Layout {...props}>{element}</Layout>
  </I18nProvider>
)

// El cliente se crea al hidratar (no al importar el módulo: gatsby-ssr.js
// también lo importa y allí no hay window). Arranca con la caché que el build
// dejó en el HTML y revalida contra Hygraph.
let apolloClient
const getApolloClient = () => {
  if (!apolloClient) {
    apolloClient = createApolloClient({ initialState: window.__APOLLO_STATE__ })
  }
  return apolloClient
}

const wrapRootElement = ({ element }) => (
  <ApolloProvider client={getApolloClient()}>{element}</ApolloProvider>
)

export { wrapPageElement, wrapRootElement }
