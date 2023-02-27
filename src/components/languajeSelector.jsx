import React from "react"
import { navigate } from "gatsby"
import { useLocation } from "@reach/router"

export default function LanguageSelector({ pageContext }) {
  const location = useLocation()
  if (pageContext.langKey === "en") {
    return (
      <button
        onClick={() => {
          navigate(`/es${location.pathname}`)
        }}
      >
        Español
      </button>
    )
  } else {
    return (
      <button
        onClick={() =>
          navigate(
            location.pathname.replace("/" + pageContext.langKey + "/", "/")
          )
        }
      >
        English
      </button>
    )
  }
}
