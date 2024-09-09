import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { ImprintContent } from "../gql/imprintPageQuery"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import StickyBar from "../components/StickyBar"

const RoadSafety = ({ pageContext }) => {
  const {
    data: roadSafetyPageData,
    loading: roadSafetyPageLoading,
    error: roadSafetyPageError,
  } = useQuery(ImprintContent, {
    variables: { locale: [pageContext.langKey] },
  })

  if (roadSafetyPageLoading) return <p>Loading...</p>
  if (roadSafetyPageError) return <p>Error: {roadSafetyPageError?.message}</p>

  const roadSafetyPage = roadSafetyPageData.imprints[0] || []

  return (
    <main className="py-8 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%]">
      <StickyBar pageContext={pageContext} />

      <div className="px-1 pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
            <div
              id="contentBelowVideo"
              className="!max-w-full !text-base px-2 md:px-4 md:mx-4 md:mb-8 prose lg:prose-lg xl:prose-xl xl:px-6"
            >
              <ReactMarkdown>
                {roadSafetyPage.imprintContent?.markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      {/* {roadSafetyPage && ReactHtmlParser(roadSafetyPage)} */}

      {/* <div className="sm:grid lg:grid-cols-3 xl:px-14">
        {roadSafetyPage.toggleContent.map((content, contentIndex) => (
          <ContentToggle
            key={contentIndex}
            content={content}
            index={contentIndex}
            roadSafetyPage={roadSafetyPage}
          />
        ))}
      </div> */}
    </main>
  )
}

const ContentToggle = ({ content, index, roadSafetyPage }) => {
  const [isExtendedContentVisible, setIsExtendedContentVisible] =
    useState(false)

  const handleToggleContent = () => {
    setIsExtendedContentVisible(prev => !prev)
  }

  return (
    <section id="toggleContent" className="p-4 mb-14 col-[1/4] lg:p-0">
      <div className="mb-2">
        <ReactMarkdown>{content.displayContent?.markdown}</ReactMarkdown>
      </div>

      {content.extendedContent && (
        <div
          className={`extended-content-${index} ${
            isExtendedContentVisible ? "" : "hidden"
          }`}
        >
          <ReactMarkdown>{content.extendedContent?.markdown}</ReactMarkdown>
        </div>
      )}
      {content.extendedContent && (
        <button
          className="text-[#0833a2] hover:underline"
          onClick={handleToggleContent}
        >
          {isExtendedContentVisible
            ? roadSafetyPage.hideText
            : roadSafetyPage.showText}
        </button>
      )}
    </section>
  )
}

export default RoadSafety
