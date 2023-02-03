import * as React from "react"
import { Layout, Seo } from "../../components"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { formatDate } from "../../utils"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

const PostLayout = ({ data: { graphCmsPost: post, cover } }) => {
  console.log(post, cover)
  const shareImage =
    post.seo && post.seo.image ? post.seo.image.url : post.cover.url || null

  return (
    <Layout>
      {post.seo !== null ? (
        <Seo
          title={post.seo.title}
          description={post.seo.description}
          image={shareImage}
        />
      ) : null}
      <div className="container px-5 mx-auto">
        <GatsbyImage
          image={getImage(cover)}
          alt={post.seo !== null ? post.seo.title : null}
          className="h-64 lg:h-[380px]"
        />
        <section className="mt-10 max-w-[760px] mx-auto">
          <h1 className="text-[#2D3738] font-bold text-5xl">{post.title}</h1>
          <div className="mt-5 flex space-x-[56px]">
            <p className="text-[#2D3738] font-bold">Escrito por Donald</p>
            <p className="text-[#718096]">
              {formatDate(post.publishedAt, "EEEE, LLLL yyyy")}
            </p>
          </div>
          <hr className="my-8 border-gray-200" />
          <div className="prose max-w-full mb-[58px]">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Post($id: String!, $slug: String!) {
    graphCmsPost(slug: { eq: $slug }) {
      id
      title
      slug
      category
      content
      cover {
        url
      }
      seo {
        ... on GraphCMS_Seo {
          title
          description
          image {
            url
          }
        }
      }
      publishedAt
    }
    cover: graphCmsAsset(coverPost: { elemMatch: { id: { eq: $id } } }) {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
`
export default PostLayout
