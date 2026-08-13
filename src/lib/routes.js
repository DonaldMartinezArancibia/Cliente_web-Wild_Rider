/**
 * Única fuente de verdad para construir URLs localizadas.
 *
 * Regla del sitio: el idioma por defecto (inglés) vive en la raíz y el resto
 * de idiomas cuelgan de un prefijo `/{locale}/`. Antes esta regla estaba
 * duplicada a mano en gatsby-node, StickyBar, carInfoModal, carQuoteForm y
 * languajeSelector.
 *
 * CommonJS a propósito: gatsby-node.js también consume este módulo.
 */
const { DEFAULT_LOCALE } = require("../config/locales")

/** Prefijo de todas las rutas de un idioma: "/" para inglés, "/es/" para el resto. */
function localePrefix(locale) {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}/`
}

/**
 * Ruta completa de una página.
 * Sin slug (o con slug vacío) devuelve la home del idioma.
 */
function localePath(locale, slug) {
  const prefix = localePrefix(locale)
  return slug ? `${prefix}${slug}` : prefix
}

module.exports = { localePrefix, localePath }
