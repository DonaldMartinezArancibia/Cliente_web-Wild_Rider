import { gql } from "@apollo/client"

const Cars = gql`
  query Cars($internalId: ID!, $locale: [Locale!]!) {
    cars(where: { id: $internalId }, locales: $locale) {
      carName
      id
      carMainPhoto(locales: en) {
        url
      }
      carPhotos(locales: en) {
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
      carDetails {
        html
        markdown
        text
      }
      insuranceAndTaxInfo
      carsAndQuote {
        datesTitle
        priceTitle
        seasonTitle
        carsInformationButtonText
        quoteButtonText
      }
      carDetailsTitle
      automaticTransmission {
        transmissionPriceTitle
        priceOfCar {
          priceOfCar
        }
      }
      carQuoteForm {
        slug
      }
    }
  }
`

export { Cars }
