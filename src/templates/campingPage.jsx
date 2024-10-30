import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { CampingPageContent } from "../gql/campingPage"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import VideoPlayer from "../components/videoPlayer"
import StickyBar from "../components/StickyBar"

const Camping = ({ pageContext }) => {
  const {
    data: campingPageData,
    loading: campingPageLoading,
    error: campingPageError,
  } = useQuery(CampingPageContent, {
    variables: { locale: [pageContext.langKey] },
  })

  if (campingPageLoading) return <p>Loading...</p>
  if (campingPageError) return <p>Error: {campingPageError?.message}</p>

  const campingPage = campingPageData.campingPages[0] || []

  const videos =
    campingPage?.videos?.map(video => ({
      sources: [
        {
          src: video.url,
          type: video.mimeType,
        },
      ],
    })) || []

  const coverOfVideo = campingPage?.coverOfVideo || []

  const videosWithCovers = videos.map((video, index) => ({
    ...video,
    cover: coverOfVideo[index], // Añadir el elemento correspondiente de coverOfVideo al objeto video
  }))

  console.log(videosWithCovers)

  return (
    <main className="py-8 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%]">
      <StickyBar pageContext={pageContext} />
      <h1 className="p-4 font-CarterOne lg:text-5xl xl:p-14 xl:pb-10">
        {campingPage.title}
      </h1>

      {/* {roadSafetyPage && ReactHtmlParser(roadSafetyPage)} */}

      <div className="sm:grid lg:grid-cols-3 xl:px-14">
        {campingPage.toggleContent.map((content, contentIndex) => (
          <ContentToggle
            key={contentIndex}
            content={content}
            index={contentIndex}
            campingPage={campingPage}
          />
        ))}
      </div>
      <div className="items-center justify-center px-4 m-auto mb-8 md:w-5/6 video-container">
        <VideoPlayer videos={videosWithCovers} />
      </div>
    </main>
  )
}

const ContentToggle = ({ content, index, campingPage }) => {
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

      {/* {content.extendedContent && (
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
      )} */}
    </section>
  )
}

export default Camping
