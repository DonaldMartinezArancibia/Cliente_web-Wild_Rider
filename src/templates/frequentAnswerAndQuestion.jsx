import React, { useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import * as JsSearch from "js-search"
import { FrequentAnswersAndQuestions } from "../gql/allAnswersAndQuestions"
import { FaqContent } from "../gql/faqPageQuery"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import TemplateBase from "../components/TemplateBase"

const ChevronIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
  </svg>
)

const Faq = ({ pageContext }) => {
  const faqQuery = useLocalizedQuery(FrequentAnswersAndQuestions, pageContext)
  const pageQuery = useLocalizedQuery(FaqContent, pageContext)

  const [searchTerm, setSearchTerm] = useState("")
  const [openAnswers, setOpenAnswers] = useState({})

  const faqElements = useMemo(
    () => faqQuery.data?.frequentAnswersAndQuestions ?? [],
    [faqQuery.data]
  )

  // El índice sólo se reconstruye cuando cambian las preguntas, no en cada
  // pulsación de teclado como hacía la versión anterior.
  const searchIndex = useMemo(() => {
    const index = new JsSearch.Search("answer")
    index.addIndex("question")
    index.addIndex("answer")
    index.addDocuments(faqElements)
    return index
  }, [faqElements])

  const searchResults = useMemo(
    () => (searchTerm ? searchIndex.search(searchTerm) : faqElements),
    [searchIndex, searchTerm, faqElements]
  )

  if (faqQuery.statusElement) return faqQuery.statusElement

  const faqPage = pageQuery.data?.faqs?.[0]

  const toggleAnswer = index =>
    setOpenAnswers(prev => ({ ...prev, [index]: !prev[index] }))

  const seo = faqPage?.searchEngineOptimization

  return (
    <TemplateBase pageContext={pageContext} seoData={seo}>
      <main className="py-8 hero-surface">
        <h1 className="p-4 font-CarterOne lg:pt-14 lg:text-5xl lg:px-14">
          {faqPage?.title}
        </h1>

      <section className="p-4 my-4 lg:px-14">
        <ReactMarkdown>{faqPage?.faqSubtitleText?.markdown}</ReactMarkdown>
      </section>

      <div className="relative p-4 mb-10 lg:w-1/2 lg:pl-14">
        <label htmlFor="FAQsearch" className="absolute right-7 top-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-black"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M384 208A176 176 0 1 0 32 208a176 176 0 1 0 352 0zM343.3 366C307 397.2 259.7 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 51.7-18.8 99-50 135.3L507.3 484.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L343.3 366z" />
          </svg>
        </label>
        <input
          type="text"
          id="FAQsearch"
          placeholder={faqPage?.searchInputPlaceholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full h-10 px-5 bg-white rounded py-7 placeholder:text-black focus:outline-none focus:border-primary focus:ring"
        />
      </div>

      <ul className="lg:px-14">
        {searchResults.map((result, index) => (
          <li key={index} className="mb-10 lg:w-1/2">
            <h3
              onClick={() => toggleAnswer(index)}
              className="p-4 relative bg-white border-[2.9px] border-[#979797] rounded-2xl cursor-pointer"
            >
              {result.question}
              <span className="absolute top-6 right-7">
                <ChevronIcon
                  className={`h-4 w-4 text-black transition-transform ${
                    openAnswers[index] ? "rotate-180" : ""
                  }`}
                />
              </span>
            </h3>

            {openAnswers[index] && (
              <div className="relative">
                <p className="bg-white p-4 pt-8 pb-20 border-[1px] border-[#979797] drop-shadow-[1px_0px_3px_rgba(80,80,80)] rounded-xl m-[0_0_-12px] relative bottom-3 z-0">
                  {result.answer}
                </p>
                <button
                  type="button"
                  onClick={() => toggleAnswer(index)}
                  className="right-[44%] text-primary hover:underline cursor-pointer absolute bottom-10 md:right[55%] lg:right-1/2 flex items-center"
                >
                  <ChevronIcon
                    className={`h-3 w-3 mr-2 text-black transition-transform ${
                      openAnswers[index] ? "rotate-180" : ""
                    }`}
                  />
                  {faqPage?.showLessText}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  </TemplateBase>
  )
}

export default Faq
