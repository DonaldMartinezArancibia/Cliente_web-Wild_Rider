import { gql } from "@apollo/client"

const GetAllReviews = gql`
  query GoogleReviews {
    googleReviews {
      reviewLink
      reviewImage {
        url
      }
      numberOfStars
      reviewerName
      review
    }
  }
`

export { GetAllReviews }
