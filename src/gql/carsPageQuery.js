import { gql } from "@apollo/client"

const CarsAndQuote = gql`
  query CarsAndQuote($internalId: ID!, $locale: [Locale!]!) {
    carsAndQuotes(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`

export { CarsAndQuote }
