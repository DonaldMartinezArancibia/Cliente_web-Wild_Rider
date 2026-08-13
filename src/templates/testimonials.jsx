import React from "react"
import ReactMarkdown from "react-markdown"
import { MapContainer } from "../components/reviewsHygraph"
import { TestimonialPageContent } from "../gql/testimonialPageQuery"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import StickyBar from "../components/StickyBar"

const Testimonials = ({ pageContext }) => {
  const { data, statusElement } = useLocalizedQuery(
    TestimonialPageContent,
    pageContext
  )
  if (statusElement) return statusElement

  const pageData = data?.testimonials?.[0] ?? {}

  return (
    <main className="py-8 hero-surface">
      <StickyBar pageContext={pageContext} />

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
  )
}

export default Testimonials
