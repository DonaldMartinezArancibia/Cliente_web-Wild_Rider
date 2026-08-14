import React from "react"
import ReactMarkdown from "react-markdown"
import { ImprintContent } from "../gql/imprintPageQuery"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import StickyBar from "../components/ui/StickyBar"

const Imprint = ({ pageContext }) => {
  const { data, statusElement } = useLocalizedQuery(ImprintContent, pageContext)
  if (statusElement) return statusElement

  const imprint = data?.imprints?.[0] ?? {}

  return (
    <main className="py-8 hero-surface">
      <StickyBar pageContext={pageContext} />

      <div className="px-1 pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
            <div
              id="contentBelowVideo"
              className="!max-w-full !text-base px-2 md:px-4 md:mx-4 md:mb-8 prose lg:prose-lg xl:prose-xl xl:px-6"
            >
              <ReactMarkdown>{imprint.imprintContent?.markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Imprint
