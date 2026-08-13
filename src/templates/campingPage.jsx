import React from "react"
import { CampingPageContent } from "../gql/campingPage"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import ContentToggle from "../components/ui/ContentToggle"
import VideoPlayer from "../components/videoPlayer"
import StickyBar from "../components/StickyBar"

/** Empareja cada vídeo con su portada por posición. */
const buildVideoList = campingPage =>
  (campingPage?.videos ?? []).map((video, index) => ({
    sources: [{ src: video.url, type: video.mimeType }],
    cover: campingPage?.coverOfVideo?.[index],
  }))

const Camping = ({ pageContext }) => {
  const { data, statusElement } = useLocalizedQuery(
    CampingPageContent,
    pageContext
  )
  if (statusElement) return statusElement

  const campingPage = data?.campingPages?.[0] ?? {}
  const videos = buildVideoList(campingPage)

  return (
    <main className="py-8 hero-surface">
      <StickyBar pageContext={pageContext} />

      <h1 className="p-4 lg:mb-10 font-CarterOne lg:text-5xl lg:px-14">
        {campingPage.title}
      </h1>

      <div className="sm:grid lg:grid-cols-3 lg:px-14">
        {(campingPage.toggleContent ?? []).map((content, index) => (
          <ContentToggle
            key={index}
            content={content}
            index={index}
            collapsible={false}
          />
        ))}
      </div>

      <div className="items-center justify-center px-4 m-auto mb-8 md:w-5/6 video-container">
        <VideoPlayer videos={videos} />
      </div>
    </main>
  )
}

export default Camping
