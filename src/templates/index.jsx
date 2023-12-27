import React from "react"
import { Link } from "gatsby"
import Showdata from "../components/showdata"
import Storedata from "../components/storedata"
import ImageSlider from "../components/imageSlider"
import Example from "../components/popup"
// import MapContainer from "../components/reviewsData"
import { MapContainerLayoutB } from "../components/reviewsHygraph"
import { StaticImage } from "gatsby-plugin-image"
import { useApolloClient, useQuery } from "@apollo/client"
import { IndexContent } from "../gql/indexQuery"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import VideoPlayer from "../components/videoPlayer"

export default function IndexPage({ pageContext }) {
  const client = useApolloClient()
  const {
    data: IndexContentData,
    loading: IndexContentDataQueryLoading,
    error: IndexContentDataQueryError,
  } = useQuery(IndexContent, {
    variables: {
      // internalId: pageContext.remoteId,
      locale: [pageContext.langKey],
    },
  })
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
  //

  function obtenerIdYouTube(url) {
    const expresionesRegulares = [
      /youtube\.com\/watch\?v=(\w{11})(&t=\w+)?/,
      /[?&]v=([^&]+)/,
      /youtu\.be\/(\w{11})\?(&t=\w+)?/,
      /youtube\.com\/live\/(\w{11})/,
    ]

    for (const regex of expresionesRegulares) {
      const match = url.match(regex)

      if (match) {
        return match[1]
      }
    }

    return null // Si no se encontró ninguna coincidencia
  }

  // const changeLanguage = (language, slug) => {
  //   const path = generateDynamicPagePath(slug, language)
  //   navigate(path)
  // }
  // Obtén los videos del objeto presentationVideos
  const presentationVideos = IndexContentData.indices[0].presentationVideos

  // Mapea el objeto presentationVideos a la estructura esperada por VideoPlayer
  // const videos = presentationVideos.map(video => ({
  //   sources: [{ src: video.url, type: video.mimeType }],
  // }))
  // Verifica si los datos de los videos están disponibles y no hay errores en la consulta
  const videos =
    IndexContentData.indices[0]?.presentationVideos?.map(video => ({
      sources: [
        {
          src: video.url,
          type: video.mimeType,
        },
      ],
    })) || []
  return (
    <main className="bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%]">
      <section id="sectionBellowHeader">
        <ReactMarkdown>
          {IndexContentData.indices[0].mainTextBelow.markdown}
        </ReactMarkdown>
      </section>
      <Link to={IndexContentData.indices[0].viewCarsbuttonurl?.slug}>
        <button className="bg-[#0833a2] text-white block m-auto py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg md:ml-16">
          {IndexContentData.indices[0].viewCarsButtonText}
        </button>
      </Link>
      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest uppercase pl-4 xl:pl-16 mb-8 mt-8">
        — {IndexContentData.indices[0].videosSectionTitle}
      </h4>
      <div className="items-center justify-center px-4 m-auto md:w-5/6 video-container">
        <VideoPlayer videos={videos} />
      </div>

      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest uppercase px-4 xl:pl-16 mb-8 mt-16">
        — {IndexContentData.indices[0].offersSectionTitle}
      </h4>
      <h1 className="max-w-3xl mx-4 mb-8 text-4xl xl:px-16 font-CarterOne">
        Free Benefits
      </h1>
      <section className="grid font-bold justify-items-center sm:grid-cols-2 lg:grid-cols-3 gap-y-3 md:gap-y-7 lg:gap-y-10 md:mx-4 md:my-12 md:justify-items-center md:text-center xl:px-16">
        {IndexContentData.indices[0].freeBenefitsElements.map(
          (benefit, index) => (
            <div
              key={index}
              className="flex flex-row-reverse items-center justify-end"
            >
              <img
                src={benefit.benefitImage.url}
                alt={`Benefit ${index}`}
                className="h-12"
              />
              <p className="col-span-1 mr-9">{benefit.benefitTitle}</p>
            </div>
          )
        )}
      </section>
      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest uppercase px-4 xl:pl-16 mb-8 mt-16">
        — {IndexContentData.indices[0].testimonialsSectionTitle}
      </h4>
      <section id="sectionBellowTestimonialsTitle">
        <ReactMarkdown>
          {IndexContentData.indices[0].testimonialSectionText.markdown}
        </ReactMarkdown>
      </section>
      <MapContainerLayoutB pageContext={pageContext} />
      {/* <div className="mx-auto">{<ImageSlider images={images} />}</div> */}
      {/* <button onClick={() => changeLanguage("es", slug)}>Español</button> */}
      {/* <Example /> */}
      {/* <Showdata pageContext={pageContext} /> */}
      {/* <Storedata /> */}
    </main>
  )
}
