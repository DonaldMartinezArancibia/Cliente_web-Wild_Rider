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
              category
              content
              locale
              slug
            }
          }
        }
      `,
      { locale }
    )

    result.data.allGraphCmsPost.nodes.forEach(({ slug }) => {
      createPage({
        path: `/dynamic/${locale}/${slug}`,
        component: require.resolve("./src/templates/DynamicPage.js"),
        context: {
          slug: slug,
          locale,
        },
      })
    })
  }
  // result.data.allGraphCmsPost.nodes.forEach(post => {
  //   createPage({
  //     path: `/dynamic/${post.slug}`,
  //     component: require.resolve("./src/templates/DynamicPage.js"),
  //     context: {
  //       slug: post.slug,
  //     },
  //   })
  // })

  // result.data.allGraphCmsPost.nodes.forEach(({ nodes }) => {
  //   createPage({
  //     path: `/dynamic/${nodes.slug}`,
  //     component: require.resolve("./src/templates/DynamicPage.js"),
  //     context: {
  //       slug: node.slug,
  //     },
  //   })
  // })
}
