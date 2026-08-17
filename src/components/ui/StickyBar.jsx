import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import { CombinedQuery } from "../../gql/carQuotePageQuery"
import { useI18n } from "../../hooks/useI18n"
import { localePath } from "../../lib/routes"

const StickyBar = ({ pageContext }) => {
  const stickyRef = useRef(null)
  const { localizedQuery, langKey } = useI18n(pageContext)
  const { data, statusElement } = localizedQuery(CombinedQuery)

  const [isScrollVisible, setIsScrollVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const isSticky = stickyRef.current.getBoundingClientRect().top === 0
        setIsScrollVisible(isSticky)
        if (isSticky) {
          stickyRef.current.classList.add("glass-effect")
        } else {
          stickyRef.current.classList.remove("glass-effect")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (statusElement) return statusElement

  const quoteForm = data?.carQuoteForms?.[0]
  const indexLink = data?.menu?.menuElements?.find(
    item => item.__typename === "Index"
  )

  return (
    <div
      ref={stickyRef}
      className={`sticky transition-all ease-in-out top-0 z-10 p-1 ${
        isScrollVisible ? "w-full" : "md:w-1/2"
      }`}
    >
      <div className="flex flex-col md:flex-row">
        <Link
          to={
            quoteForm?.localizations?.[0]
              ? localePath(pageContext.langKey, quoteForm.slug)
              : ""
          }
          className="bg-brand-yellow text-brand-blue text-2xl sm:text-4xl font-Poppins block my-1 m-auto p-5 hover:bg-brand-yellow-light rounded-lg font-extrabold md:px-16"
        >
          {quoteForm?.buttonTextOfQuickQuote}
        </Link>
        <Link
          to={indexLink?.slug ? localePath(pageContext.langKey) : ""}
          className={`bg-brand-blue relative p-5 hover:bg-blue-800 text-white text-xl sm:text-xl md:ml-16 font-Poppins block m-auto rounded-lg font-extrabold ${
            isScrollVisible ? "block" : "hidden"
          }`}
        >
          {indexLink?.title}
        </Link>
      </div>
    </div>
  )
}

export default StickyBar
