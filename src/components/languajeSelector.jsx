import React from "react"
import { navigate } from "gatsby"
import { useLocation } from "@reach/router"
import { PostBySlug } from "../gql/allPost"
import { IndexById } from "../gql/indexQuery"
import { useQuery } from "@apollo/client"

export default function LanguageSelector({ pageContext }) {
  // console.log(pageContext)
  const location = useLocation()
  const query =
    /^\/[a-z]{2}$/.test(pageContext.pagePath) || pageContext.pagePath === "/"
      ? IndexById
      : PostBySlug
  const {
    data: posts,
    loading: postsQueryLoading,
    error: postsQueryError,
  } = useQuery(query, {
    variables: {
      internalId: pageContext.remoteId,
      locale: [pageContext.langKey],
    },
  })
  if (postsQueryLoading) return <p>Loading...</p>
  if (postsQueryError) return console.log(postsQueryError)
  console.log(posts)
  const spanishSlug =
    posts?.index?.localizations[0].locale ||
    posts.posts[0].localizations[0].locale === "en"
      ? "blog/" + posts.posts[0].localizations[0].slug
      : posts.posts[0].localizations[0].locale +
        "/blog/" +
        posts.posts[0].localizations[0].slug
  console.log(spanishSlug)
  const englishSlug = posts?.index?.localizations.find(
    loc => loc.locale === "en"
  )?.slug

  // Comprobar si se encuentra en la página principal
  const isIndex = pageContext.pagePath === "/"
  // Utilizar una única expresión JSX para renderizar el botón de idioma
  return (
    <button
      onClick={() => {
        navigate(isIndex ? `/${spanishSlug}` : `/${spanishSlug}`)
      }}
    >
      {pageContext.langKey === "en" ? "Español" : "English"}
    </button>
  )
}
