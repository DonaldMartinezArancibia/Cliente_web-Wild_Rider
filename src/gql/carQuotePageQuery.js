import { gql } from "@apollo/client"

const CarQuoteForm = gql`
  query CarQuoteForm($locale: [Locale!]!) {
    carQuoteForms(locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`
const CarQuoteFormContent = gql`
  query CarQuoteForm($locale: [Locale!]!) {
    carQuoteForms(locales: $locale) {
      title
      welcomeText {
        html
        markdown
        text
      }
      basicInformationTitle
      completeNameField
      emailField
      confirmEmailField
      phoneNumberField
      countryResidenceField
      countriesOptions
      numberOfTravelersField
      numberOfTravelersOptions
      pickUpInformationTitle
      takeoverDateField
      subtextOfTakeoverDate
      takeoverHourField
      subtextOfTakeoverHour
      takeoverPlaceField
      takeoverPlaceOptions
      dropOffInformationTitle
      returnDateField
      subtextOfReturnDate
      returnHourField
      subtextOfReturnHour
      returnPlaceField
      returnPlaceOptions
    }
  }
`

export { CarQuoteForm, CarQuoteFormContent }
