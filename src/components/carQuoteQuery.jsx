import React from "react"
import { useQuery, useApolloClient } from "@apollo/client/react"
import { Cars } from "../gql/carsByIdQuery"
import CarFormHtml from "./carQuoteForm"

const CarQuoteQuery = pageContext => {
  const client = useApolloClient()

  const {
    data: carsById,
    loading: carsByIdQueryLoading,
    error: carsByIdQueryError,
  } = useQuery(Cars, {
    variables: {
      internalId: pageContext.carId,
      locale: [pageContext.pageContext.langKey],
    },
  })
  if (carsByIdQueryLoading) return <p>Loading...</p>
  if (carsByIdQueryError) return <p>Error : {carsByIdQueryError.message}</p>

  return (
    <div>{<CarFormHtml apolloData={carsById} pageContext={pageContext} />}</div>
  )
}
export default CarQuoteQuery
