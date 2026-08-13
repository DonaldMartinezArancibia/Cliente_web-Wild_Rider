import React from "react"
import { useApolloClient, useQuery } from "@apollo/client/react"
import { GetAllPosts, PostBySlug } from "../gql/allPost"
import { Link } from "gatsby"

export default function Showdata({ pageContext }) {
  const client = useApolloClient()
  const {
    data: posts,
    loading: postsQueryLoading,
    error: postsQueryError,
  } = useQuery(GetAllPosts, { variables: { locale: [pageContext.langKey] } })
  if (postsQueryLoading) return <p>Loading...</p>
  // if (postsQueryError) return <p>Error : {postBySlugQueryError.message}</p>

  return (
    <section className="container flex flex-wrap justify-between w-4/6">
      {posts.posts.map(item => (
        <article key={item.id} className="mb-10">
          {/* <img className="w-full h-44" src={item.cover.url} /> */}
          <div className="py-4">
            <div className="mb-2 text-xl font-bold">{item.title}</div>
            <p className="text-base font-medium">{item.content}</p>
          </div>
          <div className="py-4 mr-20 text-end">
            <Link
              to={`/blog/${item.slug}`} // Usar una ruta absoluta aquí
              className="px-14 py-4 font-medium text-white bg-brand-blue rounded hover:bg-indigo-600"
            >
              View more
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
