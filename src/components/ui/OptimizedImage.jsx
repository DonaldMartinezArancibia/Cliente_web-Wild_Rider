import React, { useState } from "react"
import { optimizeImageUrl } from "../../lib/hygraphImage"

/**
 * <img> para assets de Hygraph: pide la imagen redimensionada y en WebP.
 *
 * - `widths`: anchos a generar. Con uno solo se usa ese; con varios se arma un
 *   srcSet y el navegador elige según `sizes`.
 * - Si Hygraph no puede transformar el archivo (p. ej. un SVG) o la URL falla,
 *   vuelve a la URL original.
 * - Es `lazy` solo si se pasan `width` y `height`. Sin dimensiones una imagen
 *   de ancho automático mide 0×0 hasta cargar y el navegador nunca la carga;
 *   en ese caso es `eager`. Se puede forzar con `loading`.
 */
const OptimizedImage = ({
  src,
  widths = [800],
  sizes,
  loading,
  alt = "",
  ...rest
}) => {
  const knowsSize = Boolean(rest.width && rest.height)
  const effectiveLoading = loading ?? (knowsSize ? "lazy" : "eager")

  const [failed, setFailed] = useState(false)

  if (!src) return null

  const largest = widths[widths.length - 1]
  const useOriginal = failed || optimizeImageUrl(src, largest) === src
  const srcSet =
    !useOriginal && widths.length > 1
      ? widths.map(w => `${optimizeImageUrl(src, w)} ${w}w`).join(", ")
      : undefined

  return (
    <img
      src={useOriginal ? src : optimizeImageUrl(src, largest)}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      loading={effectiveLoading}
      decoding="async"
      alt={alt}
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}

export default OptimizedImage
