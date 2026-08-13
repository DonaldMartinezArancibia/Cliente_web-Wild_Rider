import React from "react"
import { addMinutes, format, parse } from "date-fns"

/** Opciones de hora en intervalos de 15 minutos entre dos horas "HH:mm". */
export function generateTimeOptions(minTime, maxTime, stepMinutes = 15) {
  const options = []
  let current = parse(minTime, "HH:mm", new Date(2000, 0, 1))
  const end = parse(maxTime, "HH:mm", new Date(2000, 0, 1))

  while (current <= end) {
    const value = format(current, "HH:mm")
    options.push(
      <option key={value} value={value}>
        {value}
      </option>
    )
    current = addMinutes(current, stepMinutes)
  }

  return options
}

/** Duración del alquiler en texto, tal y como la espera Zapier. */
export function formatRentalDuration(startDate, startTime, endDate, endTime) {
  const start = new Date(`${startDate} ${startTime}`)
  const end = new Date(`${endDate} ${endTime}`)
  const difference = end - start

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

  return `${days} Days, ${hours} hours and ${minutes} minutes`
}

/** Convierte un mapa {selector: valor} en el HTML que se envía a Zapier. */
export function formatSelections(selections) {
  return Object.entries(selections)
    .map(([title, value]) => `${title}:<br><strong>${value}</strong>`)
    .join("<br><br>")
}

/** Muestra el mensaje del CMS cuando un campo obligatorio queda vacío. */
export function setValidationMessage(event, message) {
  event.target.setCustomValidity(
    event.target.value.trim() ? "" : message || "This field is required"
  )
}
