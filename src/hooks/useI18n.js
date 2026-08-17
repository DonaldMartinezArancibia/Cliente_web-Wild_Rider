import { useLocalizedQuery } from "./useLocalizedQuery"
import { useLocalizedRoute } from "./useLocalizedRoute"
import { useContentLangKey } from "../context/siteData"

/**
 * Hook unificado para i18n.
 * 
 * @param {object} pageContext Contexto de página de Gatsby
 */
export function useI18n(pageContext) {
  const langKey = pageContext?.langKey
  const { getLocalizedPath } = useLocalizedRoute(langKey)
  const contentLangKey = useContentLangKey()

  const localizedQuery = (query, options = {}) => {
    return useLocalizedQuery(query, pageContext, options)
  }

  return {
    localizedQuery,
    getLocalizedPath,
    contentLangKey,
    langKey
  }
}
