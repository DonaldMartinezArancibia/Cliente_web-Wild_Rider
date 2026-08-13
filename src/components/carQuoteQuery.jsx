import React from "react"
import { Cars } from "../gql/carsByIdQuery"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import CarFormHtml from "./carQuoteForm"

/**
 * Carga el coche seleccionado y se lo pasa al formulario de cotización.
 *
 * La versión anterior nombraba `pageContext` al objeto de props completo, de
 * donde venía el `pageContext.pageContext` repartido por carQuoteForm.
 */
const CarQuoteQuery = ({ pageContext, carId }) => {
  const { data, statusElement } = useLocalizedQuery(Cars, pageContext, {
    variables: { internalId: carId },
  })
  if (statusElement) return statusElement

  return <CarFormHtml apolloData={data} pageContext={pageContext} />
}

export default CarQuoteQuery
