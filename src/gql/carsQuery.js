import { gql } from "@apollo/client"

const Car = gql`
  query Car($locale: [Locale!]!) {
    cars(locales: $locale, orderBy: numberOfOrder_ASC, last: 2000) {
      carName
      id
      carMainPhoto(locales: en) {
        url
        altText
      }
      yearOfCarTitle
      yearOfCarValue
      passengersTitle
      passengersOfCarValue
      longTermRentalTitle
    }
  }
`

export { Car }
