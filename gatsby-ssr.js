/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */
import React from "react"
import { renderToString } from "react-dom/server"
import { ApolloProvider } from "@apollo/client/react"
import { prerenderStatic } from "@apollo/client/react/ssr"
import { createApolloClient } from "./src/lib/apolloClient"
import { LOCALES, DEFAULT_LOCALE, HTML_LANG } from "./src/config/locales"

export { wrapPageElement } from "./gatsby-browser"

// `lang` de <html> según el prefijo de idioma de la ruta (/es/, /de/, ...; sin
// prefijo es inglés). Lectores de pantalla, traductores y buscadores lo usan.
export const onRenderBody = ({ pathname, setHtmlAttributes }) => {
  const segment = pathname.split("/")[1]
  const locale = LOCALES.includes(segment) ? segment : DEFAULT_LOCALE
  setHtmlAttributes({ lang: HTML_LANG[locale] })
}

// PRUEBA DE CONCEPTO: solo las páginas de inicio salen del build con el
// contenido de Hygraph ya dentro del HTML. El resto sigue como antes (spinner).
const PRERENDER_PATHS = /^\/(es|de|fr|other)?\/?$/

// Un cliente por página: replaceRenderer lo recupera para volcar su caché.
const clientsByPath = new Map()

export const wrapRootElement = ({ element, pathname }) => {
  const ssr = PRERENDER_PATHS.test(pathname)
  const client = createApolloClient({ ssr })
  if (ssr) clientsByPath.set(pathname, client)

  return <ApolloProvider client={client}>{element}</ApolloProvider>
}

// React 19 saca <title>, <meta> y las precargas de imágenes al inicio del HTML,
// dentro de #___gatsby. Al hidratar, el navegador los lee como contenido
// inesperado (error #418) y tira la hidratación. Hay que moverlos al <head>.
const LEADING_HOISTABLES = /^(?:<link\b[^>]*\/>|<meta\b[^>]*\/>|<title>[^<]*<\/title>)+/

const decodeEntities = text =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")

const hoistableToElement = (tag, index) => {
  const key = `hoisted-${index}`
  if (tag.startsWith("<title")) {
    return <title key={key}>{decodeEntities(tag.replace(/<\/?title>/g, ""))}</title>
  }
  const props = { key }
  for (const [, name, value] of tag.matchAll(/([\w:-]+)="([^"]*)"/g)) {
    props[name] = decodeEntities(value)
  }
  return React.createElement(tag.startsWith("<link") ? "link" : "meta", props)
}

/** Separa el HTML en [etiquetas que van al <head>, resto del cuerpo]. */
const splitHoistables = html => {
  const leading = html.match(LEADING_HOISTABLES)?.[0] ?? ""
  const tags = leading.match(/<link\b[^>]*\/>|<meta\b[^>]*\/>|<title>[^<]*<\/title>/g) ?? []
  const headElements = tags
    // De las 27 precargas de imágenes solo interesa la del banner (el LCP).
    .filter(tag => !tag.startsWith("<link") || tag.includes("fetchPriority"))
    .map(hoistableToElement)
  return [headElements, html.slice(leading.length)]
}

export const replaceRenderer = async ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
  setPostBodyComponents,
  pathname,
}) => {
  const client = clientsByPath.get(pathname)
  if (!client) return
  clientsByPath.delete(pathname)

  // Renderiza en bucle hasta que todas las consultas de la página resuelven.
  const { result } = await prerenderStatic({
    tree: bodyComponent,
    renderFunction: renderToString,
  })
  const [headElements, body] = splitHoistables(result)
  setHeadComponents(headElements)
  replaceBodyHTMLString(body)

  // El navegador arranca con esta caché y no necesita mostrar el spinner.
  const state = JSON.stringify(client.extract()).replace(/</g, "\\u003c")
  setPostBodyComponents([
    <script
      key="apollo-state"
      dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${state}` }}
    />,
  ])
}
