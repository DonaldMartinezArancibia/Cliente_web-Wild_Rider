import { gql } from "@apollo/client"

const ImprintContent = gql`
  query Imprint($locale: [Locale!]!) {
    imprints(locales: $locale) {
      imprintContent {
        markdown
        html
        raw
      }
      localizations {
        slug
        locale
      }
    }
  }
`
const Imprint = gql`
  query Imprint($internalId: ID!, $locale: [Locale!]!) {
    imprint(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`

export { ImprintContent, Imprint }
