import { useEffect } from "react"

const setMeta = (selector, attribute, value) => {
  if (value == null) return
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement("meta")
    document.head.appendChild(el)
  }
  el.setAttribute(attribute, value)
}

const appendScriptOnce = ({ id, src, attributes = {} }) => {
  if (document.getElementById(id)) return
  const script = document.createElement("script")
  script.id = id
  script.async = true
  script.src = src
  Object.entries(attributes).forEach(([key, value]) =>
    script.setAttribute(key, value)
  )
  document.head.appendChild(script)
}

/**
 * Escribe título y metadatos en el documento a partir del SEO de Hygraph.
 *
 * El contenido llega en runtime vía Apollo, así que no puede usarse la Head API
 * de Gatsby (que se resuelve en build). Este hook aísla esa manipulación del
 * DOM en un solo sitio en vez de dejarla dentro del template.
 *
 * @param {object} seo             nodo searchEngineOptimization de Hygraph
 * @param {object} [openGraph]     valores fijos de Open Graph de la página
 * @param {object[]} [scripts]     scripts de terceros a inyectar una sola vez
 */
export function useDocumentSeo(seo, openGraph = {}, scripts = []) {
  useEffect(() => {
    if (!seo) return

    document.title = seo.title
    setMeta('meta[name="description"]', "content", seo.description)
    setMeta('meta[name="keywords"]', "content", seo.keywords)
    setMeta('meta[property="og:title"]', "content", openGraph.title ?? seo.title)
    setMeta(
      'meta[property="og:description"]',
      "content",
      openGraph.description ?? seo.description
    )
    setMeta('meta[property="og:image"]', "content", openGraph.image)
    setMeta('meta[property="og:image:alt"]', "content", openGraph.imageAlt)
    setMeta('meta[property="og:url"]', "content", openGraph.url)
    setMeta('meta[property="og:type"]', "content", openGraph.type ?? "website")

    scripts.forEach(appendScriptOnce)
    // openGraph y scripts son literales estables definidos a nivel de módulo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seo])
}
