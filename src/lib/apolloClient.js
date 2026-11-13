import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

// Hygraph returns the same `id` for every locale of a translated entry, so the
// default Apollo cache key (__typename:id) collides across locales and lets a
// stale-language response overwrite the current one. Include the query's
// locale in the key so each language gets its own cache entry.
const localizedTypenames = [
  "AboutUsAndOurTeam",
  "AirportAndOfficePage",
  "CampingPage",
  "Car",
  "CarQuoteForm",
  "CarsAndQuote",
  "ContactAndLocation",
  "Faq",
  "FrequentAnswersAndQuestion",
  "HeaderAndFooterElement",
  "Imprint",
  "Index",
  "Insurance",
  "Menu",
  "Post",
  "RentalInfo",
  "Review",
  "RoadSafety",
  "Seos",
  "Testimonial",
  "TravelPlanner",
]

const localizedKeyFields = (obj, { variables }) => {
  // Some queries (e.g. the language selector) fetch these types without
  // selecting `id`. Leave those un-normalized instead of colliding on
  // "TypeName:undefined:..." with every other id-less query for the type.
  if (obj.id == null) return false
  return `${obj.__typename}:${obj.id}:${JSON.stringify(variables?.locale ?? "")}`
}

const typePolicies = Object.fromEntries(
  localizedTypenames.map(typename => [
    typename,
    { keyFields: localizedKeyFields },
  ])
)

/**
 * Crea un cliente de Apollo para Hygraph.
 *
 * - En el navegador arranca con `initialState`, la caché que el build volcó en
 *   el HTML (`window.__APOLLO_STATE__`), y revalida contra la red.
 * - En el build (`ssr: true`) rinde con caché primero: `cache-and-network` no
 *   tiene sentido sin navegador y haría una petición por render.
 */
export function createApolloClient({ ssr = false, initialState } = {}) {
  const cache = new InMemoryCache({ typePolicies })
  if (initialState) cache.restore(initialState)

  return new ApolloClient({
    ssrMode: ssr,
    link: new HttpLink({
      uri: process.env.GATSBY_GRAPHCMS_ENDPOINT,
      headers: {
        Authorization: `Bearer ${process.env.GATSBY_GRAPHCMS_TOKEN}`,
      },
    }),
    cache,
    // Revisiting a locale (e.g. switching languages back and forth) reuses the
    // same query variables Apollo already has a root-query cache entry for.
    // cache-first would then serve that stale response instead of refetching,
    // so always revalidate against the network on every render of these queries.
    defaultOptions: ssr
      ? undefined
      : { watchQuery: { fetchPolicy: "cache-and-network" } },
  })
}
