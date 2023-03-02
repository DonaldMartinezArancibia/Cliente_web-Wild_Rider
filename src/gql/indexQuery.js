import { gql } from "@apollo/client"

const IndexById = gql`
  query IndexById($internalId: ID!, $locale: [Locale!]!) {
    index(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`

export { IndexById }
