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
      viewCarsButtonText
      viewCarsbuttonurl {
        slug
      }
      mainTextBelow {
        html
        markdown
        text
      }
      videosSectionTitle
      youtubeUrlVideo
      offersSectionTitle
      testimonialsSectionTitle
      testimonialSectionText {
        html
        markdown
        text
      }
    }
  }
`

export { Index, IndexContent }
