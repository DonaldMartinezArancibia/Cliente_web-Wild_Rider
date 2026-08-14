import React from "react"
import ReactHtmlParser from "react-html-parser"
import { AboutUsAndOurTeams } from "../gql/ourTeam"
import { AboutUsContent } from "../gql/aboutusPageQuery"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import ContentToggle from "../components/ui/ContentToggle"
import StickyBar from "../components/ui/StickyBar"

const AboutUs = ({ pageContext }) => {
  const team = useLocalizedQuery(AboutUsAndOurTeams, pageContext)
  const page = useLocalizedQuery(AboutUsContent, pageContext)

  const statusElement = team.statusElement ?? page.statusElement
  if (statusElement) return statusElement

  const aboutUs = team.data?.aboutUsAndOurTeams?.[0] ?? {}
  const ourTeamPage = page.data?.aboutUsAndOurTeams?.[0] ?? {}

  return (
    <main className="py-8 hero-surface">
      <StickyBar pageContext={pageContext} />

      <h1 className="p-4 font-CarterOne lg:text-5xl lg:px-14">
        {ourTeamPage.title}
      </h1>

      {aboutUs.aboutUsMainContent?.raw &&
        ReactHtmlParser(aboutUs.aboutUsMainContent.raw)}

      <div className="sm:grid lg:px-14 lg:grid-cols-3">
        {(aboutUs.theTeam ?? []).map((member, index) => (
          <div key={index} className="flex flex-col items-center mb-8">
            <img
              src={member.photo.url}
              alt={member.photo.altText}
              className="w-40 mt-5 border-[3px] border-black rounded-full"
            />
            <h2 className="my-8 font-bold">{member.name}</h2>
            <p className="mx-4 mb-4 font-semibold md:w-2/3 lg:w-full xl:pl-16">
              {member.description}
            </p>
          </div>
        ))}

        {(ourTeamPage.toggleContent ?? []).map((content, index) => (
          <ContentToggle
            key={index}
            content={content}
            index={index}
            showText={ourTeamPage.showText}
            hideText={ourTeamPage.hideText}
            sectionClassName="p-4 mb-14 col-[1/4]"
          />
        ))}
      </div>
    </main>
  )
}

export default AboutUs
