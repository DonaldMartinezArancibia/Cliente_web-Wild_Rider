import { gql } from "@apollo/client"

const PrivacyPolicyPage = gql`
  query PrivacyPolicyPage($internalId: ID!, $locale: [Locale!]!) {
    privacyPolicyPage(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
        searchInputPlaceholder
      }
    }
  }
`

export { PrivacyPolicyPage }
