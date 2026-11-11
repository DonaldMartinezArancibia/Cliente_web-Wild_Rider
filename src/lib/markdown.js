import React from "react"
import OptimizedImage from "../components/ui/OptimizedImage"

export const markdownComponents = {
  a: props => <a {...props} target="_blank" rel="noopener noreferrer" />,
  img: ({ src, alt }) => (
    <OptimizedImage
      src={src}
      alt={alt}
      widths={[480, 768, 1062]}
      // En escritorio la imagen ocupa ~40 % del ancho (medido a 1280 px: 502 px).
      sizes="(min-width: 1024px) 45vw, 100vw"
      className="max-w-full h-auto"
    />
  ),
  iframe: ({ title, ...props }) => (
    <iframe
      {...props}
      title={title || "Embedded content"}
      className="w-full h-[775px] border-none"
      allowFullScreen
    />
  ),
}
