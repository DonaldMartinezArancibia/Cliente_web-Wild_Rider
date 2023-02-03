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

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const result = await graphql(`
//     query {
//       posts {
//         id
//         slug
//       }
//     }
//   `)

//   console.log(result.data)

//   result.data.posts.forEach(({ node }) => {
//     createPage({
//       path: `/dynamic/${node.slug}`,
//       component: require.resolve("./src/templates/DynamicPage.js"),
//       context: {
//         slug: node.slug,
//       },
//     })
//   })
// }
