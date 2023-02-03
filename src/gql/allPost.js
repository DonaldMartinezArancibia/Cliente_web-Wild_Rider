import { gql } from "@apollo/client"

const GetAllPosts = gql`
  query Posts {
    posts {
      id
      slug
      title
      category
      content
      cover {
        url(
          transformation: {
            image: { resize: { width: 1200, height: 630, fit: crop } }
          }
        )
      }
      seo {
        ... on Seo {
          title
          description
          image {
            url(
              transformation: {
                image: { resize: { width: 1200, height: 630 } }
              }
            )
          }
        }
      }
    }
  }
`
const PostBySlug = gql`
  query PostBySlug($slug: String!) {
    posts(where: { slug: $slug }) {
      id
      slug
      title
      category
      content
      cover {
        url(
          transformation: {
            image: { resize: { width: 1200, height: 630, fit: crop } }
          }
        )
      }
      seo {
        ... on Seo {
          title
          description
          image {
            url(
              transformation: {
                image: { resize: { width: 1200, height: 630 } }
              }
            )
          }
        }
      }
      address {
        adressLineOne
        adressLineTwo
        cIty
        postalCode
      }
    }
  }
`

export { GetAllPosts, PostBySlug }
