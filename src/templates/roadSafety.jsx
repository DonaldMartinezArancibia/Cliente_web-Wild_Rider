import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { RoadSafetyContent } from "../gql/roadSafetyPageQuery"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import StickyBar from "../components/StickyBar"

const RoadSafety = ({ pageContext }) => {
  const {
    data: roadSafetyPageData,
    loading: roadSafetyPageLoading,
    error: roadSafetyPageError,
  } = useQuery(RoadSafetyContent, {
    variables: { locale: [pageContext.langKey] },
  })

  if (roadSafetyPageLoading) return <p>Loading...</p>
  if (roadSafetyPageError) return <p>Error: {roadSafetyPageError?.message}</p>

  const roadSafetyPage = roadSafetyPageData.roadSafeties[0] || []

  return (
    <main className="py-8 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%]">
      <StickyBar pageContext={pageContext} />
      <h1 className="p-4 font-CarterOne lg:text-5xl xl:p-14 xl:pb-10">
        {roadSafetyPage.title}
      </h1>

      {/* {roadSafetyPage && ReactHtmlParser(roadSafetyPage)} */}

      <div className="sm:grid lg:grid-cols-3 xl:px-14">
        {roadSafetyPage.toggleContent.map((content, contentIndex) => (
          <ContentToggle
            key={contentIndex}
            content={content}
            index={contentIndex}
            roadSafetyPage={roadSafetyPage}
          />
        ))}
      </div>
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
