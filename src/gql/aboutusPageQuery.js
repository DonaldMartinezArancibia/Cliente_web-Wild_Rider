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
      aboutUsMainContent {
        raw
      }
    }
  }
`

export { AboutUsAndOurTeam, AboutUsContent }
