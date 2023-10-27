import { gql } from "@apollo/client"

const GetAllReviews = gql`
  query GoogleReviews($locale: [Locale!]!) {
    googleReviews: googleReviews(
      where: { reviewOrigin: Google }
      locales: $locale
    ) {
      ...GoogleReviewFragment
    }
    tripAdvisorReviews: googleReviews(
      where: { reviewOrigin: TripAdvisor }
      locales: $locale
    ) {
      ...GoogleReviewFragment
    }
    facebookReviews: googleReviews(
      where: { reviewOrigin: Facebook }
      locales: $locale
    ) {
      ...GoogleReviewFragment
    }
  }

  fragment GoogleReviewFragment on GoogleReview {
    reviewLink
    reviewImage(locales: en) {
      url
    }
    numberOfStars
    reviewerName
    review
    reviewOrigin
  }
`

export { GetAllReviews }
