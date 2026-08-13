import React, { useState } from "react"
import ReactMarkdown from "react-markdown"

/**
 * Bloque de markdown con un "ver más / ver menos" opcional.
 *
 * Antes existían tres copias de este componente (insurance, roadSafety e
 * imprint) que sólo se diferenciaban en los renderers de markdown; ahora esas
 * diferencias están unificadas aquí: los enlaces abren en pestaña nueva y las
 * imágenes nunca desbordan su columna.
 */
const markdownComponents = {
  a: props => <a {...props} target="_blank" rel="noopener noreferrer" />,
  img: ({ src, alt }) => (
    <img src={src} alt={alt} className="max-w-full h-auto" />
  ),
}

const ContentToggle = ({
  content,
  index,
  showText,
  hideText,
  collapsible = true,
  sectionClassName = "p-4 mb-14 col-[1/4] lg:p-0",
}) => {
  const [isExtendedContentVisible, setIsExtendedContentVisible] =
    useState(false)

  // Camping y Airport/Office nunca han mostrado el desplegable: su contenido
  // extendido estaba comentado en el código original.
  const hasExtendedContent = collapsible && Boolean(content.extendedContent)

  return (
    <section className={`toggle-content ${sectionClassName}`}>
      <div className="mb-2">
        <ReactMarkdown components={markdownComponents}>
          {content.displayContent?.markdown}
        </ReactMarkdown>
      </div>

      {hasExtendedContent && (
        <>
          <div
            className={`extended-content-${index} ${
              isExtendedContentVisible ? "" : "hidden"
            }`}
          >
            <ReactMarkdown components={markdownComponents}>
              {content.extendedContent?.markdown}
            </ReactMarkdown>
          </div>

          <button
            type="button"
            className="text-brand-blue hover:underline"
            aria-expanded={isExtendedContentVisible}
            onClick={() => setIsExtendedContentVisible(prev => !prev)}
          >
            {isExtendedContentVisible ? hideText : showText}
          </button>
        </>
      )}
    </section>
  )
}

export default ContentToggle
