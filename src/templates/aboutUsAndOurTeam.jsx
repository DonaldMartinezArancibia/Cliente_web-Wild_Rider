import React, { useState } from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import { AboutUsAndOurTeams } from "../gql/ourTeam"
import ReactHtmlParser from "react-html-parser"
import { AboutUsContent } from "../gql/aboutusPageQuery"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import StickyBar from "../components/StickyBar"

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
    <main className="py-8 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%]">
      <StickyBar pageContext={pageContext} />
      <h1 className="p-4 lg:mb-10 font-CarterOne lg:text-5xl lg:p-14">
        {ourTeamPage.title}
      </h1>

      {aboutUsMainContent && ReactHtmlParser(aboutUsMainContent)}

      <div className="sm:grid lg:px-14 lg:grid-cols-3">
        {theTeams.map((team, index) => (
          <div key={index} className="flex flex-col items-center mb-8">
            <img
              src={team.photo.url}
              alt={team.photo.altText}
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
            ourTeamPage={ourTeamPage}
          />
        ))}
      </div>
    </main>
  )
}

const ContentToggle = ({ content, index, ourTeamPage }) => {
  const [isExtendedContentVisible, setIsExtendedContentVisible] =
    useState(false)

  const handleToggleContent = () => {
    setIsExtendedContentVisible(prev => !prev)
  }

  return (
    <section id="toggleContent" className="p-4 mb-14 col-[1/4]">
      <div className="mb-2">
        <ReactMarkdown
          components={{
            img: ({ src, alt }) => (
              <img src={src} alt={alt} style={{ maxWidth: "100%" }} />
            ),
          }}
        >
          {content.displayContent?.markdown}
        </ReactMarkdown>
      </div>

      {content.extendedContent && (
        <div
          className={`extended-content-${index} ${
            isExtendedContentVisible ? "" : "hidden"
          }`}
        >
          <ReactMarkdown
            components={{
              img: ({ src, alt }) => (
                <img src={src} alt={alt} style={{ maxWidth: "100%" }} />
              ),
            }}
          >
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
            ? ourTeamPage.hideText
            : ourTeamPage.showText}
        </button>
      )}
    </section>
  )
}

export default AboutUs
