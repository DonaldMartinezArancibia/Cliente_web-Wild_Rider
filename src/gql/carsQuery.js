import { gql } from "@apollo/client"

const Car = gql`
  query Car($locale: [Locale!]!) {
    cars(locales: $locale) {
      carName
      id
      carMainPhoto {
        url
      }
    }
  }
`

export { Car }
