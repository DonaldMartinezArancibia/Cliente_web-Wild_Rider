import React from "react"
import { useQuery } from "@apollo/client"
import { Cars } from "../gql/carsByIdQuery"
import CarFormHtml from "./carQuoteForm"

const ContactFormQuery = pageContext => {
  const { carName, remoteId } = pageContext.pageContext
  //   console.log(remoteId)
  const {
    data: carsById,
    loading: carsByIdQueryLoading,
    error: carsByIdQueryError,
  } = useQuery(Cars, {
    variables: { internalId: remoteId, locale: ["en"] },
  })
  if (carsByIdQueryLoading) return <p>Loading...</p>
  if (carsByIdQueryError) return <p>Error : {carsByIdQueryError.message}</p>

  return <div>{carsById && <CarFormHtml apolloData={carsById} />}</div>
}
export default CarQuoteQuery
