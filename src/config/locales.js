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

module.exports = { LOCALES, DEFAULT_LOCALE }
