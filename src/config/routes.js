/**
 * Mapa content-type de Hygraph -> template de Gatsby.
 *
 * Es la única tabla que hay que tocar para añadir o quitar un tipo de página:
 * gatsby-node.js genera las rutas a partir de aquí y el selector de idioma
 * resuelve las traducciones con la misma lista.
 *
 * - `collection`: nombre del campo raíz en la capa GraphQL de Gatsby.
 * - `template`:   archivo dentro de src/templates/.
 * - `isHome`:     la página cuelga del prefijo de idioma sin slug (`/`, `/es/`).
 *
 * CommonJS a propósito: gatsby-node.js también consume este módulo.
 */
const CONTENT_ROUTES = [
  {
    collection: "allGraphCmsIndex",
    template: "index.jsx",
    isHome: true,
  },
  {
    collection: "allGraphCmsContactAndLocation",
    template: "contactAndLocation.jsx",
  },
  {
    collection: "allGraphCmsCarsAndQuote",
    template: "ourCarsAndReservation.jsx",
  },
  {
    collection: "allGraphCmsAboutUsAndOurTeam",
    template: "aboutUsAndOurTeam.jsx",
  },
  {
    collection: "allGraphCmsTestimonial",
    template: "testimonials.jsx",
  },
  {
    collection: "allGraphCmsFaq",
    template: "frequentAnswerAndQuestion.jsx",
  },
  {
    collection: "allGraphCmsTravelPlanner",
    template: "travelPlanner.jsx",
  },
  {
    collection: "allGraphCmsCarQuoteForm",
    template: "CarForm.jsx",
  },
  {
    collection: "allGraphCmsCampingPage",
    template: "campingPage.jsx",
  },
  {
    collection: "allGraphCmsAirportAndOfficePage",
    template: "airportAndOffice.jsx",
  },
  {
    collection: "allGraphCmsInsurance",
    template: "insurance.jsx",
  },
  {
    collection: "allGraphCmsRoadSafety",
    template: "roadSafety.jsx",
  },
  {
    collection: "allGraphCmsImprint",
    template: "imprint.jsx",
  },
]

module.exports = { CONTENT_ROUTES }
