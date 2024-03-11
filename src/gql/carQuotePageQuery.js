import { gql } from "@apollo/client"

const CarQuoteForm = gql`
  query CarQuoteForm($internalId: ID!, $locale: [Locale!]!) {
    carQuoteForm(where: { id: $internalId }, locales: $locale) {
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
      completeNameFieldErrorMessage
      emailField
      emailFieldErrorMessage
      confirmEmailField
      confirmEmailFieldErrorMessage
      emailAndEmailConfirmNotEqualErrorMessage
      phoneNumberField
      countryResidenceField
      countriesOptions
      numberOfTravelersField
      numberOfTravelersOptions
      cars {
        id
        manualTransmission {
          carTransmissionSelectorValue
        }
        automaticTransmission {
          carTransmissionSelectorValue
        }
      }
      vehicleSelectionField
      otherHour
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
      freeAdditionalServicesTitle
      freeServicesSubtitle
      freeServicesCheckboxOptions
      freeServicesSelectors {
        serviceSelectorTitle
        serviceValues
      }
      paidAdditionalServicesTitle
      paidServicesSubtitle
      paidServicesCheckboxOptions
      localizations(locales: en) {
        paidServicesCheckboxOptions
      }
      paidServicesSelectors {
        serviceSelectorTitle
        serviceValues
      }
      communicationFieldTitle
      communicationFieldSubtitle
      buttonText
      reCaptchaErrorMessage
      formOnSubmitMessage
    }
  }
`

export { CarQuoteForm, CarQuoteFormContent }
