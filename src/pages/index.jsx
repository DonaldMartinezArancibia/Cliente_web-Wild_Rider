import React from "react"
import Showdata from "../components/showdata"
import Storedata from "../components/storedata"
import ImageSlider from "../components/imageSlider"

export default function index() {
  // const client = new ApolloClient({
  //   uri: 'https://rickandmortyapi.com/graphql',
  //   cache: new InMemoryCache(),
  // });

  const images = [
    "https://picsum.photos/id/1/800/800",
    "https://picsum.photos/id/2/800/800",
    "https://picsum.photos/id/3/800/800",
  ]

  return (
    <main>
      <div className="mx-auto">
        <ImageSlider images={images} />
      </div>
      <Showdata />
      <Storedata />
    </main>
  )
}
