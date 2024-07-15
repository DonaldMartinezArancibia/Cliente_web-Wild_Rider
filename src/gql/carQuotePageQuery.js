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
const CarQuoteFormSlugs = gql`
  query CarQuoteForms($locale: [Locale!]!) {
    carQuoteForms(locales: $locale) {
      slug
      buttonTextOfQuickQuote
      localizations {
        slug
        locale
      }
    }
  }
`
const CombinedQuery = gql`
  query CombinedQuery($locale: [Locale!]!) {
    carQuoteForms(locales: $locale) {
      slug
      buttonTextOfQuickQuote
      localizations {
        slug
        locale
      }
    }
    menu(
      where: { id: "clh9c9u0e9psb0ciqxndxi86r" }
      locales: $locale
      stage: PUBLISHED
    ) {
      menuElements {
        ... on Index {
          slug
          title
        }
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
      cars(last: 500) {
        id
        manualTransmission {
          carTransmissionSelectorValue
        }
        automaticTransmission {
          carTransmissionSelectorValue
        }
      }
      vehicleSelectionField
      vehicleSelectionFieldDefaultOption
      vehicleSelectionFieldErrorMessage
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

export { CarQuoteForm, CarQuoteFormSlugs, CarQuoteFormContent, CombinedQuery }
