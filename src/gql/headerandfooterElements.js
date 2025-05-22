import { gql } from "@apollo/client"

const headerAndFooterElements = gql`
  query headerAndFooterElements($locale: [Locale!]!) {
    headerAndFooterElements(locales: $locale) {
      logoTextTitle
      logoTextSubtitle
      imageOverLogo(locales: en) {
        url
      }
      imageOverLogoAlt
      iframeHqRentalsUrl
      displaySkypeTextAndNumber
      textOverSkypeNumber
      skypeNumber
      contactElements {
        elementTitle
        elementIcon(locales: en) {
          url
        }
        elementValue
      }
      englishLangSelectorTitle
      displayEnglishLangSelectorTitle
      frenchLangSelectorTitle
      displayFrenchLangSelectorTitle
      germanLangSelectorTitle
      displayGermanLangSelectorTitle
      spanishLangSelectorTitle
      displaySpanishLangSelectorTitle
      otherLangSelectorTitle
      displayOtherLangSelectorTitle
      frenchLangTooltipText
      germanLangTooltipText
      englishLangTooltipText
      otherLangTooltipText
      spanishLangTooltipText
      aboutUs
      contact
      explore
      socialNetworks {
        socialNetworkTitle
        socialNetworkLogo(locales: en) {
          url
        }
        urlToSocialNetwork
      }
      footerCopyright
      langKey
      imprintTitle
      imprintDetailText {
        html
        markdown
        text
      }
      termsAndConditionsTitle
      iFrameLinkOfTermsAndConditions
      privacyPolicyTitle
      iFrameLinkOfPrivacyPolicy
      cookiePolicyTitle
      iFrameLinkOfCookiePolicy
    }
  }
`

export { headerAndFooterElements }
