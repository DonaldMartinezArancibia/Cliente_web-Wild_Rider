import { gql } from "@apollo/client"

const ContactAndLocation = gql`
  query ContactAndLocation($internalId: ID!, $locale: [Locale!]!) {
    contactAndLocations(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`

export { ContactAndLocation }
