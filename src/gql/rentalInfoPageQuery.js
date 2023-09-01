import { gql } from "@apollo/client"

const RentalInfo = gql`
  query RentalInfo($internalId: ID!, $locale: [Locale!]!) {
    rentalInfo(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`

export { RentalInfo }
