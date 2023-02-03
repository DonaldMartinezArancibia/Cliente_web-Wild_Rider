import React from "react"
import { useQuery } from "@apollo/client"
import { GetAllPosts, PostBySlug } from "../gql/allPost"
import { Link } from "gatsby"

export default function Showdata() {
  const {
    data: posts,
    // loading: postsQueryLoading,
    // error: postsQueryError,
  } = useQuery(GetAllPosts)
  const {
    data: postBySlug,
    loading: postBySlugQueryLoading,
    error: postBySlugQueryError,
  } = useQuery(PostBySlug, { variables: { slug: "lorem-ipsum" } })
  if (postBySlugQueryLoading) return <p>Loading...</p>
  if (postBySlugQueryError) return <p>Error : {postBySlugQueryError.message}</p>
  console.log(posts)

  return (
    <>
      <section className="flex flex-wrap container mx-auto xl:px-24 justify-between">
        {posts.posts.map(item => (
          <article
            key={item.id}
            className="max-w-sm overflow-hidden m-4 flex-1 ring-opacity-5 ring-black ring-1 shadow-lg rounded border border-gray-200"
          >
            <img className="w-full h-44" src={item.cover.url} />
            <div className="px-6 py-4">
              <div className="font-medium text-xl mb-2">{item.title}</div>
              <p className="text-gray-700 text-base">{item.seo.description}</p>
            </div>
            <div className="px-6 py-4">
              <Link
                to={`/blog/${item.slug}`}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-full"
              >
                Read More
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
