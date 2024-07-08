import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { useQuery } from "@apollo/client"
import { CarQuoteFormSlugs } from "../gql/carQuotePageQuery"

const StickyBar = ({ pageContext }) => {
  const stickyRef = useRef(null)
  const { data, loading, error } = useQuery(CarQuoteFormSlugs, {
    variables: {
      locale: [pageContext.langKey],
    },
  })

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const isSticky = stickyRef.current.getBoundingClientRect().top === 0
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

  return (
    <div ref={stickyRef} className="sticky top-0 z-10 p-1">
      <div className="flex md:w-1/2">
        <Link
          to={
            data?.carQuoteForms[0]?.localizations[0]
              ? `/${
                  pageContext.langKey === "en" ? "" : pageContext.langKey + "/"
                }${data.carQuoteForms[0].slug}`
              : ""
          }
          className="bg-[#F6CC4D] text-[#0833a2] text-2xl sm:text-4xl font-Poppins block m-auto py-5 px-16 hover:bg-[#ffda6b] rounded-lg font-extrabold"
        >
          {data?.carQuoteForms[0]?.buttonTextOfQuickQuote}
        </Link>
      </div>
    </div>
  )
}

export default StickyBar
