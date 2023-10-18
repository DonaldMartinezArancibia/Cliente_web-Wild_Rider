import { gql } from "@apollo/client"

const Cars = gql`
  query Cars($internalId: ID!, $locale: [Locale!]!) {
    cars(where: { id: $internalId }, locales: $locale) {
      carName
      id
      carMainPhoto {
        url
      }
      carPhotos {
        url
      }
      pricesOfCar {
        priceOfCar
        season {
          seasonTitle
          startDate
          endDate
        }
      }
      carDetails
    }
  }
`

export { Cars }
