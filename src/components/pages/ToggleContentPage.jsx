import React from "react"
import { useLocalizedQuery } from "../../hooks/useLocalizedQuery"
import ContentToggle from "../ui/ContentToggle"
import StickyBar from "../StickyBar"

/**
 * Página de contenido plegable (seguros, seguridad vial, …).
 *
 * Antes cada una de estas páginas era una copia literal de la anterior; ahora
 * el template sólo aporta su query y de dónde sacar el nodo dentro de la
 * respuesta.
 *
 * @param {object}   props.pageContext  contexto de página de Gatsby
 * @param {object}   props.query        documento GraphQL a ejecutar
 * @param {Function} props.selectPage   extrae el nodo de la página desde `data`
 */
const ToggleContentPage = ({ pageContext, query, selectPage }) => {
  const { data, statusElement } = useLocalizedQuery(query, pageContext)
  if (statusElement) return statusElement

  const page = selectPage(data) ?? {}
  const sections = page.toggleContent ?? []

  return (
    <main className="py-8 hero-surface">
      <StickyBar pageContext={pageContext} />

      <h1 className="p-4 font-CarterOne lg:mb-10 lg:text-5xl lg:px-14 xl:pb-10">
        {page.title}
      </h1>

      <div className="sm:grid lg:grid-cols-3 lg:px-14">
        {sections.map((content, index) => (
          <ContentToggle
            key={index}
            content={content}
            index={index}
            showText={page.showText}
            hideText={page.hideText}
          />
        ))}
      </div>
    </main>
  )
}

export default ToggleContentPage
