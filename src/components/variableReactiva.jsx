// Archivo: apolloClient.js
import { makeVar } from "@apollo/client"

export const datosVar = makeVar(null)

export const setDatos = carId => {
  datosVar(carId)
}
