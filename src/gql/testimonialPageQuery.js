import { gql } from "@apollo/client"

const Testimonial = gql`
  query Testimonial($internalId: ID!, $locale: [Locale!]!) {
    testimonial(where: { id: $internalId }, locales: $locale) {
      localizations {
        slug
        locale
        title
      }
    }
  }
`

const TestimonialPageContent = gql`
  query Testimonial($locale: [Locale!]!) {
    testimonials(locales: $locale) {
      title
      testimonialSectionText {
        testimonialSectionText {
          text
          raw
          markdown
          html
        }
      }
    }
  }
`

export { Testimonial, TestimonialPageContent }
