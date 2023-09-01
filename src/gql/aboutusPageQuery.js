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

export { AboutUsAndOurTeam }
