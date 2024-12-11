import { gql } from "@apollo/client"

const CampingPage = gql`
  query CampingPage($internalId: ID!, $locale: [Locale!]!) {
    campingPage(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`

const CampingPageContent = gql`
  query campingPages($locale: [Locale!]!) {
    campingPages(locales: $locale) {
      title
      toggleContent(last: 2000) {
        displayContent {
          markdown
        }
        extendedContent {
          markdown
          raw
        }
      }
      coverOfVideo(locales: en) {
        url
      }
      videos(locales: en) {
        url
        mimeType
      }
    }
  }
`

export { CampingPage, CampingPageContent }
