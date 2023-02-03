import React from "react"
import { graphql } from "gatsby"
// import { createApolloClient } from "./gatsby-browser"
import { gql } from "@apollo/client"

const DynamicPage = ({ data, pageContext }) => {
  console.log(data, pageContext)
  return <div>{/* Your content here */}Hello</div>
}

export const query = gql`
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
    }
  }
`

export default DynamicPage
