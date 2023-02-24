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
              id
              locale
              slug
            }
          }
        }
      `,
      { locale }
    )
    const urlPrefix = locale == "en" ? "/blog/" : `${locale}/blog/`

    result.data.allGraphCmsPost.nodes.forEach(({ slug, id }) => {
      createPage({
        path: `${urlPrefix}${slug}`,
        component: require.resolve("./src/templates/Post.jsx"),
        context: {
          slug: slug,
          id: id,
          langKey: locale,
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
