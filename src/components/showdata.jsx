import React from "react"
import { GetAllPosts } from "../gql/allPost"
import { Link } from "gatsby"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"

export default function Showdata({ pageContext }) {
  const { data: posts, statusElement } = useLocalizedQuery(
    GetAllPosts,
    pageContext
  )
  if (statusElement) return statusElement

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
