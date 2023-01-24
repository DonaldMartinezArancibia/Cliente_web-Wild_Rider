import React from "react"
import { useQuery } from "@apollo/client"
import Show from "./show"

export default function Showdata() {
  const { data, loading, error } = useQuery(Show)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>
  console.log(loading, data, error)

  return (
    <>
      {data.seos.map(item => (
        <div key={item.id}>
          <p>{item.description}</p>
        </div>
      ))}
    </>
  )
}
