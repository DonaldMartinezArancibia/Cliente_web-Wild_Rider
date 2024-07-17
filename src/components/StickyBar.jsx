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
      className={`sticky transition-all ease-in-out top-0 z-10 p-1 ${
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
          className="bg-[#F6CC4D] text-[#0833a2] text-2xl sm:text-4xl font-Poppins block my-1 m-auto p-5 hover:bg-[#ffda6b] rounded-lg font-extrabold md:px-16"
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
          className={`bg-[#0833a2] relative p-5 hover:bg-blue-800 text-white text-xl sm:text-xl md:ml-16 font-Poppins block m-auto rounded-lg font-extrabold ${
            isScrollVisible ? "block" : "hidden"
          }`}
        >
          {indexLink.title}
        </Link>
      </div>
    </div>
  )
}

export default StickyBar
