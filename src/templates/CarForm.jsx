import React from "react"
import CarQuoteQuery from "../components/carQuoteQuery"
import { datosVar } from "../components/variableReactiva"

const CarForm = ({ pageContext, location }) => {
  console.log(pageContext)
  // const datos = location.state ? location.state.datos : null
  const datos = datosVar()
  console.log(datos)
  return (
    <div>
      <CarQuoteQuery pageContext={pageContext} carId={datos} />
    </div>
  )
}

export default CarForm
