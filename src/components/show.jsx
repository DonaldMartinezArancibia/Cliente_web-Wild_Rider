import { gql } from "@apollo/client"

const Show = gql`
  query {
    seos {
      title
      description
      id
    }
  }
`

export default Show
