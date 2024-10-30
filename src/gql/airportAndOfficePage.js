import { gql } from "@apollo/client"

const AirportAndOfficePage = gql`
  query AirportAndOfficePage($internalId: ID!, $locale: [Locale!]!) {
    airportAndOfficePage(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
      }
    }
  }
`
const AirportAndOfficePageContent = gql`
  query AirportAndOfficePages($locale: [Locale!]!) {
    airportAndOfficePages(locales: $locale) {
      title
      toggleContent(last: 2000) {
        displayContent {
          markdown
        }
        extendedContent {
          markdown
          raw
        }
      }
      titleOfAddress
      address
      localizations(locales: es) {
        address
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
export { AirportAndOfficePage, AirportAndOfficePageContent }
