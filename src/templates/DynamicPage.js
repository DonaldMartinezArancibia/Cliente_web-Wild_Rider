// DynamicPage.js

import React from "react"
import { navigate } from "gatsby"

export default function DynamicPage({ pageContext }) {
  const { slug, locale } = pageContext
  const generateDynamicPagePath = (slug, language) => {
    return `/dynamic/${language}/${slug}`
  }

  const changeLanguage = (language, slug) => {
    const path = generateDynamicPagePath(slug, language)
    navigate(path)
  }

  return (
    <div>
      <button onClick={() => changeLanguage("es", slug)}>Español</button>
      <h1>{slug}</h1>
      {locale === "es" ? (
        <p>Contenido en español</p>
      ) : (
        <p>Content in English</p>
      )}
    </div>
  )
}
