import { gql } from "@apollo/client"

const PUBLISH_SEO = gql`
  mutation ($id: ID) {
    publishSeo(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`
export default PUBLISH_SEO
