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
      insuranceAndTaxInfo
      carsAndQuote {
        datesTitle
        priceTitleManual
        priceTitleAutomatic
        seasonTitle
        carsInformationButtonText
        quoteButtonText
      }
      carDetailsTitle
      automaticTransmission {
        carTransmissionSelectorValue
        priceOfCar {
          priceOfCar
          season {
            seasonTitle
            startDate
            endDate
          }
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
        carTransmissionSelectorValue
      }
      carQuoteForm {
        slug
      }
    }
  }
`

export { Cars }
