import React, { useEffect } from "react"
import { useLocation } from "@reach/router"
import { useState } from "react"

export default function CarForm() {
  // Usa useLocation para obtener la ubicación actual (URL)
  const location = useLocation()

  // Define estados para almacenar datos que recibes de la URL
  const [carId, setCarId] = useState("")
  const [carName, setCarName] = useState("")
  const [pageContext, setPageContext] = useState({})

  // Utiliza useEffect para manejar los datos cuando el componente se monta
  useEffect(() => {
    // Parsea la búsqueda de la URL usando URLSearchParams
    const searchParams = new URLSearchParams(location.search)

    // Obtén los valores de los parámetros de la URL y actualiza los estados
    const carIdParam = searchParams.get("carId")
    const carNameParam = searchParams.get("carName")
    const pageContextParam = searchParams.get("pageContext")

    setCarId(carIdParam || "")
    setCarName(carNameParam || "")

    // Si pageContextParam es una cadena JSON, conviértela en un objeto JavaScript
    try {
      const parsedPageContext = JSON.parse(pageContextParam)
      if (parsedPageContext && typeof parsedPageContext === "object") {
        setPageContext(parsedPageContext)
      }
    } catch (error) {
      console.error("Error parsing pageContext:", error)
    }
  }, [location.search])
  return (
    <div>
      <h1>Car Form</h1>
      <p>Car ID: {carId}</p>
      <p>Car Name: {carName}</p>
      <pre>Page Context: {JSON.stringify(pageContext, null, 2)}</pre>

      {/* Resto del formulario */}
    </div>
  )
}
