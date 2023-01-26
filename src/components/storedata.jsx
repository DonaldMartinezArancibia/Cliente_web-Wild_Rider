import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import CREATE_SEO from "./create"
import PUBLISH_SEO from "./publishSeo"
import Show from "./show"
import { useApolloClient } from "@apollo/client"

export default function Storedata() {
  const client = useApolloClient()

  const [storeData, setData] = useState({
    title: "",
    description: "",
  })
  const [data] = useMutation(CREATE_SEO)
  const [publishSEO] = useMutation(PUBLISH_SEO, {
    onCompleted: data => {
      client.query({ query: Show })
    },
  })

  const Filechange = e => {
    setData({
      ...storeData,
      [e.target.name]: e.target.value,
    })
  }
  const Filestore = async e => {
    e.preventDefault()
    try {
      const response = await data({
        variables: storeData,
      })
      const seoId = response.data.createSeo.id
      await publishSEO({
        variables: { id: seoId },
      })
      client.refetchQueries({
        include: [Show],
      })
      console.log(`SEO con id ${seoId} ha sido publicado`)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form action="">
      <label htmlFor="title">Título:</label>
      <input type="text" id="title" name="title" required></input>
      <label onChange={Filechange} htmlFor="description">
        Descripción:
      </label>
      <textarea
        onChange={Filechange}
        id="description"
        name="description"
        rows="4"
        cols="50"
        required
      ></textarea>
      <input type="button" onClick={Filestore}></input>
    </form>
  )
}
