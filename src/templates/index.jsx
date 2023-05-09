import React from "react"
import Showdata from "../components/showdata"
import Storedata from "../components/storedata"
import ImageSlider from "../components/imageSlider"
import Example from "../components/popup"
// import MapContainer from "../components/reviewsData"
import MapContainer from "../components/reviewsHygraph"
import { useApolloClient, useQuery } from "@apollo/client"
import { IndexContent } from "../gql/IndexQuery"
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
  console.log(IndexContentData.indices[0])
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
    <main className=" bg-hero-pattern bg-no-repeat bg-[right_-30rem_top_-20rem] bg-[length:85%]">
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
      <button class="bg-[#0833a2] text-white ml-16 mb-12 py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg">
        View Cars
      </button>
      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest pl-16">
        — VIDEOS
      </h4>
      <div className="flex items-center justify-center my-8 video-container">
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
      <h4 className="text-[#0833a2] font-black font-Inter tracking-widest pl-16">
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
