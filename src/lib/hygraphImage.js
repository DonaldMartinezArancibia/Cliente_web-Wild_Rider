// Las URLs de assets de Hygraph aceptan transformaciones antes del handle:
//   https://media.graphassets.com/resize=width:800,fit:max/output=format:webp/<handle>
//   https://<region>.graphassets.com/<env>/resize=.../<handle>
// `fit:max` nunca amplía, así que una imagen pequeña no se deforma.
const HYGRAPH_ASSET = /^https:\/\/([a-z0-9-]+\.)?graphassets\.com\//

export function optimizeImageUrl(url, width) {
  if (!url || !width || !HYGRAPH_ASSET.test(url) || url.includes("/resize=")) {
    return url
  }
  const handleStart = url.lastIndexOf("/")
  return `${url.slice(0, handleStart)}/resize=width:${width},fit:max/output=format:webp${url.slice(handleStart)}`
}
