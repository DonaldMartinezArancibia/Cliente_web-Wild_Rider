import React from "react"
import Showdata from "../components/showdata"
import Storedata from "../components/storedata"
import ImageSlider from "../components/imageSlider"
import Example from "../components/popup"
// import MapContainer from "../components/reviewsData"
import MapContainer from "../components/reviewsHygraph"
import { StaticImage } from "gatsby-plugin-image"
import { useApolloClient, useQuery } from "@apollo/client"
import { IndexContent } from "../gql/indexQuery"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

export default function IndexPage({ pageContext }) {
  const client = useApolloClient()
  const {
    data: IndexContentData,
    loading: IndexContentDataQueryLoading,
    error: IndexContentDataQueryError,
  } = useQuery(IndexContent)
  client.refetchQueries({
    include: [IndexContent],
  })
  if (IndexContentDataQueryLoading) return <p>Loading...</p>
  // console.log(IndexContentData.indices[0])
  // const client = new ApolloClient({
  //   uri: 'https://rickandmortyapi.com/graphql',
  //   cache: new InMemoryCache(),
  // });
  const images = [
    "https://picsum.photos/id/1/800/800",
    "https://picsum.photos/id/2/800/800",
    "https://picsum.photos/id/3/800/800",
  ]
  // const { slug, locale } = pageContext
  // const generateDynamicPagePath = (slug, language) => {
  //   return `/${language}/`
  // }

  // const changeLanguage = (language, slug) => {
  //   const path = generateDynamicPagePath(slug, language)
  //   navigate(path)
  // }
  return (
    <main className="bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%]">
      {/* <div
        dangerouslySetInnerHTML={{
          __html: IndexContentData.indices[0].mainTextBelow.html,
        }}
      /> */}
      {/* <StaticImage
        src="../images/site-header-3000x516-1.jpg"
        alt="Profile"
        className="w-full"
      /> */}
      <section id="sectionBellowHeader">
        <ReactMarkdown>
          {IndexContentData.indices[0].mainTextBelow.markdown}
        </ReactMarkdown>
      </section>
      <button className="bg-[#0833a2] text-white ml-16 py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg">
        View Cars
      </button>
      {/* <StaticImage
        src="../images/site-header-3000x516-1.jpg"
        alt="Profile"
        className="w-full mt-10"
      /> */}
      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 xl:pl-16 mb-4 mt-8">
        — 25 Years of Costa Rica Experience
      </h4>
      <div className="m-auto md:items-center md:w-10/12 md:grid md:grid-cols-2 md:justify-items-center">
        <StaticImage
          src="../images/ab1.jpg"
          alt="Profile"
          className="flex w-3/4 m-auto mb-4 rounded-3xl"
        />

        <p className="mx-4 mb-4">
          We started our business in the 90s when tourism in Costa Rica was in
          its infancy. Mobility became our business field. Back then, asphalt
          roads were more the exception than the rule, the dangerous road
          network has been improved decade by decade. At that time, the Enduro
          motorcycle was the better choice. That's why we started our company as
          a motorcycle rental company.
        </p>
        <StaticImage
          src="../images/HP-two-cols-Cars-1305x623.jpg"
          alt="Profile"
          className="flex m-auto mb-4 w-3/4 rounded-3xl md:col-[2/3] md:row-[2/3]"
        />
        <p className="mx-4 mb-4">
          Since it was a wild time in wild surroundings, we called ourselves
          WILD RIDER Little by little, more and more 4 x 4 vehicles came into
          our fleet. The motorcycles have gone, and the name WILD RIDER has
          stayed. We now offer small to medium-sized all-wheel drive vehicles
          for 1-5 travelers and fast communication with our travel experts.
        </p>
      </div>
      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest pl-4 xl:pl-16 mb-4 mt-8">
        — VIDEOS
      </h4>
      <div className="flex items-center justify-center px-4 video-container">
        <iframe
          title="YouTube video player"
          width="1007"
          height="570"
          src="https://www.youtube.com/embed/4hY11BvySTk"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className=" rounded-3xl"
        ></iframe>
      </div>
      <section className="sm:grid sm:grid-cols-2">
        <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 mb-4 mt-8 sm:col-span-2 xl:pl-16">
          — A family company, trustworthy with its own standards.
        </h4>
        <StaticImage
          src="../images/alarm.png"
          alt="Profile"
          className="flex w-24 h-24 m-auto rounded-3xl"
        />
        <p className="mx-4 my-4 xl:pl-16">
          Many customers believe that the major international car rental
          companies have their own branches in Costa Rica and thus also US /
          Canada standards. Unfortunately, this is not the case. They are
          licensees. They must pay around 15% of fees and commissions to the
          parent company. This is not their own money, but your money. They have
          leasing agreements with banks and car financiers. This money, too,
          must be paid by you, the customer.
        </p>
        <StaticImage
          src="../images/ahorrar-dinero.png"
          alt="Profile"
          className="flex w-24 h-24 m-auto rounded-3xl sm:row-start-2 sm:col-start-2"
        />
        <p className="mx-4 my-4 xl:px-16">
          As a family business, we work with lower overheads and financing costs
          and can therefore offer very attractive rental prices. But why are you
          in the first look more expensive than these big international
          companies? We are never more expensive, but our offer is always honest
          and with no hidden costs. The rate you agree is the rate you will pay,
          not any penny more.
        </p>
      </section>
      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 xl:pl-16 mb-4 mt-8">
        — Free Extras
      </h4>
      <p className="mx-4 mb-4 xl:pl-16">
        In contrast to a lot of other rental car companies who charge you for
        every extra you need.
        <br /> WILD RIDER offers you a half dozen of free extras.
      </p>
      <div class="bg-gray-200 p-4">
        <ul class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <li>
            <div class="bg-white p-4 rounded shadow">
              <img
                src="../images/imagen1.jpg"
                alt="Imagen 1"
                class="w-12 h-12 mb-2"
              />
              <span class="text-xl font-bold">PICK UP & DROP OFF</span>
              <span class="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div class="bg-white p-4 rounded shadow">
              <img
                src="../images/imagen2.jpg"
                alt="Imagen 2"
                class="w-12 h-12 mb-2"
              />
              <span class="text-xl font-bold">Telephone holder</span>
              <span class="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div class="bg-white p-4 rounded shadow">
              <img
                src="../images/imagen3.jpg"
                alt="Imagen 3"
                class="w-12 h-12 mb-2"
              />
              <span class="text-xl font-bold">Cooler</span>
              <span class="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div class="bg-white p-4 rounded shadow">
              <img
                src="../images/imagen4.jpg"
                alt="Imagen 4"
                class="w-12 h-12 mb-2"
              />
              <span class="text-xl font-bold">Camping chairs</span>
              <span class="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div class="bg-white p-4 rounded shadow">
              <img
                src="../images/imagen4.jpg"
                alt="Imagen 4"
                class="w-12 h-12 mb-2"
              />
              <span class="text-xl font-bold">Booster seats for free</span>
              <span class="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div class="bg-white p-4 rounded shadow">
              <img
                src="../images/imagen4.jpg"
                alt="Imagen 4"
                class="w-12 h-12 mb-2"
              />
              <span class="text-xl font-bold">Child seats for free</span>
              <span class="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div class="bg-white p-4 rounded shadow">
              <img
                src="../images/imagen4.jpg"
                alt="Imagen 4"
                class="w-12 h-12 mb-2"
              />
              <span class="text-xl font-bold">Baby seats for free</span>
              <span class="text-gray-500">¡Free!</span>
            </div>
          </li>
        </ul>
      </div>
      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 mb-4 mt-8 xl:pl-16">
        — 3 language support 24/ 7.
      </h4>
      <p className="mx-4 mb-4 xl:pl-16">
        Since we also welcome many European customers in addition to our North
        American & South American customers, we can communicate in English,
        German, or Spanish when making reservations and correspondence as well
        as when renting, solving technical problems, or in the event of an
        accident. In the event of an emergency or urgent question, every
        customer can contact the boss of WILD RIDER on his mobile phone number.
        You will never end up in a telephone queue at Wild Rider. Have you ever
        experienced this at Hertz or Budget?
      </p>
      <section className="sm:grid sm:grid-cols-2 xl:grid-cols-3">
        <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 mb-4 mt-8 sm:col-span-2 xl:pl-16">
          — Reservation and Communication with our travel experts
        </h4>
        <p className="mx-4 mb-4 sm:col-span-2 md:col-span-3 xl:pl-16">
          We have all been living in Costa Rica for more than 25 years and have
          travelled a lot during this time.
        </p>
        <p className="mx-4 mb-4 xl:pl-16">
          <StaticImage
            src="../images/portrait-morten_357x480-1.jpg"
            alt="Profile"
            className="!flex w-32 m-auto mt-5 rounded-3xl"
          />
          Morten is a passionate surfer and knows all beaches, waves, tides, and
          swells they need and the cool places you should check out. Along both
          coasts. As a motorcycle tour guide,
        </p>
        <p className="mx-4 mb-4 xl:pl-16">
          <StaticImage
            src="../images/portrait-thomas.jpg"
            alt="Profile"
            className="!flex w-32 m-auto mt-5 rounded-3xl"
          />
          Thomas has travelled about 500,000 km by motorcycle in Costa Rica. In
          the years 1992-1997 he was mainly traveling on his mountain bike
          through Costa Rica.
        </p>
        <p className="mx-4 mb-4 xl:pl-16">
          <StaticImage
            src="../images/portrait-jose.jpg"
            alt="Profile"
            className="!flex w-32 m-auto mt-5 rounded-3xl"
          />
          Jose who worked less time outdoors, knows a lot of the costaricas best
          restaurants and interesting destinations. We look forward to sharing
          this knowledge and experience with you. Our goal is to organize an
          unforgettable and unique vacation for you.
        </p>
      </section>
      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 xl:pl-16 mb-4 mt-8">
        — Lowest insurance rates in Costa Rica
      </h4>
      <p className="mx-4 mb-4 xl:pl-16">
        Wild Rider offers the lowest Zero-Deductible- Insurance in Costa Rica.
        We can offer you this Peace- In-Mind- Insurance at almost 50% lower than
        our competitors.
      </p>
      {/* <div className="relative">
        <div
          className="absolute inset-0 z-0 h-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("https://picsum.photos/1920/1080")` }}
        />
        <div className="relative z-10 px-4 py-8 bg-gray-100 bg-opacity-5">
          <div className="max-w-2xl mx-auto">
          <p className="mb-4 text-2xl text-center text-gray-800">
              Many customers believe that the major international car rental
              companies have their own branches in Costa Rica and thus also US /
              Canada standards. Unfortunately, this is not the case. They are
              licensees. They must pay around 15% of fees and commissions to the
              parent company. This is not their own money, but your money. They
              have leasing agreements with banks and car financiers. This money,
              too, must be paid by you, the customer.
            </p>
            <p className="mb-4 text-lg text-center text-gray-800">
              As a family business, we work with lower overheads and financing
              costs and can therefore offer very attractive rental prices.
            </p>
            <p className="mb-4 text-xl font-semibold text-center text-gray-800">
              But why are you in the first look more expensive than these big
              international companies?
            </p>
            <p className="mb-4 text-lg text-center text-gray-800">
              We are never more expensive, but our offer is always honest and
              with no hidden costs.
            </p>
            <p className="text-lg text-center text-gray-800">
              The rate you agree is the rate you will pay, not any penny more.
            </p>
          </div>
        </div>
      </div> */}
      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 xl:pl-16 mb-4 mt-8">
        — TESTIMONIALS
      </h4>
      <MapContainer />
      <div className="mx-auto">{/* <ImageSlider images={images} /> */}</div>
      {/* <button onClick={() => changeLanguage("es", slug)}>Español</button> */}
      {/* <Example /> */}
      {/* <Showdata pageContext={pageContext} /> */}
      {/* <Storedata /> */}
    </main>
  )
}
