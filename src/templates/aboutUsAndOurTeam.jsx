import React from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import { AboutUsAndOurTeams } from "../gql/ourTeam"

export default function AboutUs({ pageContext }) {
  const client = useApolloClient()
  const {
    data: ourTeamsData,
    loading: ourTeamsLoading,
    error: ourTeamsError,
  } = useQuery(AboutUsAndOurTeams, {
    variables: { locale: [pageContext.langKey] },
  })

  if (ourTeamsLoading) return <p>Loading...</p>
  if (ourTeamsError) return <p>Error: {ourTeamsError.message}</p>

  // Accede a los datos de los equipos
  const theTeams = ourTeamsData.aboutUsAndOurTeams[0]?.theTeam || []

  return (
    <main className="p-3 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%] lg:p-14">
      <h1 className="font-CarterOne lg:text-5xl mb-10">About us & Our team</h1>
      <div className="sm:grid lg:grid-cols-3">
        {theTeams.map((team, index) => (
          <div key={index} className="flex flex-col items-center mb-16">
            <img
              src={team.photo.url}
              alt={team.name}
              className="flex w-40 m-auto mt-5 border-solid border-[3px] border-black rounded-[50%]"
            />
            <h2 className="font-bold my-8">{team.name}</h2>
            <p className="font-semibold mx-4 mb-4 md:w-2/3 lg:w-full xl:pl-16">
              {team.description}
            </p>
          </div>
        ))}
        {/* <section className="sm:grid sm:grid-cols-2 xl:grid-cols-3">
        <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 mb-4 mt-8 sm:col-span-2 xl:pl-16">
          — Reservation and Communication with our travel experts
        </h4>
        <p className="mx-4 mb-4 sm:col-span-2 md:col-span-3 xl:pl-16">
          We have all been living in Costa Rica for more than 25 years and have
          travelled a lot during this time.
        </p>
        <p className="mx-4 mb-4 xl:pl-16">
          Morten is a passionate surfer and knows all beaches, waves, tides, and
          swells they need and the cool places you should check out. Along both
          coasts. As a motorcycle tour guide,
        </p>
        <StaticImage
          src="../images/portrait-morten_357x480-1.jpg"
          alt="Profile"
          className="!flex w-32 m-auto mt-5 rounded-3xl"
        />
        <p className="mx-4 mb-4 xl:pl-16">
          Thomas has travelled about 500,000 km by motorcycle in Costa Rica. In
          the years 1992-1997 he was mainly traveling on his mountain bike
          through Costa Rica.
        </p>
        <StaticImage
          src="../images/portrait-thomas.jpg"
          alt="Profile"
          className="!flex w-32 m-auto mt-5 rounded-3xl"
        />
        <p className="mx-4 mb-4 xl:pl-16">
          Jose who worked less time outdoors, knows a lot of the costaricas best
          restaurants and interesting destinations. We look forward to sharing
          this knowledge and experience with you. Our goal is to organize an
          unforgettable and unique vacation for you.
        </p>
        <StaticImage
          src="../images/portrait-jose.jpg"
          alt="Profile"
          className="!flex w-32 m-auto mt-5 rounded-3xl"
        />
      </section> */}
      </div>
    </main>
  )
}
