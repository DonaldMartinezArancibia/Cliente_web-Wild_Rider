/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
// const path = require(`path`)
/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.jsx"),
    context: {},
    defer: true,
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const locales = ["es", "en"]

  await Promise.all(
    locales.map(async locale => {
      const [postsResult, indexResult, contactResult] = await Promise.all([
        graphql(
          `
            query ($locale: GraphCMS_Locale!) {
              allGraphCmsPost(filter: { locale: { eq: $locale } }) {
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
        ),
        graphql(
          `
            query ($locale: GraphCMS_Locale!) {
              allGraphCmsIndex(filter: { locale: { eq: $locale } }) {
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
        ),
        graphql(
          `
            query ($locale: GraphCMS_Locale!) {
              allGraphCmsContactAndLocation(
                filter: { locale: { eq: $locale } }
              ) {
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
        ),
      ])

      const urlPrefix = locale === "en" ? "/" : `/${locale}/`

      // Creación de páginas de los posts
      postsResult.data.allGraphCmsPost.nodes.forEach(
        ({ slug, id, remoteId, remoteTypeName }) => {
          createPage({
            path: `${urlPrefix}blog/${slug}`,
            component: require.resolve("./src/templates/Post.jsx"),
            context: {
              slug: slug,
              remoteId: remoteId,
              remoteTypeName: remoteTypeName,
              langKey: locale,
              pagePath: `${urlPrefix}blog`,
            },
          })
        }
      )
      // Creación de páginas de inicio en los diferentes idiomas
      indexResult.data.allGraphCmsIndex.nodes.forEach(
        ({ slug, remoteId, remoteTypeName }) => {
          createPage({
            path: `${urlPrefix}`,
            component: require.resolve("./src/templates/index.jsx"),
            context: {
              slug: slug,
              remoteId: remoteId,
              remoteTypeName: remoteTypeName,
              langKey: locale,
              pagePath: urlPrefix,
            },
          })
        }
      )

      // Creación de páginas de contacto en los diferentes idiomas
      contactResult.data.allGraphCmsContactAndLocation.nodes.forEach(
        ({ slug, remoteId, remoteTypeName }) => {
          createPage({
            path: `${urlPrefix}${slug}`,
            component: require.resolve(
              "./src/templates/contactAndLocation.jsx"
            ),
            context: {
              slug: slug,
              remoteId: remoteId,
              remoteTypeName: remoteTypeName,
              langKey: locale,
              pagePath: urlPrefix,
            },
          })
        }
      )
    })
  )
}
