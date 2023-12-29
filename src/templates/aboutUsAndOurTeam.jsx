import React, { useState } from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import { AboutUsAndOurTeams } from "../gql/ourTeam"
import ReactHtmlParser from "react-html-parser"
import { AboutUsContent } from "../gql/aboutusPageQuery"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

const AboutUs = ({ pageContext }) => {
  const client = useApolloClient()

  const {
    data: ourTeamsData,
    loading: ourTeamsLoading,
    error: ourTeamsError,
  } = useQuery(AboutUsAndOurTeams, {
    variables: { locale: [pageContext.langKey] },
  })

  const {
    data: ourTeamsPageData,
    loading: ourTeamsPageLoading,
    error: ourTeamsPageError,
  } = useQuery(AboutUsContent, {
    variables: { locale: [pageContext.langKey] },
  })

  if (ourTeamsLoading || ourTeamsPageLoading) return <p>Loading...</p>
  if (ourTeamsError || ourTeamsPageError)
    return <p>Error: {ourTeamsError?.message || ourTeamsPageError?.message}</p>

  const aboutUsMainContent =
    ourTeamsData.aboutUsAndOurTeams[0]?.aboutUsMainContent?.raw

  const theTeams = ourTeamsData.aboutUsAndOurTeams[0]?.theTeam || []
  const ourTeamPage = ourTeamsPageData.aboutUsAndOurTeams[0] || []

  return (
    <main className="p-3 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%] lg:p-14">
      <h1 className="mb-10 font-CarterOne lg:text-5xl">About us & Our team</h1>

      {aboutUsMainContent && ReactHtmlParser(aboutUsMainContent)}

      <div className="sm:grid lg:grid-cols-3">
        {theTeams.map((team, index) => (
          <div key={index} className="flex flex-col items-center mb-8">
            <img
              src={team.photo.url}
              alt={team.name}
              className="w-40 mt-5 border-[3px] border-black rounded-full"
            />
            <h2 className="my-8 font-bold">{team.name}</h2>
            <p className="mx-4 mb-4 font-semibold md:w-2/3 lg:w-full xl:pl-16">
              {team.description}
            </p>
          </div>
        ))}

        {ourTeamPage.toggleContent.map((content, contentIndex) => (
          <ContentToggle
            key={contentIndex}
            content={content}
            index={contentIndex}
          />
        ))}
      </div>
    </main>
  )
}

const processRawContent = rawContent => {
  if (!rawContent || !rawContent.children) {
    return null
  }

  return rawContent.children.map((child, index) => {
    if (child.type === "paragraph") {
      return <p key={index}>{child.children[0].text}</p>
    } else if (child.type === "class") {
      return (
        <div className={child.className} key={index}>
          {/* Handle class content */}
        </div>
      )
    } else if (child.type === "image") {
      return (
        <img
          key={index}
          src={child.src}
          alt={child.title}
          width={child.width}
          height={child.height}
        />
      )
    }

    return null
  })
}

const ContentToggle = ({ content, index }) => {
  const [isExtendedContentVisible, setIsExtendedContentVisible] =
    useState(false)

  const handleToggleContent = () => {
    setIsExtendedContentVisible(prev => !prev)
  }

  const renderedContent = processRawContent(content.extendedContent?.raw)

  return (
    <section id="toggleContent" className="mb-4 col-[1/4]">
      <div className="mb-2">
        <ReactMarkdown>{content.displayContent?.markdown}</ReactMarkdown>
      </div>

      {content.extendedContent && (
        <div
          className={`extended-content-${index} ${
            isExtendedContentVisible ? "" : "hidden"
          }`}
        >
          {/* <ReactMarkdown>{content.extendedContent.markdown}</ReactMarkdown> */}
          {renderedContent}
        </div>
      )}
      {content.extendedContent && (
        <button
          className="text-[#0833a2] hover:underline"
          onClick={handleToggleContent}
        >
          {isExtendedContentVisible ? "Show Less" : "Show More"}
        </button>
      )}
    </section>
  )
}

export default AboutUs
