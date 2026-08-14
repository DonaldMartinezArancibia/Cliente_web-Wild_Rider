import React from "react"
import { ContactContent } from "../gql/contactQuery"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import ContactForm from "../components/forms/ContactForm"
import ContentToggle from "../components/ui/ContentToggle"
import ContactElements from "../components/ui/ContactElements"
import AddressBlock from "../components/ui/AddressBlock"
import GoogleMapBlock from "../components/ui/GoogleMapBlock"
import StickyBar from "../components/ui/StickyBar"
import { useContentLangKey } from "../context/siteData"

const ContactAndLocationPage = ({ pageContext }) => {
  const contentLangKey = useContentLangKey()
  const { data, statusElement } = useLocalizedQuery(ContactContent, pageContext)
  if (statusElement) return statusElement

  const pageData = data?.contactAndLocations?.[0] ?? {}
  const showLocationBlocks = Boolean(pageData.showContentBellowFormAndTwoImages)

  return (
    <main className="py-8 hero-surface">
      <StickyBar pageContext={pageContext} />

      <section className="p-4 pt-3 lg:p-16 lg:grid lg:grid-cols-[1fr_1fr] min-[2000px]:grid-cols-[35%_35%_30%]">
        <h1 className="font-CarterOne lg:pb-4 lg:text-5xl lg:col-[1/3]">
          {pageData.title}
        </h1>

        <div className="sm:grid lg:col-[1/3] lg:row-[2/3] xl:px-14">
          {(pageData.toggleContent ?? []).map((content, index) => (
            <ContentToggle
              key={index}
              content={content}
              index={index}
              showText={pageData.showText}
              hideText={pageData.hideText}
            />
          ))}
        </div>

        {pageData.contactForm && (
          <ContactForm
            content={pageData.contactForm}
            successMarkdown={pageData.formOnSubmitMessage?.markdown}
            recaptchaLang={contentLangKey}
          />
        )}

        {showLocationBlocks && (
          <ContactElements
            elements={pageData.contactElements}
            className="lg:col-[1/2] lg:row-[3/4]"
          />
        )}

        <div className="w-11/12 m-auto mb-4 md:w-1/2 lg:row-[3/4] lg:col-[2/3] lg:w-10/12 xl:m-auto min-[2000px]:row-[2/3]">
          <img
            src={pageData.topImage?.url}
            alt="Profile"
            className="mb-10 min-[2000px]:mx-auto"
          />
          <img
            src={pageData.bottomImage?.url}
            alt="Profile"
            className="min-[2000px]:m-auto"
          />
        </div>

        {showLocationBlocks && (
          <AddressBlock
            title={pageData.titleOfAddress}
            address={pageData.address}
            localizedAddress={pageData.localizations?.[0]?.address}
          />
        )}
      </section>

      {showLocationBlocks && (
        <GoogleMapBlock
          frameUrl={pageData.urlSourceFrame}
          mapsUrl={pageData.googleMapsUrlButton}
          buttonText={pageData.googleMapsButtonText}
          title={pageData.titleOfAddress}
        />
      )}
    </main>
  )
}

export default ContactAndLocationPage
