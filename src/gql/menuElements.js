import { gql } from "@apollo/client"

const menuElements = gql`
  query menuElements($locale: [Locale!]!) {
    menus(locales: $locale) {
      menuElements {
        ... on ContactAndLocation {
          id
          slug
          title
        }
        ... on AboutUs {
          id
          slug
          title
        }
        ... on Index {
          id
          slug
          title
        }
      }
    }
  }
`

export { menuElements }
