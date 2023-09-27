import { gql } from "@apollo/client"

const GetAllReviews = gql`
  query GoogleReviews {
    googleReviews: googleReviews(where: { reviewOrigin: Google }) {
      ...GoogleReviewFragment
    }
    tripAdvisorReviews: googleReviews(where: { reviewOrigin: TripAdvisor }) {
      ...GoogleReviewFragment
    }
    facebookReviews: googleReviews(where: { reviewOrigin: Facebook }) {
      ...GoogleReviewFragment
    }
  }

  fragment GoogleReviewFragment on GoogleReview {
    reviewLink
    reviewImage {
      url
    }
    numberOfStars
    reviewerName
    review
    reviewOrigin
  }
`

export { GetAllReviews }
