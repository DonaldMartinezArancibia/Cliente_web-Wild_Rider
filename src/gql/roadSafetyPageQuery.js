import { gql } from "@apollo/client"

const RoadSafety = gql`
  query RoadSafety($internalId: ID!, $locale: [Locale!]!) {
    roadSafety(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`
const RoadSafetyContent = gql`
  query roadSafeties($locale: [Locale!]!) {
    roadSafeties(locales: $locale) {
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

export { RoadSafety, RoadSafetyContent }
