import React from "react"
import CarQuoteQuery from "../components/carQuoteQuery"
import { datosVar } from "../components/variableReactiva"

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

  return (
    <div>
      <CarQuoteQuery pageContext={newPageContext} carId={datos} />
    </div>
  )
}

export default CarForm
