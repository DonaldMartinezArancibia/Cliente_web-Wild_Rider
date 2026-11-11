import React, { useState } from "react"
import { hygraphImageSize, optimizeImageUrl } from "../../lib/hygraphImage"

/**
 * <img> para assets de Hygraph: pide la imagen redimensionada y en WebP.
 *
 * - `widths`: anchos a generar. Con uno solo se usa ese; con varios se arma un
 *   srcSet y el navegador elige según `sizes`.
 * - Si Hygraph no puede transformar el archivo (p. ej. un SVG) o la URL falla,
 *   vuelve a la URL original.
 * - `width` y `height` reservan el espacio y evitan saltos de layout. Si no se
 *   pasan se toman de la URL cuando esta los trae (imágenes que el editor ya
 *   transformó en el CMS: resize=width:W,height:H).
 * - Es `lazy` solo si se conocen `width` y `height`. Sin dimensiones una imagen
 *   de ancho automático mide 0×0 hasta cargar y el navegador nunca la carga;
 *   en ese caso es `eager`. Se puede forzar con `loading`.
 */
const OptimizedImage = ({
  src,
  widths = [800],
  sizes,
  loading,
  alt = "",
  width,
  height,
  ...rest
}) => {
  const intrinsic = hygraphImageSize(src)
  const imgWidth = width || intrinsic?.width
  const imgHeight = height || intrinsic?.height
  const knowsSize = Boolean(imgWidth && imgHeight)
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
      width={imgWidth}
      height={imgHeight}
      loading={effectiveLoading}
      decoding="async"
      alt={alt}
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}

export default OptimizedImage
