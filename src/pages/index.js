import React from "react"
import client from "../apollo/client"
import Showdata from "../components/showdata"
import Storedata from "../components/storedata"
import { ApolloProvider } from "@apollo/client"

export default function index() {
  // const client = new ApolloClient({
  //   uri: 'https://rickandmortyapi.com/graphql',
  //   cache: new InMemoryCache(),
  // });

  return (
    <main>
      <Showdata />
      <Storedata />
    </main>
  )
}
