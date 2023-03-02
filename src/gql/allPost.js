import { gql } from "@apollo/client"

const GetAllPosts = gql`
  query Posts($locale: [Locale!]!) {
    posts(locales: $locale) {
      id
      slug
      title
      category
      content
      locale
      cover(locales: en) {
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
  query PostBySlug($internalId: ID!, $locale: [Locale!]!) {
    posts(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
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
