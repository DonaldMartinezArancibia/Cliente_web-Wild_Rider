import React from "react"
import { useCarData } from "../hooks/useCarData"
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

  const { car, statusElement } = useCarData(
    { ...pageContext, selectedTransmission },
    carId
  )

  if (statusElement) return statusElement

  return <CarQuoteForm apolloData={{ cars: [car] }} pageContext={pageContext} />
}

export default CarForm
