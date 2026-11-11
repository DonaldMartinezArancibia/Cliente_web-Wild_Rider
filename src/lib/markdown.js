import React from "react"
import OptimizedImage from "../components/ui/OptimizedImage"

export const markdownComponents = {
  a: props => <a {...props} target="_blank" rel="noopener noreferrer" />,
  img: ({ src, alt }) => (
    <OptimizedImage
      src={src}
      alt={alt}
      widths={[640, 1200]}
      sizes="(min-width: 1024px) 60vw, 100vw"
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
