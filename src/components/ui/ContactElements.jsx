import React from "react"
import ReactMarkdown from "react-markdown"

/**
 * Rejilla de datos de contacto (icono + título + texto).
 * Compartida por la página de contacto y la de aeropuerto/oficina.
 */
const ContactElements = ({ elements = [], className = "" }) => (
  <div
    className={`grid mb-5 mx-3 min-[500px]:grid-cols-2 md:grid-cols-3 md:justify-items-center md:my-8 ${className}`}
  >
    {elements.map((element, index) => (
      <div className="flex items-center col-span-1" key={index}>
        <img
          className="h-8 mr-2 lg:h-12"
          src={element?.elementIcon?.url}
          alt={`${element.elementTitle} Icon`}
        />
        <div className="text-base">
          <p className="font-bold">{element.elementTitle}</p>
          <ReactMarkdown>{element.elementText?.markdown}</ReactMarkdown>
        </div>
      </div>
    ))}
  </div>
)

export default ContactElements
