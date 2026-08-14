import React from "react"
import { AirportAndOfficePageContent } from "../gql/airportAndOfficePage"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import ContentToggle from "../components/ui/ContentToggle"
import ContactElements from "../components/ui/ContactElements"
import AddressBlock from "../components/ui/AddressBlock"
import GoogleMapBlock from "../components/ui/GoogleMapBlock"
import TemplateBase from "../components/TemplateBase"

const AirportAndOffice = ({ pageContext }) => {
  const { data, statusElement } = useLocalizedQuery(
    AirportAndOfficePageContent,
    pageContext
  )
  if (statusElement) return statusElement

  const page = data?.airportAndOfficePages?.[0] ?? {}

  const seo = page?.searchEngineOptimization

  return (
    <TemplateBase pageContext={pageContext} seoData={seo}>
      <main className="py-8 hero-surface">
        <h1 className="p-4 font-CarterOne lg:mb-10 lg:text-5xl lg:px-14 xl:pb-10">
          {page.title}
        </h1>

      <div className="sm:grid lg:grid-cols-3 lg:px-14">
        {(page.toggleContent ?? []).map((content, index) => (
          <ContentToggle
            key={index}
            content={content}
            index={index}
            collapsible={false}
          />
        ))}
      </div>

      <ContactElements
        elements={page.contactElements}
        className="lg:col-[1/2] lg:row-[3/4]"
      />

      <AddressBlock
        title={page.titleOfAddress}
        address={page.address}
        localizedAddress={page.localizations?.[0]?.address}
      />

      <GoogleMapBlock
        frameUrl={page.urlSourceFrame}
        mapsUrl={page.googleMapsUrlButton}
        buttonText={page.googleMapsButtonText}
        title={page.titleOfAddress}
      />
    </main>
  </TemplateBase>
  )
}

export default AirportAndOffice
