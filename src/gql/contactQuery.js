import { gql } from "@apollo/client"

const ContactAndLocation = gql`
  query ContactAndLocation($internalId: ID!, $locale: [Locale!]!) {
    contactAndLocations(where: { id: $internalId }, locales: $locale) {
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
      address
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
      contactElements {
        elementTitle
        elementIcon(locales: en) {
          url
        }
        elementValue
      }
    }
  }
`

export { ContactAndLocation, ContactContent }
