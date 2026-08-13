import React from "react"
import { useQuery } from "@apollo/client/react"
import { Loading, ErrorState } from "../components/ui/QueryState"

/**
 * Ejecuta una query de Hygraph en el idioma de la página.
 *
 * Encapsula el patrón que estaba repetido en los 13 templates:
 * `useQuery(Q, { variables: { locale: [pageContext.langKey] } })` seguido de
 * dos guardas de loading/error.
 *
 * Devuelve además `statusElement`: si no es null, el template debe devolverlo
 * tal cual antes de tocar `data`.
 *
 *   const { data, statusElement } = useLocalizedQuery(Q, pageContext)
 *   if (statusElement) return statusElement
 *
 * @param {import("graphql").DocumentNode} query
 * @param {object} pageContext  contexto de página de Gatsby (aporta langKey)
 * @param {object} [options]    opciones extra de Apollo (variables, skip, …)
 */
export function useLocalizedQuery(query, pageContext, options = {}) {
  const { variables, ...rest } = options

  const { data, loading, error, ...result } = useQuery(query, {
    ...rest,
    variables: { locale: [pageContext?.langKey], ...variables },
  })

  let statusElement = null
  if (loading) statusElement = <Loading />
  else if (error) statusElement = <ErrorState error={error} />

  return { data, loading, error, statusElement, ...result }
}
