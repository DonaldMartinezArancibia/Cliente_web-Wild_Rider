import { gql } from "@apollo/client"

const GetAllReviews = gql`
  query Reviews($locale: [Locale!]!) {
    googleReviews: reviews(where: { reviewOrigin: Google }, locales: en) {
      ...ReviewFragment
    }
    tripAdvisorReviews: reviews(
      where: { reviewOrigin: TripAdvisor }
      locales: en
    ) {
      ...ReviewFragment
    }
    facebookReviews: reviews(where: { reviewOrigin: Facebook }, locales: en) {
      ...ReviewFragment
    }
  }

  fragment ReviewFragment on Review {
    reviewLink
    reviewImage(locales: en) {
      url
    }
    numberOfStars
    reviewerName
    review
    reviewOrigin
    testimonial(locales: $locale) {
      reviewsLinkText
    }
  }
`

export { GetAllReviews }
