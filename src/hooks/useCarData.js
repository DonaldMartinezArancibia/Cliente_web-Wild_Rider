import { Cars } from "../gql/carsByIdQuery"
import { useLocalizedQuery } from "./useLocalizedQuery"

/**
 * Hook para obtener los datos de un coche específico por su ID interno.
 * 
 * @param {object} pageContext Contexto de la página (langKey)
 * @param {string} carId ID interno del coche
 * @returns {object} { car, statusElement, ...queryResult }
 */
export function useCarData(pageContext, carId) {
  const { data, statusElement, ...rest } = useLocalizedQuery(Cars, pageContext, {
    variables: { internalId: carId },
    skip: !carId,
  })

  const car = data?.cars?.[0] || null

  return { car, statusElement, ...rest }
}
