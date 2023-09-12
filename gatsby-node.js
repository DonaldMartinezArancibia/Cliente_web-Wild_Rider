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
      async function fetchContentByType(contentType, locale) {
        const result = await graphql(
          `
            query ($locale: GraphCMS_Locale!) {
              ${contentType}(filter: { locale: { eq: $locale } }) {
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
        return result
      }

      const [
        postsResult,
        indexResult,
        contactResult,
        carsResult,
        aboutusResult,
        rentalResult,
        testimonialResult,
        faqResult,
        travelResult,
      ] = await Promise.all([
        fetchContentByType("allGraphCmsPost", locale),
        fetchContentByType("allGraphCmsIndex", locale),
        fetchContentByType("allGraphCmsContactAndLocation", locale),
        fetchContentByType("allGraphCmsCarsAndQuote", locale),
        fetchContentByType("allGraphCmsAboutUsAndOurTeam", locale),
        fetchContentByType("allGraphCmsRentalInfo", locale),
        fetchContentByType("allGraphCmsTestimonial", locale),
        fetchContentByType("allGraphCmsFaq", locale),
        fetchContentByType("allGraphCmsTravelPlanner", locale),
      ])

      function createPagesForContent(
        contentNodes,
        urlPrefix,
        componentPath,
        excludeSlug
      ) {
        contentNodes.forEach(({ slug, remoteId, remoteTypeName }) => {
          const path =
            remoteTypeName === excludeSlug ? urlPrefix : `${urlPrefix}${slug}`
          createPage({
            path: path,
            component: require.resolve(componentPath),
            context: {
              slug: slug,
              remoteId: remoteId,
              remoteTypeName: remoteTypeName,
              langKey: locale,
              pagePath: urlPrefix,
            },
          })
        })
      }

      const urlPrefix = locale === "en" ? "/" : `/${locale}/`

      // Creación de páginas de los posts
      createPagesForContent(
        postsResult.data.allGraphCmsPost.nodes,
        `${urlPrefix}blog/`,
        "./src/templates/Post.jsx"
      )

      // Creación de páginas de inicio en los diferentes idiomas
      createPagesForContent(
        indexResult.data.allGraphCmsIndex.nodes,
        urlPrefix,
        "./src/templates/index.jsx",
        indexResult.data?.allGraphCmsIndex?.nodes?.[0]?.remoteTypeName
      )

      // Creación de páginas de contacto en los diferentes idiomas
      createPagesForContent(
        contactResult.data.allGraphCmsContactAndLocation.nodes,
        urlPrefix,
        "./src/templates/contactAndLocation.jsx"
      )

      // Creación de páginas de carros y reservación en los diferentes idiomas
      createPagesForContent(
        carsResult.data.allGraphCmsCarsAndQuote.nodes,
        urlPrefix,
        "./src/templates/ourCarsAndReservation.jsx"
      )

      // Creación de páginas de sobre nosotros y el equipo en los diferentes idiomas
      createPagesForContent(
        aboutusResult.data.allGraphCmsAboutUsAndOurTeam.nodes,
        urlPrefix,
        "./src/templates/aboutUsAndOurTeam.jsx"
      )

      // Creación de páginas para la información de renta en los diferentes idiomas
      createPagesForContent(
        rentalResult.data.allGraphCmsRentalInfo.nodes,
        urlPrefix,
        "./src/templates/aboutUsAndOurTeam.jsx"
      )

      // Creación de páginas de testimonios en los diferentes idiomas
      createPagesForContent(
        testimonialResult.data.allGraphCmsTestimonial.nodes,
        urlPrefix,
        "./src/templates/aboutUsAndOurTeam.jsx"
      )

      // Creación de páginas de preguntas frecuentes en los diferentes idiomas
      createPagesForContent(
        faqResult.data.allGraphCmsFaq.nodes,
        urlPrefix,
        "./src/templates/frequentAnswerAndQuestion.jsx"
      )

      // Creación de páginas de preguntas frecuentes en los diferentes idiomas
      createPagesForContent(
        travelResult.data.allGraphCmsTravelPlanner.nodes,
        urlPrefix,
        "./src/templates/aboutUsAndOurTeam.jsx"
      )
    })
  )
}
