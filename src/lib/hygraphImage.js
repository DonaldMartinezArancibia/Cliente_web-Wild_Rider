// Las URLs de assets de Hygraph aceptan transformaciones antes del handle:
//   https://media.graphassets.com/resize=width:800,fit:max/output=format:webp/<handle>
//   https://<region>.graphassets.com/<env>/resize=.../<handle>
// `fit:max` nunca amplía, así que una imagen pequeña no se deforma.
const HYGRAPH_ASSET = /^https:\/\/([a-z0-9-]+\.)?graphassets\.com\//

/**
 * Descompone una URL de Hygraph en origen, handle y transformaciones previas.
 * Devuelve null si no es un asset de Hygraph.
 *
 * Los textos del CMS traen imágenes ya transformadas por el editor
 * (p. ej. .../output=format:webp/resize=width:1062,height:880/<handle>);
 * de ahí se saca el tamaño y se puede volver a pedir más pequeña.
 */
function parseHygraphUrl(url) {
  if (!url || !HYGRAPH_ASSET.test(url)) return null

  let parsed
  try {
    parsed = new URL(url)
  } catch {
    return null
  }

  const segments = parsed.pathname.split("/").filter(Boolean)
  const handle = segments[segments.length - 1]
  const prefix = segments.slice(0, -1)
  const transformations = prefix.filter(segment => segment.includes("="))
  // En los dominios regionales el primer segmento es el id del entorno.
  const base = `${parsed.origin}${prefix
    .filter(segment => !segment.includes("="))
    .map(segment => `/${segment}`)
    .join("")}`

  const resize = transformations
    .map(segment => /^resize=(.*)$/.exec(segment)?.[1])
    .find(Boolean)
  const number = key => {
    const value = new RegExp(`${key}:(\\d+)`).exec(resize ?? "")?.[1]
    return value ? Number(value) : undefined
  }
  const fit = /fit:(\w+)/.exec(resize ?? "")?.[1]

  return {
    base,
    handle,
    width: number("width"),
    height: number("height"),
    // Con recorte (crop) o escala el editor eligió un encuadre: no se toca.
    keepAsIs: Boolean(fit) && fit !== "max" && fit !== "clip",
  }
}

/** Tamaño intrínseco, solo si la propia URL lo dice (resize=width:W,height:H). */
export function hygraphImageSize(url) {
  const parts = parseHygraphUrl(url)
  return parts?.width && parts?.height
    ? { width: parts.width, height: parts.height }
    : null
}

export function optimizeImageUrl(url, width) {
  const parts = parseHygraphUrl(url)
  if (!parts || !width || parts.keepAsIs) return url

  return `${parts.base}/resize=width:${width},fit:max/output=format:webp/${parts.handle}`
}
