import React from "react"
import { GetAllPosts } from "../gql/allPost"
import { Link } from "gatsby"
import { useI18n } from "../hooks/useI18n"

export default function Showdata({ pageContext }) {
  const { localizedQuery, getLocalizedPath } = useI18n(pageContext)
  const { data: posts, statusElement } = localizedQuery(GetAllPosts)
  if (statusElement) return statusElement

  return (
    <section className="container flex flex-wrap justify-between w-4/6">
      {posts.posts.map(item => (
        <article key={item.id} className="mb-10">
          <div className="py-4">
            <div className="mb-2 text-xl font-bold">{item.title}</div>
            <p className="text-base font-medium">{item.content}</p>
          </div>
          <div className="py-4 mr-20 text-end">
            <Link
              to={getLocalizedPath(`blog/${item.slug}`)}
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
