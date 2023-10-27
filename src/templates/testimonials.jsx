import React from "react"
import { MapContainer } from "../components/reviewsHygraph"
import { useApolloClient, useQuery } from "@apollo/client"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { TestimonialPageContent } from "../gql/testimonialPageQuery"

export default function useTestimonialsPage({ pageContext }) {
  const client = useApolloClient()
  const {
    data: TestimonialPageData,
    loading: TestimonialPageDataQueryLoading,
    error: TestimonialPageDataQueryError,
  } = useQuery(TestimonialPageContent, {
    variables: {
      // internalId: pageContext.remoteId,
      locale: [pageContext.langKey],
    },
  })
  client.refetchQueries({
    include: [TestimonialPageContent],
  })
  if (TestimonialPageDataQueryLoading) return <p>Loading...</p>

  const pageData = TestimonialPageData.testimonials[0]
  console.log(pageData)

  return (
    <main className="p-3 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%]">
      <h1 className="mb-10 font-CarterOne lg:text-5xl lg:mb-0 lg:px-20 lg:py-14">
        {pageData.title}
      </h1>
      <section id="sectionBellowTestimonialsTitle">
        <ReactMarkdown>
          {pageData.testimonialSectionText.testimonialSectionText.markdown}
        </ReactMarkdown>
      </section>
      {/* <h2 className="max-w-3xl mb-4 text-3xl font-CarterOne">
        Hear what our clients say
      </h2>
      <p className="mb-5">
        Don’t just take our word for it. Here are a few (of many) reviews of
        WildRider.
      </p> */}
      <MapContainer pageContext={pageContext} />
    </main>
  )
}
