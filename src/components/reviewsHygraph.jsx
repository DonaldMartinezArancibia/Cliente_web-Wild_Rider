import React, { useState, useEffect } from "react"
import { StarIcon } from "@heroicons/react/24/solid"
import { GetAllReviews } from "../gql/allReviews"
import { useApolloClient, useQuery } from "@apollo/client"

const MapContainer = props => {
  // const reviews2 = [...googleR.googleReviews, ...newReviews]
  const [currentIndex2, setCurrentIndex2] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex2(prevIndex =>
  //       prevIndex === reviews2.length - 1 ? 0 : prevIndex + 1
  //     )
  //   }, 3000)

  //   return () => clearInterval(interval)
  // }, [reviews2.length])
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    "https://picsum.photos/id/45/720/405",
    "https://picsum.photos/id/8/720/405",
    "https://picsum.photos/id/47/720/405",
    "https://picsum.photos/id/37/720/405",
    "https://picsum.photos/id/87/720/405",
    "https://picsum.photos/id/55/720/405",
    "https://picsum.photos/id/67/720/405",
    "https://picsum.photos/id/60/720/405",
    "https://picsum.photos/id/57/720/405",
    "https://picsum.photos/id/83/720/405",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

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
  const newReviews = []
  // newReviews.push(
  //   {
  //     reviewLink: "https://goo.gl/maps/9BXFm7Uv5Yg4sFWa6",
  //     reviewImage: {
  //       url: "https://media.graphassets.com/gdn8a0NpmKuydK2GJ7bE",
  //       __typename: "Asset",
  //     },
  //     numberOfStars: 4,
  //     reviewerName: "John Smith",
  //     review:
  //       "Had a great experience with this company. The staff was friendly and helpful. The car we rented was in excellent condition and made our trip enjoyable. Would definitely recommend!",
  //     __typename: "GoogleReview",
  //   },
  //   {
  //     reviewLink: "https://goo.gl/maps/joKg6vscYsEheKqc6",
  //     reviewImage: {
  //       url: "https://media.graphassets.com/AUjDvYUjJXs2DvXK6KTR",
  //       __typename: "Asset",
  //     },
  //     numberOfStars: 5,
  //     reviewerName: "Sophia Johnson",
  //     review:
  //       "Outstanding service! The team at this company went above and beyond to make sure our car rental experience was smooth and hassle-free. The vehicle was clean and comfortable. Highly recommended!",
  //     __typename: "GoogleReview",
  //   },
  //   {
  //     reviewLink: "https://goo.gl/maps/Xb9xDpW7w4eFT2wm8",
  //     reviewImage: {
  //       url: "https://media.graphassets.com/SF0d3R4JzC0lDMX69Wtc",
  //       __typename: "Asset",
  //     },
  //     numberOfStars: 3,
  //     reviewerName: "David Anderson",
  //     review:
  //       "Decent service overall. The car we rented was in decent condition, but there were some issues with the booking process. It took longer than expected to pick up the vehicle. Average experience.",
  //     __typename: "GoogleReview",
  //   },
  //   {
  //     reviewLink: "https://goo.gl/maps/rn5RXsZuehLZGyKB9",
  //     reviewImage: {
  //       url: "https://media.graphassets.com/z3GJ1iul6ZCzm1T8FvTw",
  //       __typename: "Asset",
  //     },
  //     numberOfStars: 5,
  //     reviewerName: "Emma Thompson",
  //     review:
  //       "Excellent rental experience! The staff was friendly and professional. The car was clean and well-maintained. We had a smooth trip thanks to this company. Highly recommended!",
  //     __typename: "GoogleReview",
  //   },
  //   {
  //     reviewLink: "https://goo.gl/maps/5caKfW68rNY8MzMt9",
  //     reviewImage: {
  //       url: "https://media.graphassets.com/ldjA7vTt9J2zKcYXvF1Q",
  //       __typename: "Asset",
  //     },
  //     numberOfStars: 4,
  //     reviewerName: "Michael Davis",
  //     review:
  //       "Good service overall. The car we rented was comfortable and reliable. The staff was helpful and provided all the necessary information. Satisfied with our experience.",
  //     __typename: "GoogleReview",
  //   },
  //   {
  //     reviewLink: "https://goo.gl/maps/USG9QnqzAYNn4smX7",
  //     reviewImage: {
  //       url: "https://media.graphassets.com/83JmLr4b7kHmycXjAA12",
  //       __typename: "Asset",
  //     },
  //     numberOfStars: 5,
  //     reviewerName: "Olivia Martinez",
  //     review:
  //       "Amazing service! The team at this company was incredibly helpful and made our car rental process seamless. The vehicle was in great condition and we had no issues during our trip. Highly recommended!",
  //     __typename: "GoogleReview",
  //   },
  //   {
  //     reviewLink: "https://goo.gl/maps/czi4TJmS6t6E2Mab9",
  //     reviewImage: {
  //       url: "https://media.graphassets.com/7nTlKt9aKsLhfyVmjF7T",
  //       __typename: "Asset",
  //     },
  //     numberOfStars: 4,
  //     reviewerName: "James Wilson",
  //     review:
  //       "Good rental experience. The staff was friendly and the car was clean. We had a minor issue with the car's air conditioning, but it was promptly resolved. Overall, satisfied with the service.",
  //     __typename: "GoogleReview",
  //   },
  //   {
  //     reviewLink: "https://goo.gl/maps/2mN2zS5azqX1srsy9",
  //     reviewImage: {
  //       url: "https://media.graphassets.com/6Fc5JXx2e3O4p1mUY5PO",
  //       __typename: "Asset",
  //     },
  //     numberOfStars: 5,
  //     reviewerName: "Mia Rodriguez",
  //     review:
  //       "Exceptional service! The team at this company went above and beyond to accommodate our needs. The car was spotless and performed well throughout our trip. Will definitely rent from them again!",
  //     __typename: "GoogleReview",
  //   },
  //   {
  //     reviewLink: "https://goo.gl/maps/Za6bRf3Q1UAdscod8",
  //     reviewImage: {
  //       url: "https://media.graphassets.com/4MGo0SkgkPmQ2d0xZiqG",
  //       __typename: "Asset",
  //     },
  //     numberOfStars: 4,
  //     reviewerName: "Alexander Lee",
  //     review:
  //       "Overall, a positive experience. The car was clean and comfortable. The staff was polite and provided helpful information. We encountered a minor issue with the car's tire, but it was quickly resolved. Would recommend.",
  //     __typename: "GoogleReview",
  //   }
  // )

  return (
    <div className="mx-4 xl:px-16">
      {/* <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 50}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full"
            />
          ))}
        </div>
      </div> */}
      <h1 className="max-w-3xl mb-4 text-3xl font-CarterOne">
        Hear what our clients say
      </h1>
      <p>
        Don’t just take our word for it. Here are a few (of many) reviews of
        WildRider.
      </p>
      <div className="grid grid-cols-1 gap-4 my-8 sm:grid-cols-3">
        {[...googleR.googleReviews, ...newReviews].map((review, index) => (
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
