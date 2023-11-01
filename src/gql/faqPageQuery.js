import { gql } from "@apollo/client"

const Faq = gql`
  query Faq($internalId: ID!, $locale: [Locale!]!) {
    faq(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
        searchInputPlaceholder
      }
    }
  }
`

const FaqContent = gql`
  query Faq($locale: [Locale!]!) {
    faqs(locales: $locale) {
      title
      searchInputPlaceholder
    }
  }
`

export { Faq, FaqContent }
