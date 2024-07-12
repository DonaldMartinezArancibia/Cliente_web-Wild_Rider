import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import { useQuery } from "@apollo/client"
import { CombinedQuery } from "../gql/carQuotePageQuery"

const StickyBar = ({ pageContext }) => {
  const stickyRef = useRef(null)
  const { data, loading, error } = useQuery(CombinedQuery, {
    variables: {
      locale: [pageContext.langKey],
    },
  })

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

  if (loading) return <p>Loading...</p>
  const { carQuoteForms, menu } = data
  const indexLink = menu.menuElements.find(item => item.__typename === "Index")

  return (
    <div
      ref={stickyRef}
      className={`sticky top-0 z-10 p-1 ${
        isScrollVisible ? "w-full" : "md:w-1/2"
      }`}
    >
      <div className="flex flex-col md:flex-row">
        <Link
          to={
            carQuoteForms[0]?.localizations[0]
              ? `/${
                  pageContext.langKey === "en" ? "" : pageContext.langKey + "/"
                }${carQuoteForms[0].slug}`
              : ""
          }
          className="bg-[#F6CC4D] text-[#0833a2] text-2xl sm:text-4xl font-Poppins block m-auto py-5 px-16 hover:bg-[#ffda6b] rounded-lg font-extrabold"
        >
          {data?.carQuoteForms[0]?.buttonTextOfQuickQuote}
        </Link>
        <Link
          to={
            indexLink.slug
              ? `/${
                  pageContext.langKey === "en" ? "" : pageContext.langKey + "/"
                }`
              : ""
          }
          className={`transition ease-in-out hover:text-[#f6cc4d] hover:drop-shadow-[1px_1px_rgba(0,0,0)] relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-[#f6cc4d] before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300 before:ease-in-out text-[#0833a2] text-xl sm:text-xl font-Poppins block m-auto p-1 rounded-lg font-extrabold ${
            isScrollVisible ? "block" : "hidden"
          }`}
        >
          Regresar al Inicio
        </Link>
      </div>
    </div>
  )
}

export default StickyBar
