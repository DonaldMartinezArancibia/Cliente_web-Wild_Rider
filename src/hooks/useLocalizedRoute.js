import { localePath } from "../lib/routes"

/**
 * Hook para obtener rutas localizadas.
 * 
 * @param {string} langKey El código de idioma actual (ej. 'en', 'es')
 */
export function useLocalizedRoute(langKey) {
  const getLocalizedPath = (slug) => {
    return localePath(langKey, slug)
  }
  
  return { getLocalizedPath }
}
