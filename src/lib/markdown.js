import React from "react"

export const markdownComponents = {
  a: props => <a {...props} target="_blank" rel="noopener noreferrer" />,
  img: ({ src, alt }) => (
    <img src={src} alt={alt} className="max-w-full h-auto" />
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
