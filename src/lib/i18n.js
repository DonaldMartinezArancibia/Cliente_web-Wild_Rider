/**
 * Helpers de idioma compartidos por el selector y los templates.
 *
 * CommonJS a propósito: comparte estilo con src/lib/routes.js, que también
 * consume gatsby-node.js.
 */
const { localePath } = require("./routes")

const LANGUAGE_STORAGE_KEY = "user-lang"

/**
 * Devuelve la traducción de un nodo de Hygraph para un idioma.
 * Antes esto estaba escrito a mano una vez por content type (~15 veces).
 */
function pickLocalization(node, locale) {
  return node?.localizations?.find(item => item.locale === locale)
}

/**
 * Extrae el nodo traducible de una respuesta de Apollo.
 * Cada query del selector devuelve un único campo raíz, cuyo nombre cambia
 * según el content type; en vez de comprobarlos uno a uno, se toma el primero
 * que traiga `localizations`.
 */
function findLocalizableNode(data) {
  return Object.values(data ?? {}).find(value => value?.localizations)
}

/**
 * Ruta equivalente de la página actual en otro idioma.
 *
 * @param {object} data     respuesta de la query del content type
 * @param {string} locale   idioma destino
 * @param {boolean} isHome  la página vive en la raíz del idioma
 * @returns {string}        ruta destino; la home del idioma si no hay traducción
 */
function translatedPath(data, locale, isHome) {
  if (isHome) return localePath(locale)

  const localized = pickLocalization(findLocalizableNode(data), locale)

  // Sin traducción, la home del idioma. La versión anterior construía aquí una
  // URL con `undefined` dentro y acababa en un 404.
  return localized ? localePath(locale, localized.slug) : localePath(locale)
}

/** Guarda la preferencia manual de idioma del usuario. */
function rememberLanguage(locale) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
  } catch {
    // localStorage puede fallar en modo privado; la navegación sigue igual.
  }
}

/** Idioma elegido manualmente por el usuario, si lo hay. */
function getRememberedLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  } catch {
    return null
  }
}

module.exports = {
  LANGUAGE_STORAGE_KEY,
  pickLocalization,
  findLocalizableNode,
  translatedPath,
  rememberLanguage,
  getRememberedLanguage,
}
