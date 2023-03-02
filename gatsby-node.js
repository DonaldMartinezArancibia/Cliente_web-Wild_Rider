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

  for (const locale of locales) {
    const result = await graphql(
      `
        query ($locale: GraphCMS_Locale!) {
          allGraphCmsPost(filter: { locale: { eq: $locale } }) {
            nodes {
              remoteId
              locale
              slug
            }
          }
        }
      `,
      { locale }
    )
    const urlPrefix = locale == "en" ? "/blog/" : `${locale}/blog/`

    result.data.allGraphCmsPost.nodes.forEach(({ slug, id, remoteId }) => {
      createPage({
        path: `${urlPrefix}${slug}`,
        component: require.resolve("./src/templates/Post.jsx"),
        context: {
          slug: slug,
          remoteId: remoteId,
          langKey: locale,
          pagePath: urlPrefix,
        },
      })
    })
  }

  for (const locale of locales) {
    const result = await graphql(
      `
        query ($locale: GraphCMS_Locale!) {
          allGraphCmsIndex(filter: { locale: { eq: $locale } }) {
            nodes {
              remoteId
              locale
              slug
            }
          }
        }
      `,
      { locale }
    )
    const urlPrefix = locale == "en" ? "/" : `/${locale}`

    result.data.allGraphCmsIndex.nodes.forEach(({ slug, remoteId }) => {
      createPage({
        path: `${urlPrefix}`,
        component: require.resolve("./src/templates/index.jsx"),
        context: {
          slug: slug,
          remoteId: remoteId,
          langKey: locale,
          pagePath: urlPrefix,
        },
      })
    })
  }
}
