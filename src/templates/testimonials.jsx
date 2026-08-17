import React from "react"
import ReactMarkdown from "react-markdown"
import { MapContainer } from "../components/reviewsHygraph"
import { TestimonialPageContent } from "../gql/testimonialPageQuery"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import TemplateBase from "../components/TemplateBase"

const Testimonials = ({ pageContext }) => {
  const { data, statusElement } = useLocalizedQuery(
    TestimonialPageContent,
    pageContext
  )
  if (statusElement) return statusElement

  const pageData = data?.testimonials?.[0] ?? {}

  const seo = pageData?.searchEngineOptimization

  return (
    <TemplateBase pageContext={pageContext} seoData={seo}>
      <main className="py-8 hero-surface">
        <h1 className="p-4 mb-10 font-CarterOne lg:text-5xl lg:mb-0 lg:p-14">
          {pageData.title}
        </h1>

      <section className="testimonials-intro lg:px-3">
        <ReactMarkdown>
          {pageData.testimonialSectionText?.testimonialSectionText?.markdown}
        </ReactMarkdown>
      </section>

      <MapContainer pageContext={pageContext} />
    </main>
  </TemplateBase>
  )
}

export default Testimonials
