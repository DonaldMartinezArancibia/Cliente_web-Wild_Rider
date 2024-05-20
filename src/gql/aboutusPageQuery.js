import { gql } from "@apollo/client"

const AboutUsAndOurTeam = gql`
  query AboutUsAndOurTeam($internalId: ID!, $locale: [Locale!]!) {
    aboutUsAndOurTeam(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`
const AboutUsContent = gql`
  query AboutUsAndOurTeams($locale: [Locale!]!) {
    aboutUsAndOurTeams(locales: $locale) {
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
      showText
      hideText
    }
  }
`

export { AboutUsAndOurTeam, AboutUsContent }
