import React, { useState, useEffect } from "react"
import { StarIcon } from "@heroicons/react/24/solid"
import { GetAllReviews } from "../gql/allReviews"
import { useApolloClient, useQuery } from "@apollo/client"

const MapContainer = props => {
  const [reviews, setReviews] = useState([])

  const client = useApolloClient()
  const {
    data: googleR,
    loading: googleRLoading,
    error: googleRError,
  } = useQuery(GetAllReviews)
  client.refetchQueries({
    include: [GetAllReviews],
  })
  if (googleRLoading) return <p>Loading...</p>

  const openReviewLink = url => {
    window.open(url, "Data", "height=700px,width=600px")
  }
  const handleLinkClick = (e, url) => {
    e.preventDefault()
    openReviewLink(url)
  }

  const truncateReview = (review, length) => {
    return review.length > length ? review.substring(0, length) + "..." : review
  }

  return (
    <div className="mx-4 xl:px-16">
      <h1 className="max-w-3xl mb-4 text-3xl font-CarterOne">
        As a result of our excellent service to our customers, we have a Top
        rating in different travel forums.
      </h1>
      <p>Please check out, what customers say about us.</p>
      <div className="grid grid-cols-1 gap-4 my-8 sm:grid-cols-3">
        {googleR.googleReviews.map((review, index) => (
          <div
            key={index}
            className="p-4 border-opacity-100 border-gray-300 bg-[#d9eaf9] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <a
              href="view-original-review"
              onClick={e => handleLinkClick(e, review.reviewLink)}
              className="flex"
            >
              <img
                src={review.reviewImage.url}
                alt="Profile"
                className="w-12 h-12 mr-4 rounded-full"
              />
              <div>
                <h2 className="mb-2 text-lg font-bold">
                  {review.reviewerName}
                </h2>
                <div className="flex items-center mb-2">
                  {Array.from(Array(5), (_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        review.numberOfStars >= i + 1
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </a>
            <p className="text-[#1a1a1a]">
              {truncateReview(review.review, 250)}
              {review.review.length > 250 && (
                <a
                  href={review.reviewLink}
                  onClick={e => handleLinkClick(e, review.reviewLink)}
                  className="text-[#0833a2] ml-1 hover:underline"
                >
                  Leer más
                </a>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MapContainer
