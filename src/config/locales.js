/**
 * Idiomas soportados por el sitio.
 *
 * Deben coincidir con los locales configurados en Hygraph y con
 * `plugins["gatsby-source-graphcms"].options.locales` de gatsby-config.js.
 *
 * CommonJS a propósito: gatsby-node.js también consume este módulo.
 */
const LOCALES = ["es", "en", "de", "fr", "other"]

const DEFAULT_LOCALE = "en"

/**
 * Código BCP 47 de cada locale para el atributo `lang` de <html>.
 * "other" es el contenido en portugués.
 */
const HTML_LANG = { en: "en", es: "es", de: "de", fr: "fr", other: "pt" }

module.exports = { LOCALES, DEFAULT_LOCALE, HTML_LANG }
