import React, { createContext, useContext } from "react"

const SiteDataContext = createContext({})

/**
 * Datos que el layout ya consulta una vez por página (cabecera, pie y menús) y
 * que antes se inyectaban a los hijos con `React.cloneElement`, lo que obligaba
 * a cada template a aceptar y reenviar props que no le pertenecen.
 */
export const SiteDataProvider = ({ children, value }) => (
  <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
)

export const useSiteData = () => useContext(SiteDataContext)

/**
 * Código de idioma con el que Hygraph etiqueta el contenido (`langKey`).
 * Se usa para widgets de terceros como reCAPTCHA, que esperan su propio código.
 */
export const useContentLangKey = () => useSiteData().contentLangKey
