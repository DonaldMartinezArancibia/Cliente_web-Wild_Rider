import { gql } from "@apollo/client"

const TravelPlanner = gql`
  query TravelPlanner($internalId: ID!, $locale: [Locale!]!) {
    travelPlanner(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`

export { TravelPlanner }
