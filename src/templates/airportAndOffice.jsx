import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { AirportAndOfficePageContent } from "../gql/airportAndOfficePage"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import StickyBar from "../components/StickyBar"

const AirportAndOffice = ({ pageContext }) => {
  const {
    data: airportAndOfficePageData,
    loading: airportAndOfficePageLoading,
    error: airportAndOfficePageError,
  } = useQuery(AirportAndOfficePageContent, {
    variables: { locale: [pageContext.langKey] },
  })

  if (airportAndOfficePageLoading) return <p>Loading...</p>
  if (airportAndOfficePageError)
    return <p>Error: {airportAndOfficePageError?.message}</p>

  const airportAndOfficePage =
    airportAndOfficePageData.airportAndOfficePages[0] || []
  console.log(airportAndOfficePage)

  const handleLinkClick = url => {
    window.open(url, "Data", "height=700px,width=600px")
  }

  return (
    <main className="py-8 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%]">
      <StickyBar pageContext={pageContext} />
      <h1 className="p-4 font-CarterOne lg:text-5xl xl:p-14 xl:pb-10">
        {airportAndOfficePage.title}
      </h1>

      {/* {insurancePage && ReactHtmlParser(insurancePage)} */}

      <div className="sm:grid lg:grid-cols-3 xl:px-14">
        {airportAndOfficePage.toggleContent.map((content, contentIndex) => (
          <ContentToggle
            key={contentIndex}
            content={content}
            index={contentIndex}
            airportAndOfficePage={airportAndOfficePage}
            handleLinkClick={handleLinkClick}
          />
        ))}
      </div>
    </main>
  )
}

const ContentToggle = ({
  content,
  index,
  airportAndOfficePage,
  handleLinkClick,
}) => {
  const [isExtendedContentVisible, setIsExtendedContentVisible] =
    useState(false)

  const handleToggleContent = () => {
    setIsExtendedContentVisible(prev => !prev)
  }

  return (
    <section id="toggleContent" className="p-4 mb-14 col-[1/4] lg:p-0">
      <div className="mb-2">
        <ReactMarkdown linkTarget="_blank">
          {content.displayContent?.markdown}
        </ReactMarkdown>
      </div>

      {/* {content.extendedContent && (
        <div
          className={`extended-content-${index} ${
            isExtendedContentVisible ? "" : "hidden"
          }`}
        >
          <ReactMarkdown linkTarget="_blank">
            {content.extendedContent?.markdown}
          </ReactMarkdown>
        </div>
      )}
      {content.extendedContent && (
        <button
          className="text-[#0833a2] hover:underline"
          onClick={handleToggleContent}
        >
          {isExtendedContentVisible
            ? insurancePage.hideText
            : insurancePage.showText}
        </button>
      )} */}
      <div className="grid mb-5 mx-3 min-[500px]:grid-cols-2 md:grid-cols-3 md:justify-items-center md:my-8 lg:col-[1/2] lg:row-[3/4]">
        {airportAndOfficePage.contactElements?.map((element, index) => (
          <div className="flex items-center col-span-1" key={index}>
            <img
              className="h-8 mr-2 lg:h-12"
              src={element?.elementIcon?.url}
              alt={`${element.elementTitle} Icon`}
            />
            <div className="text-base">
              <p className="font-bold">{element.elementTitle}</p>
              <ReactMarkdown>{element.elementText?.markdown}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <p className="mx-3 font-semibold lg:w-10/12 lg:justify-self-center">
        <h1>{airportAndOfficePage.titleOfAddress}</h1>
        {airportAndOfficePage.address}
        <br />
        <br />
        {airportAndOfficePage.localizations[0]?.address}
      </p>
      <iframe
        width="360"
        height="300"
        id="gmap_canvas"
        src={airportAndOfficePage.urlSourceFrame}
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        className="w-11/12 m-auto my-5 lg:col-[1/3] lg:w-[95%] rounded-xl shadow-md min-[2000px]:row-[2/3] min-[2000px]:col-[3/4] min-[2000px]:w-full min-[2000px]:h-full min-[2000px]:-mt-2"
      ></iframe>
      <a
        className="lg:col-[1/3] min-[2000px]:col-[3/4] min-[2000px]:row-[3/4]"
        onClick={() =>
          handleLinkClick(airportAndOfficePage.googleMapsUrlButton)
        }
      >
        <button className="bg-[#0833a2] flex text-white m-auto py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg min-[2000px]:mt-2">
          {airportAndOfficePage.googleMapsButtonText}
          <svg className="h-6 ml-2" viewBox="0 0 448 510">
            <path
              fill="#fff"
              d="M352 192c0-88.4-71.6-160-160-160S32 103.6 32 192c0 20.2 9.1 48.6 26.5 82.7c16.9 33.2 39.9 68.2 63.4 100.5c23.4 32.2 46.9 61 64.5 81.9c1.9 2.3 3.8 4.5 5.6 6.6c1.8-2.1 3.6-4.3 5.6-6.6c17.7-20.8 41.1-49.7 64.5-81.9c23.5-32.3 46.4-67.3 63.4-100.5C342.9 240.6 352 212.2 352 192zm32 0c0 88.8-120.7 237.9-170.7 295.9C200.2 503.1 192 512 192 512s-8.2-8.9-21.3-24.1C120.7 429.9 0 280.8 0 192C0 86 86 0 192 0S384 86 384 192zm-240 0a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm48 80a80 80 0 1 1 0-160 80 80 0 1 1 0 160z"
            />
          </svg>
        </button>
      </a>
    </section>
  )
}

export default AirportAndOffice
