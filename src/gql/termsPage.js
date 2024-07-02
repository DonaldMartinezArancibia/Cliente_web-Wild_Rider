import { gql } from "@apollo/client"

const TermsOfServicePage = gql`
  query TermsOfServicePage($internalId: ID!, $locale: [Locale!]!) {
    termsOfServicePage(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
        searchInputPlaceholder
      }
    }
  }
`

export { TermsOfServicePage }
