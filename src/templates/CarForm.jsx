import React from "react"
import CarQuoteQuery from "../components/carQuoteQuery"
import { datosVar } from "../components/variableReactiva"
import CarFormHtml from "../components/carQuoteForm"

const CarForm = ({ pageContext, location, headerAndFooterData }) => {
  // Obtén el objeto datos desde la variable reactiva
  const datos = datosVar()

  // Obtén el valor de selectedTransmission desde location.state
  const selectedTransmission = location.state?.datos?.selectedTransmission

  // Crea un nuevo objeto pageContext y agrega el valor de selectedTransmission
  const newPageContext = {
    ...pageContext,
    selectedTransmission: selectedTransmission,
    headerAndFooterData: headerAndFooterData,
  }

  // console.log(pageContext)

  return (
    <div>
      {newPageContext.selectedTransmission !== undefined ? (
        <CarQuoteQuery pageContext={newPageContext} carId={datos} />
      ) : (
        <CarFormHtml pageContext={pageContext} />
      )}
    </div>
  )
}

export default CarForm
