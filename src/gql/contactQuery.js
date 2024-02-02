import { gql } from "@apollo/client"

const ContactAndLocation = gql`
  query ContactAndLocation($internalId: ID!, $locale: [Locale!]!) {
    contactAndLocation(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
        title
      }
    }
  }
`
const ContactContent = gql`
  query ContactAndLocation($locale: [Locale!]!) {
    contactAndLocations(locales: $locale) {
      title
      titleOfAddress
      address
      localizations(locales: es) {
        address
      }
      topImage(locales: en) {
        url
      }
      bottomImage(locales: en) {
        url
      }
      contactForm {
        nameField
        messageField
        emailField
        confirmEmailField
        phoneNumberField
        sendButton
        surnameField
      }
      formOnSubmitMessage {
        html
        markdown
        text
      }
      contactElements {
        elementTitle
        elementIcon(locales: en) {
          url
        }
        elementValue
        elementText {
          html
          markdown
          text
        }
      }
      urlSourceFrame
      googleMapsUrlButton
      googleMapsButtonText
    }
  }
`

export { ContactAndLocation, ContactContent }
