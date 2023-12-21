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
      carDetails {
        html
        markdown
        text
      }
      pricesOfCar {
        priceOfCar
        season {
          seasonTitle
          startDate
          endDate
        }
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
        carTransmissionSelectorValue
        priceOfCar {
          priceOfCar
        }
      }
      manualTransmission {
        priceOfCar {
          priceOfCar
          season {
            seasonTitle
            startDate
            endDate
          }
        }
        transmissionPriceTitle
        carTransmissionSelectorValue
      }
      carQuoteForm {
        slug
      }
    }
  }
`

export { Cars }
