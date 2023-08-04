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
      <section id="sectionBellowHeader">
        <ReactMarkdown>
          {IndexContentData.indices[0].mainTextBelow.markdown}
        </ReactMarkdown>
      </section>
      <button className="bg-[#0833a2] text-white ml-16 py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg">
        View Cars
      </button>
      {/* <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 xl:pl-16 mb-4 mt-8">
        — 25 Years of Costa Rica Experience
      </h4> */}
      {/* <div className="m-auto md:items-center md:w-10/12 md:grid md:grid-cols-2 md:justify-items-center">
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
      </div> */}
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
      {/* <section className="sm:grid sm:grid-cols-2">
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
      </section> */}
      {/* <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 xl:pl-16 mb-4 mt-8">
        — Free Extras
      </h4> */}
      {/* <p className="mx-4 mb-4 xl:pl-16">
        In contrast to a lot of other rental car companies who charge you for
        every extra you need.
        <br /> WILD RIDER offers you a half dozen of free extras.
      </p> */}
      {/* <div className="mx-4 xl:px-16">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <li>
            <div className="bg-[#d9eaf9] p-4 rounded shadow">
              <img
                src="../images/imagen1.jpg"
                alt="Imagen 1"
                className="w-12 h-12 mb-2"
              />
              <span className="text-xl font-bold">PICK UP & DROP OFF</span>
              <span className="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div className="bg-[#d9eaf9] p-4 rounded shadow">
              <img
                src="../images/imagen2.jpg"
                alt="Imagen 2"
                className="w-12 h-12 mb-2"
              />
              <span className="text-xl font-bold">Telephone holder</span>
              <span className="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div className="bg-[#d9eaf9] p-4 rounded shadow">
              <img
                src="../images/imagen3.jpg"
                alt="Imagen 3"
                className="w-12 h-12 mb-2"
              />
              <span className="text-xl font-bold">Cooler</span>
              <span className="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div className="bg-[#d9eaf9] p-4 rounded shadow">
              <img
                src="../images/imagen4.jpg"
                alt="Imagen 4"
                className="w-12 h-12 mb-2"
              />
              <span className="text-xl font-bold">Camping chairs</span>
              <span className="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div className="bg-[#d9eaf9] p-4 rounded shadow">
              <img
                src="../images/imagen4.jpg"
                alt="Imagen 4"
                className="w-12 h-12 mb-2"
              />
              <span className="text-xl font-bold">Booster seats for free</span>
              <span className="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div className="bg-[#d9eaf9] p-4 rounded shadow">
              <img
                src="../images/imagen4.jpg"
                alt="Imagen 4"
                className="w-12 h-12 mb-2"
              />
              <span className="text-xl font-bold">Child seats for free</span>
              <span className="text-gray-500">¡Free!</span>
            </div>
          </li>
          <li>
            <div className="bg-[#d9eaf9] p-4 rounded shadow">
              <img
                src="../images/imagen4.jpg"
                alt="Imagen 4"
                className="w-12 h-12 mb-2"
              />
              <span className="text-xl font-bold">Baby seats for free</span>
              <span className="text-gray-500">¡Free!</span>
            </div>
          </li>
        </ul>
      </div> */}
      {/* <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 mb-4 mt-8 xl:pl-16">
        — 3 language support 24/ 7.
      </h4> */}
      {/* <p className="mx-4 mb-4 xl:pl-16">
        Since we also welcome many European customers in addition to our North
        American & South American customers, we can communicate in English,
        German, or Spanish when making reservations and correspondence as well
        as when renting, solving technical problems, or in the event of an
        accident. In the event of an emergency or urgent question, every
        customer can contact the boss of WILD RIDER on his mobile phone number.
        You will never end up in a telephone queue at Wild Rider. Have you ever
        experienced this at Hertz or Budget?
      </p> */}
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
      {/* <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 xl:pl-16 mb-4 mt-8">
        — Lowest insurance rates in Costa Rica
      </h4> */}
      {/* <p className="mx-4 mb-4 xl:pl-16">
        Wild Rider offers the lowest Zero-Deductible- Insurance in Costa Rica.
        We can offer you this Peace- In-Mind- Insurance at almost 50% lower than
        our competitors.
      </p> */}
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
      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest px-4 xl:pl-16 mb-8 mt-16">
        — OFFERS
      </h4>
      <h1 className="mx-4 xl:px-16 max-w-3xl mb-8 text-4xl font-CarterOne">
        Free Benefits
      </h1>
      <section className="grid grid-cols-[repeat(5,_minmax(0,_100px))] gap-y-3 gap-x-5 mx-4 my-14 justify-items-center text-center font-bold xl:px-16">
        <svg className="h-12" viewBox="0 0 680 510" transform="rotate(-90)">
          <path d="M562.1 219.3c7.6 9.5 13.9 22 13.9 36.7c0 29.1-23 49.4-41.4 60.4C514.9 328.2 490.2 336 470 336H370.5L276.8 499.9 269.9 512H256l-80 0H144.2l8.7-30.6L194.5 336 164 336l-40.8 54.4L116 400H104 32-1.3L9.2 368.4 46.7 256 9.2 143.6-1.3 112H32h72l12 0 7.2 9.6L164 176l30.5 0L152.9 30.6 144.2 0 176 0l80 0 13.9 0 6.9 12.1L370.5 176l99.5 0c20.3 0 45.1 8.1 64.6 20c10 6.1 19.9 13.8 27.5 23.3zM509.8 237c-14-8.5-30.2-13-39.7-13l-113.5 0H342.6l-6.9-12.1L242.1 48H207.8l41.5 145.4 8.7 30.6-31.8 0L152 224H140l-7.2-9.6L92 160H65.3l29.5 88.4 2.5 7.6-2.5 7.6L65.3 352H92l40.8-54.4L140 288h12l74.3 0h31.8l-8.7 30.6L207.8 464h34.3l93.7-163.9 6.9-12.1h13.9H470c9.7 0 26-4.4 39.8-12.8C525 266.1 528 258.4 528 256c0-.6-.2-2.8-3.3-6.7c-3.1-3.9-8.1-8.2-14.9-12.3z" />
        </svg>
        <svg className="h-12" viewBox="0 0 680 510">
          <path d="M432 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM365.8 266.6l29.9-89.8c7.7 1.2 15 3.6 21.7 7.1c-.1 .3-.2 .7-.3 1L384.7 288.6l-16.3-13.3c-2.6-2.1-3.6-5.6-2.5-8.7zm59 54.6l28.5-91.3 10.5 36.7c1.9 6.5 5.4 12.5 10.2 17.3L503 313c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-27.6-27.6-10.9-38.1C484.1 162.8 437.9 128 385.3 128h-4.9c-16.1 0-32.1 2.6-47.4 7.7c-39.9 13.3-72.4 42.8-89.5 81.3l-9.5 21.3c-5.4 12.1 .1 26.3 12.2 31.7s26.3-.1 31.7-12.2l9.5-21.3c10.9-24.4 30.9-43.5 55.6-53.3l-22.8 68.3c-7.4 22.1-.3 46.5 17.8 61.2l104.4 84.8 22.1 96c3 12.9 15.9 21 28.8 18s21-15.9 18-28.8L488.6 384c-2-8.7-6.8-16.4-13.8-22.1l-50.1-40.7zm-101.1 21l-24.1 60.4L231 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l69.7-69.7c3.8-3.8 6.8-8.4 8.9-13.4l19.2-48-39-31.7zm-75.7-52c-7.6-4.4-17.4-1.8-21.9 5.8L203 335.9 147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c.6-1 1.1-1.9 1.5-2.9L253.8 312c4.4-7.6 1.8-17.4-5.8-21.9z" />
        </svg>
        <svg className="h-12" viewBox="0 0 512 512">
          <path d="M112 96H62.2c0-36 38.4-96 128-96c58.4 0 95 25.5 113.5 53.2C323.6 40.6 350.2 32 384 32c89.6 0 128 60 128 96H448L416 96l-32 32H319.4c3.5 15.4 7.2 35.7 9.5 59.7c4.4 45.4 3.7 104.4-13.9 167.1c52.6 11.3 93.3 55 100 109.1c.7 5.2 1 10.6 1 16v32H368 80 32V480c0-5.4 .3-10.8 1-16c7.9-63.1 61.7-112 127-112h24.9c26-56.3 38-110.2 43.3-151.1c1.3-9.9 2.2-19 2.8-27.1l-83.1 83.1c-25.5-25.5-40.7-95 22.6-158.4c1.3-1.3 2.7-2.7 4.1-3.9L144 64 112 96zM237.3 352h28.5c18.5-59.2 19.5-115.9 15.3-159.7c-.6-6.1-1.3-12-2-17.5c-.7 9.6-1.7 20.5-3.3 32.4c-5.2 39.6-16 90.6-38.5 144.9zM288 400H160c-38.7 0-71 27.5-78.4 64H366.4c-7.4-36.5-39.7-64-78.4-64z" />
        </svg>
        <svg className="h-12" viewBox="0 0 640 512">
          <path d="M560 0a80 80 0 1 1 0 160A80 80 0 1 1 560 0zM48 454.8V464H464v-9.2L256 149.3 48 454.8zM227 106.6L256 64l29 42.6L412.5 293.9l38.7-58.4L480 192l28.8 43.5L640 433.7V464v48H592 512 464h-7H48 0V464 440L227 106.6zM512 440v24h80V448.2L480 279l-38.3 57.8L512 440z" />
        </svg>
        <svg className="h-12" viewBox="0 0 384 512">
          <path d="M48 464V48H224V160H336V464H48zM256 0H48 0V48 464v48H48 336h48V464 128L256 0zM160 224v64H96v64h64v64h64V352h64V288H224V224H160z" />
        </svg>
        <p className="col-span-1">Free airport pick up</p>
        <p className="col-span-1">Travel Planner</p>
        <p className="col-span-1">Beaches Information</p>
        <p className="col-span-1">Mountains Information</p>
        <p className="col-span-1">Free Insurance</p>
      </section>
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
