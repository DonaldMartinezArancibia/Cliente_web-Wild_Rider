/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
const { LOCALES } = require("./src/config/locales")
const { CONTENT_ROUTES } = require("./src/config/routes")
const { localePath, localePrefix } = require("./src/lib/routes")

/**
 * Trae los nodos de una colección para un idioma concreto.
 * Todos los content types comparten la misma forma, así que basta una query.
 */
const fetchContentByType = async (graphql, collection, locale) => {
  const result = await graphql(
    `
      query ($locale: GraphCMS_Locale!) {
        ${collection}(filter: { locale: { eq: $locale } }) {
          nodes {
            remoteId
            remoteTypeName
            locale
            slug
          }
        }
      }
    `,
    { locale }
  )

  if (result.errors) {
    throw new Error(
      `Error consultando ${collection} (${locale}): ${result.errors
        .map(e => e.message)
        .join(", ")}`
    )
  }

  return result.data?.[collection]?.nodes ?? []
}

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  await Promise.all(
    LOCALES.map(async locale => {
      const results = await Promise.all(
        CONTENT_ROUTES.map(route =>
          fetchContentByType(graphql, route.collection, locale)
        )
      )

      CONTENT_ROUTES.forEach((route, index) => {
        results[index].forEach(({ slug, remoteId, remoteTypeName }) => {
          createPage({
            path: localePath(locale, route.isHome ? null : slug),
            component: require.resolve(`./src/templates/${route.template}`),
            context: {
              slug,
              remoteId,
              remoteTypeName,
              langKey: locale,
              pagePath: localePrefix(locale),
            },
          })
        })
      })
    })
  )
}
