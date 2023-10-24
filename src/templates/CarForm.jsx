import React from "react"
import CarQuoteQuery from "../components/carQuoteQuery"

const CarForm = ({ pageContext }) => {
  return (
    <div>
      <CarQuoteQuery pageContext={pageContext} />
    </div>
  )
}

export default CarForm
