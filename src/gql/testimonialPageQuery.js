import { gql } from "@apollo/client"

const Testimonial = gql`
  query Testimonial($internalId: ID!, $locale: [Locale!]!) {
    testimonial(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`

export { Testimonial }
