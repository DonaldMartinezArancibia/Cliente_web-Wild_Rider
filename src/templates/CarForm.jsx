import React from "react"
import CarQuoteQuery from "../components/carQuoteQuery"
import CarQuoteForm from "../components/forms/CarQuoteForm"

const CarForm = ({ pageContext, location }) => {
  // Coche seleccionado en el modal de la página de carros.
  const carId = location.state?.carId
  const selectedTransmission = location.state?.selectedTransmission

  // Con transmisión elegida se cotiza un coche concreto; sin ella se muestra
  // el formulario vacío.
  if (selectedTransmission === undefined) {
    return <CarQuoteForm pageContext={pageContext} />
  }

  return (
    <CarQuoteQuery
      pageContext={{ ...pageContext, selectedTransmission }}
      carId={carId}
    />
  )
}

export default CarForm
