import { gql } from "@apollo/client"

const CREATE_SEO = gql`
  mutation ($description: String!, $title: String!) {
    createSeo(data: { description: $description, title: $title }) {
      id
    }
  }
`
export default CREATE_SEO
