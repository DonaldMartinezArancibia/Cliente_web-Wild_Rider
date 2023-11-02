import { gql } from "@apollo/client"

const GetAllReviews = gql`
  query Reviews($locale: [Locale!]!) {
    googleReviews: reviews(where: { reviewOrigin: Google }, locales: $locale) {
      ...ReviewFragment
    }
    tripAdvisorReviews: reviews(
      where: { reviewOrigin: TripAdvisor }
      locales: $locale
    ) {
      ...ReviewFragment
    }
    facebookReviews: reviews(
      where: { reviewOrigin: Facebook }
      locales: $locale
    ) {
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
