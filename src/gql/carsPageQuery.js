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

const CarContent = gql`
  query CarsAndQuotes($locale: [Locale!]!) {
    carsAndQuotes(locales: $locale) {
      title
    }
  }
`

export { CarsAndQuote, CarContent }
