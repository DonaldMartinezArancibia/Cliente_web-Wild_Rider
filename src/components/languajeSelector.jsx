import React from "react"
import { navigate } from "gatsby"
import { useApolloClient, useQuery } from "@apollo/client"
import { Post } from "../gql/allPost"
import { Index } from "../gql/indexQuery"
import { CarsAndQuote } from "../gql/carsPageQuery"
import { AboutUsAndOurTeam } from "../gql/aboutusPageQuery"
import { RentalInfo } from "../gql/rentalInfoPageQuery"
import { Testimonial } from "../gql/testimonialPageQuery"
import { Faq } from "../gql/faqPageQuery"
import { ContactAndLocation } from "../gql/contactQuery"
import { TravelPlanner } from "../gql/travelPlannerPageQuery"
import { Car } from "../gql/carsQuery"
import { CarQuoteForm } from "../gql/carQuotePageQuery"
import { PrivacyPolicyPage } from "../gql/privacyPage"
import { TermsOfServicePage } from "../gql/termsPage"
// import { headerAndFooterElements } from "../gql/headerandfooterElements"

export default function LanguageSelector({ pageContext, langSelectorTitle }) {
  // const client = useApolloClient()
  // console.log(pageContext.remoteTypeName)

  const query = [
    Index,
    Post,
    CarsAndQuote,
    AboutUsAndOurTeam,
    RentalInfo,
    Testimonial,
    Faq,
    ContactAndLocation,
    TravelPlanner,
    Car,
    CarQuoteForm,
    PrivacyPolicyPage,
    TermsOfServicePage,
  ].find(
    query => query.definitions[0].name.value === pageContext.remoteTypeName
  )
  // console.log(query)

  // const {
  //   data: headerAndFooterElementsData,
  //   loading: headerAndFooterElementsQueryLoading,
  //   error: headerAndFooterElementsQueryError,
  // } = useQuery(headerAndFooterElements, {
  //   variables: { locale: [pageContext.langKey] },
  // })
  // client.refetchQueries({
  //   include: [headerAndFooterElements],
  // })

  const { data, loading, error } = useQuery(query, {
    variables: {
      internalId: pageContext.remoteId,
      locale: [pageContext.langKey],
    },
  })
  // if (headerAndFooterElementsQueryLoading) return <p>Loading...</p>
  // if (headerAndFooterElementsQueryError)
  //   return console.log(headerAndFooterElementsQueryError)
  if (loading) return <p>Loading...</p>
  if (error) return console.log(error)

  // const langSelectorTitle =
  //   headerAndFooterElementsData.headerAndFooterElements[0]
  function getSlugByLocale(data, lang) {
    let indexData

    if (data.index) {
      indexData = data.index.localizations.find(item => item.locale === lang)
    }
    let aboutUsAndOurTeamData
    if (data.aboutUsAndOurTeam) {
      aboutUsAndOurTeamData = data.aboutUsAndOurTeam.localizations.find(
        item => item.locale === lang
      )
    }
    let contactData
    if (data.contactAndLocation) {
      contactData = data.contactAndLocation.localizations.find(
        item => item.locale === lang
      )
    }
    let carsAndQuotesData
    if (data.carsAndQuote) {
      carsAndQuotesData = data.carsAndQuote.localizations.find(
        item => item.locale === lang
      )
    }
    let carQuotePageData
    if (data.carQuoteForm) {
      carQuotePageData = data.carQuoteForm.localizations.find(
        item => item.locale === lang
      )
    }

    let testimonialData
    if (data.testimonial) {
      testimonialData = data.testimonial.localizations.find(
        item => item.locale === lang
      )
    }

    let faqData
    if (data.faq) {
      faqData = data.faq.localizations.find(item => item.locale === lang)
    }

    let policyData
    if (data.privacyPolicyPages) {
      policyData = data.privacyPolicyPages.localizations.find(
        item => item.locale === lang
      )
    }

    const travelPlannerData = data.travelPlanner
      ? data.travelPlanner.localizations[0]
      : undefined
    const postData = data.posts ? data.posts[0].localizations[0] : undefined

    if (indexData?.locale === "en") return ""
    if (indexData?.locale) return indexData.locale
    if (postData?.locale === "en") return `blog/${postData.slug}`
    if (carsAndQuotesData?.locale === "en") return carsAndQuotesData.slug
    if (carsAndQuotesData?.locale)
      return `${carsAndQuotesData.locale}/${carsAndQuotesData.slug}`
    if (aboutUsAndOurTeamData?.locale === "en")
      return aboutUsAndOurTeamData.slug
    if (aboutUsAndOurTeamData?.locale)
      return `${aboutUsAndOurTeamData.locale}/${aboutUsAndOurTeamData.slug}`
    if (carQuotePageData?.locale === "en") return carQuotePageData.slug
    if (carQuotePageData?.locale)
      return `${carQuotePageData.locale}/${carQuotePageData.slug}`
    if (testimonialData?.locale === "en") return testimonialData.slug
    if (testimonialData?.locale)
      return `${testimonialData.locale}/${testimonialData.slug}`
    if (faqData?.locale === "en") return faqData.slug
    if (faqData?.locale) return `${faqData.locale}/${faqData.slug}`
    if (contactData?.locale === "en") return contactData.slug
    if (contactData?.locale) return `${contactData.locale}/${contactData.slug}`
    if (policyData?.locale === "en") return policyData.slug
    if (policyData?.locale) return `${policyData.locale}/${policyData.slug}`
    if (travelPlannerData?.locale === "en") return travelPlannerData.slug
    if (travelPlannerData?.locale)
      return `${travelPlannerData.locale}/${travelPlannerData.slug}`
    return `${postData?.locale}/blog/${postData?.slug}`
  }

  return (
    <>
      {/* <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={() => {
          navigate(`/${getSlugByLocale(data)}`)
        }}
      >
        {langSelectorTitle}
      </button> */}
      <div className="relative inline-block">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="m-auto"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.1014 2.69581C8.65831 3.47055 6.50105 4.95481 4.90428 6.9596C3.3075 8.96438 2.34346 11.399 2.13488 13.9535H8.38605C8.43209 12.4242 8.57442 10.9172 8.81163 9.48837C9.10046 7.7386 9.53023 6.12558 10.0814 4.74419C10.3604 4.03269 10.7017 3.34724 11.1014 2.69581ZM15 0C13.0302 -2.93527e-08 11.0796 0.387986 9.25975 1.14181C7.43986 1.89563 5.78628 3.00052 4.3934 4.3934C3.00052 5.78628 1.89563 7.43986 1.14181 9.25975C0.387986 11.0796 0 13.0302 0 15C0 16.9698 0.387986 18.9204 1.14181 20.7403C1.89563 22.5601 3.00052 24.2137 4.3934 25.6066C5.78628 26.9995 7.43986 28.1044 9.25975 28.8582C11.0796 29.612 13.0302 30 15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 5.92805e-08 15 0ZM15 2.09302C14.6358 2.09302 14.1642 2.26884 13.6172 2.83535C13.0647 3.40744 12.5135 4.30186 12.0251 5.52139C11.5409 6.73395 11.146 8.19628 10.8753 9.83163C10.6591 11.1433 10.5265 12.5344 10.4819 13.9535H19.5181C19.478 12.5724 19.3466 11.1954 19.1247 9.83163C18.854 8.19628 18.4591 6.73395 17.9749 5.52139C17.4865 4.30186 16.9353 3.40744 16.3842 2.83535C15.8358 2.26884 15.3656 2.09302 15 2.09302ZM21.614 13.9535C21.5722 12.4573 21.43 10.9655 21.1884 9.48837C20.8995 7.7386 20.4698 6.12558 19.9186 4.74419C19.6392 4.03262 19.2974 3.34716 18.8972 2.69581C20.8702 3.31975 22.664 4.40953 24.127 5.87302C26.2915 8.0381 27.6159 10.9021 27.8637 13.9535H21.614ZM19.5181 16.0465H10.4819C10.5251 17.4656 10.6591 18.8567 10.8753 20.1684C11.146 21.8037 11.5409 23.266 12.0251 24.4772C12.5135 25.6981 13.0647 26.5926 13.6158 27.1647C14.1642 27.7312 14.6344 27.907 15 27.907C15.3642 27.907 15.8358 27.7312 16.3828 27.1647C16.9353 26.5926 17.4865 25.6981 17.9749 24.4786C18.4591 23.266 18.854 21.8037 19.1247 20.1684C19.3409 18.8567 19.4735 17.4656 19.5181 16.0465ZM18.8986 27.3042C19.2753 26.6986 19.6172 26.0079 19.9172 25.2558C20.4698 23.8744 20.8995 22.2614 21.1884 20.5116C21.4296 19.0344 21.5713 17.5427 21.6126 16.0465H27.8637C27.6559 18.6012 26.6921 21.0362 25.0952 23.0411C23.4983 25.046 21.3421 26.5301 18.8986 27.3042ZM11.1014 27.3042C10.7022 26.6527 10.3614 25.9673 10.0828 25.2558C9.53023 23.8744 9.10046 22.2614 8.81163 20.5116C8.57045 19.0344 8.42873 17.5427 8.38744 16.0465H2.13488C2.34263 18.601 3.3062 21.0359 4.90281 23.0408C6.49943 25.0457 8.65679 26.5299 11.1 27.3042H11.1014Z"
            fill="white"
          />
        </svg>
        {/* <button className="inline-flex items-center px-4 py-2 font-semibold">
          <span className="m-2 text-white">
            {pageContext.langKey !== "en" ? "Español" : "English"}
          </span>
        </button> */}
        <ul className="font-black text-center text-white transition-shadow duration-300 border-opacity-100 shadow-md left-1/4 hover:shadow-lg">
          {pageContext.langKey !== "en" &&
            langSelectorTitle?.displayEnglishLangSelectorTitle !== false && (
              <li className="">
                <a
                  className="block px-4 py-1 text-white whitespace-no-wrap cursor-pointer hover:bg-gray-400 text"
                  onClick={e => {
                    e.preventDefault()
                    navigate(`/${getSlugByLocale(data, "en")}`)
                  }}
                  title={langSelectorTitle?.englishLangTooltipText}
                >
                  {langSelectorTitle?.englishLangSelectorTitle}
                </a>
              </li>
            )}
          {pageContext.langKey !== "de" &&
            langSelectorTitle?.displayGermanLangSelectorTitle !== false && (
              <li className="">
                <a
                  className="block px-4 py-1 text-white whitespace-no-wrap cursor-pointer hover:bg-gray-400 text"
                  onClick={e => {
                    e.preventDefault()
                    navigate(`/${getSlugByLocale(data, "de")}`)
                  }}
                  title={langSelectorTitle?.germanLangTooltipText}
                >
                  {langSelectorTitle?.germanLangSelectorTitle}
                </a>
              </li>
            )}
          {pageContext.langKey !== "fr" &&
            langSelectorTitle?.displayFrenchLangSelectorTitle !== false && (
              <li className="">
                <a
                  className="block px-4 py-1 text-white whitespace-no-wrap cursor-pointer hover:bg-gray-400 text"
                  onClick={e => {
                    e.preventDefault()
                    navigate(`/${getSlugByLocale(data, "fr")}`)
                  }}
                  title={langSelectorTitle?.frenchLangTooltipText}
                >
                  {langSelectorTitle?.frenchLangSelectorTitle}
                </a>
              </li>
            )}

          {pageContext.langKey !== "es" &&
            langSelectorTitle?.displaySpanishLangSelectorTitle !== false && (
              <li className="">
                <a
                  className="block px-4 py-1 text-white whitespace-no-wrap cursor-pointer hover:bg-gray-400 text"
                  onClick={e => {
                    e.preventDefault()
                    navigate(`/${getSlugByLocale(data, "es")}`)
                  }}
                  title={langSelectorTitle?.spanishLangTooltipText}
                >
                  {langSelectorTitle?.spanishLangSelectorTitle}
                </a>
              </li>
            )}
          {pageContext.langKey !== "other" &&
            langSelectorTitle?.displayOtherLangSelectorTitle !== false && (
              <li className="">
                <a
                  className="block px-4 py-1 text-white whitespace-no-wrap cursor-pointer hover:bg-gray-400 text"
                  onClick={e => {
                    e.preventDefault()
                    navigate(`/${getSlugByLocale(data, "other")}`)
                  }}
                  title={langSelectorTitle?.otherLangTooltipText}
                >
                  {langSelectorTitle?.otherLangSelectorTitle}
                </a>
              </li>
            )}
        </ul>
      </div>
    </>
  )
}
{
  /* DISEÑO DE DROPDOWN PARA EL SELECTOR*/
  /* <div className="relative inline-block dropdown">
  <button className="inline-flex items-center px-4 py-2 font-semibold">
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1014 2.69581C8.65831 3.47055 6.50105 4.95481 4.90428 6.9596C3.3075 8.96438 2.34346 11.399 2.13488 13.9535H8.38605C8.43209 12.4242 8.57442 10.9172 8.81163 9.48837C9.10046 7.7386 9.53023 6.12558 10.0814 4.74419C10.3604 4.03269 10.7017 3.34724 11.1014 2.69581ZM15 0C13.0302 -2.93527e-08 11.0796 0.387986 9.25975 1.14181C7.43986 1.89563 5.78628 3.00052 4.3934 4.3934C3.00052 5.78628 1.89563 7.43986 1.14181 9.25975C0.387986 11.0796 0 13.0302 0 15C0 16.9698 0.387986 18.9204 1.14181 20.7403C1.89563 22.5601 3.00052 24.2137 4.3934 25.6066C5.78628 26.9995 7.43986 28.1044 9.25975 28.8582C11.0796 29.612 13.0302 30 15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 5.92805e-08 15 0ZM15 2.09302C14.6358 2.09302 14.1642 2.26884 13.6172 2.83535C13.0647 3.40744 12.5135 4.30186 12.0251 5.52139C11.5409 6.73395 11.146 8.19628 10.8753 9.83163C10.6591 11.1433 10.5265 12.5344 10.4819 13.9535H19.5181C19.478 12.5724 19.3466 11.1954 19.1247 9.83163C18.854 8.19628 18.4591 6.73395 17.9749 5.52139C17.4865 4.30186 16.9353 3.40744 16.3842 2.83535C15.8358 2.26884 15.3656 2.09302 15 2.09302ZM21.614 13.9535C21.5722 12.4573 21.43 10.9655 21.1884 9.48837C20.8995 7.7386 20.4698 6.12558 19.9186 4.74419C19.6392 4.03262 19.2974 3.34716 18.8972 2.69581C20.8702 3.31975 22.664 4.40953 24.127 5.87302C26.2915 8.0381 27.6159 10.9021 27.8637 13.9535H21.614ZM19.5181 16.0465H10.4819C10.5251 17.4656 10.6591 18.8567 10.8753 20.1684C11.146 21.8037 11.5409 23.266 12.0251 24.4772C12.5135 25.6981 13.0647 26.5926 13.6158 27.1647C14.1642 27.7312 14.6344 27.907 15 27.907C15.3642 27.907 15.8358 27.7312 16.3828 27.1647C16.9353 26.5926 17.4865 25.6981 17.9749 24.4786C18.4591 23.266 18.854 21.8037 19.1247 20.1684C19.3409 18.8567 19.4735 17.4656 19.5181 16.0465ZM18.8986 27.3042C19.2753 26.6986 19.6172 26.0079 19.9172 25.2558C20.4698 23.8744 20.8995 22.2614 21.1884 20.5116C21.4296 19.0344 21.5713 17.5427 21.6126 16.0465H27.8637C27.6559 18.6012 26.6921 21.0362 25.0952 23.0411C23.4983 25.046 21.3421 26.5301 18.8986 27.3042ZM11.1014 27.3042C10.7022 26.6527 10.3614 25.9673 10.0828 25.2558C9.53023 23.8744 9.10046 22.2614 8.81163 20.5116C8.57045 19.0344 8.42873 17.5427 8.38744 16.0465H2.13488C2.34263 18.601 3.3062 21.0359 4.90281 23.0408C6.49943 25.0457 8.65679 26.5299 11.1 27.3042H11.1014Z"
        fill="white"
      />
    </svg>
    <span className="m-2 text-white">
      {pageContext.langKey !== "en" ? "Español" : "English"}
    </span>
    <svg width="13" viewBox="0 0 531.74 460.5">
      <polygon
        stroke="#FFF"
        fill="#FFF"
        points="500.87 26.734 265.87 433.766 30.87 26.734"
        style={{
          strokeMiterlimit: 1,
          strokeLinejoin: "round",
          strokeWidth: "50px",
        }}
      />
    </svg>
  </button>
  <ul className="absolute hidden text-center text-white transition-shadow duration-300 border-gray-300 border-opacity-100 shadow-md dropdown-menu left-1/4 hover:shadow-lg">
    <li className="">
      <a
        className="block px-4 py-2 whitespace-no-wrap text-[#0833a2] bg-white rounded hover:bg-gray-400 text"
        onClick={e => {
          e.preventDefault()
          navigate(`/${getSlugByLocale(data)}`)
        }}
        href="/"
      >
        {langSelectorTitle}
      </a>
    </li>
  </ul>
</div> */
}
