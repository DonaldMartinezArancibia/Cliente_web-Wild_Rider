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
  query IndexContent {
    indices {
      id
      mainTextBelowTitle
      mainTitle
      mainTextBelow {
        html
        markdown
        text
      }
    }
  }
`

export { Index, IndexContent }
