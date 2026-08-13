/**
 * Idiomas ofrecidos por el selector, con los campos de Hygraph que aportan su
 * etiqueta, su tooltip y el interruptor para ocultarlo.
 *
 * Antes cada idioma era un bloque JSX copiado con esos tres nombres de campo
 * escritos a mano.
 */
const SELECTABLE_LANGUAGES = [
  {
    code: "en",
    titleField: "englishLangSelectorTitle",
    tooltipField: "englishLangTooltipText",
    displayField: "displayEnglishLangSelectorTitle",
  },
  {
    code: "de",
    titleField: "germanLangSelectorTitle",
    tooltipField: "germanLangTooltipText",
    displayField: "displayGermanLangSelectorTitle",
  },
  {
    code: "fr",
    titleField: "frenchLangSelectorTitle",
    tooltipField: "frenchLangTooltipText",
    displayField: "displayFrenchLangSelectorTitle",
  },
  {
    code: "es",
    titleField: "spanishLangSelectorTitle",
    tooltipField: "spanishLangTooltipText",
    displayField: "displaySpanishLangSelectorTitle",
  },
  {
    code: "other",
    titleField: "otherLangSelectorTitle",
    tooltipField: "otherLangTooltipText",
    displayField: "displayOtherLangSelectorTitle",
  },
]

/** Idiomas a los que se autoredirige según el idioma del navegador. */
const AUTO_REDIRECT_LANGUAGES = ["en", "es", "de"]

module.exports = { SELECTABLE_LANGUAGES, AUTO_REDIRECT_LANGUAGES }
