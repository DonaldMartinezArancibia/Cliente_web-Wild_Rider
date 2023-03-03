import React from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import { GetAllPosts, PostBySlug } from "../gql/allPost"
import { Link } from "gatsby"

export default function Showdata({ pageContext }) {
  const client = useApolloClient()
  const {
    data: posts,
    loading: postsQueryLoading,
    error: postsQueryError,
  } = useQuery(GetAllPosts, { variables: { locale: [pageContext.langKey] } })
  client.refetchQueries({
    include: [GetAllPosts],
  })
  if (postsQueryLoading) return <p>Loading...</p>
  // if (postsQueryError) return <p>Error : {postBySlugQueryError.message}</p>

  return (
    <section className="container flex flex-wrap justify-between mx-auto xl:px-24">
      {posts.posts.map(item => (
        <article
          key={item.id}
          className="flex-1 max-w-sm m-4 overflow-hidden border border-gray-200 rounded shadow-lg ring-opacity-5 ring-black ring-1"
        >
          <img className="w-full h-44" src={item.cover.url} />
          <div className="px-6 py-4">
            <div className="mb-2 text-xl font-medium">{item.title}</div>
            <p className="text-base text-gray-700">{item.seo.description}</p>
          </div>
          <div className="px-6 py-4">
            <Link
              to={`blog/${item.slug}`}
              className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-full hover:bg-indigo-600"
            >
              Read More
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
