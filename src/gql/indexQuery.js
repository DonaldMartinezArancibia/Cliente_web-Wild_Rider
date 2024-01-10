import { gql } from "@apollo/client"

const Index = gql`
  query Index($internalId: ID!, $locale: [Locale!]!) {
    index(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`

const IndexContent = gql`
  query IndexContent($locale: [Locale!]!) {
    indices(locales: $locale) {
      id
      mainTextBelow {
        html
        markdown
        text
      }
      viewCarsButtonText
      viewCarsbuttonurl {
        slug
      }
      videosSectionTitle
      presentationVideos(locales: en) {
        url
        mimeType
      }
      youtubeUrlVideo
      offersSectionTitle
      offersSectionText {
        html
        markdown
        text
      }
      freeBenefitsElements {
        benefitImage(locales: en) {
          url
        }
        benefitTitle
      }
      testimonialsSectionTitle
      testimonialSectionText {
        html
        markdown
        text
      }
      textOfCookies {
        html
        markdown
        text
      }
      acceptCookieButton
      declineCookieButton
    }
  }
`

export { Index, IndexContent }
