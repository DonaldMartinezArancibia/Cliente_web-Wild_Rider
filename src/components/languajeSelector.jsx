import React from "react"
import { navigate } from "gatsby"
import { useQuery } from "@apollo/client"
import { Post } from "../gql/allPost"
import { Index } from "../gql/indexQuery"
import { ContactAndLocation } from "../gql/contactQuery"

export default function LanguageSelector({ pageContext }) {
  const query = [Index, Post, ContactAndLocation].find(
    query => query.definitions[0].name.value === pageContext.remoteTypeName
  )

  const { data, loading, error } = useQuery(query, {
    variables: {
      internalId: pageContext.remoteId,
      locale: [pageContext.langKey],
    },
  })
  if (loading) return <p>Loading...</p>
  if (error) return console.log(error)

  function getSlugByLocale(data) {
    const indexData = data.index ? data.index.localizations[0] : undefined
    const contactData = data.contactAndLocations
      ? data.contactAndLocations[0].localizations[0]
      : undefined
    const postData = data.posts ? data.posts[0].localizations[0] : undefined
    if (indexData?.locale === "en") return ""
    if (indexData?.locale) return indexData.locale
    if (postData?.locale === "en") return `blog/${postData.slug}`
    if (contactData?.locale === "en") return contactData.slug
    if (contactData?.locale) return `${contactData.locale}/${contactData.slug}`
    return `${postData.locale}/blog/${postData.slug}`
  }

  return (
    <button
      type="button"
      className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      onClick={() => {
        navigate(`/${getSlugByLocale(data)}`)
      }}
    >
      {pageContext.langKey === "en" ? "Español" : "English"}
    </button>
  )
}
