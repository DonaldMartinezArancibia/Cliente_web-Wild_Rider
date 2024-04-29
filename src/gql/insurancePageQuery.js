import { gql } from "@apollo/client"

const Insurance = gql`
  query Insurance($internalId: ID!, $locale: [Locale!]!) {
    insurance(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`
const InsuranceContent = gql`
  query Insurances($locale: [Locale!]!) {
    insurances(locales: $locale) {
      title
      toggleContent {
        displayContent {
          markdown
        }
        extendedContent {
          markdown
          raw
        }
      }
      showText
      hideText
    }
  }
`

export { Insurance, InsuranceContent }
