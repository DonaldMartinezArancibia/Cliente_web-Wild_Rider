import { gql } from "@apollo/client"

const AboutUsAndOurTeams = gql`
  query AboutUsAndOurTeams($locale: [Locale!]!) {
    aboutUsAndOurTeams(locales: $locale) {
      theTeam {
        name
        description
        photo(locales: en) {
          url
        }
      }
    }
  }
`

export { AboutUsAndOurTeams }
