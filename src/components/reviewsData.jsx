import React, { useState, useEffect } from "react"
import { StarIcon } from "@heroicons/react/24/solid"

const MyComponent = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJkUvR8VbjoI8RjlaQqi1QI1U&fields=reviews&key=AIzaSyB2H-WpOFQN0yyp8ARh4sl36uWL_Mb0ALE"
        )
        const data = await response.json()
        setReviews(data.result.reviews)
      } catch (error) {
        console.log("Hubo un error en el url anterior")
        const response = await fetch("/apis")
        const data = await response.json()
        setReviews(data.result.reviews)
      }
    }
    fetchReviews()
  }, [])

  const [expandedReviews, setExpandedReviews] = useState([])

  const handleExpandClick = index => {
    const newExpandedReviews = [...expandedReviews]
    newExpandedReviews[index] = !expandedReviews[index]
    setExpandedReviews(newExpandedReviews)
  }

  return (
    <div className="py-8 mx-16">
      <h1 className="mb-4 text-3xl font-bold">Reviews</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex p-4 border border-gray-300 rounded-md"
          >
            <img
              src={review.profile_photo_url}
              alt="Profile"
              className="w-12 h-12 mr-4 rounded-full"
            />
            <div>
              <h2 className="mb-2 text-lg font-bold">{review.author_name}</h2>
              <div className="flex items-center mb-2">
                {Array.from(Array(5), (_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${
                      review.rating >= i + 1
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              {review.text.length > 150 ? (
                <>
                  <p className="text-gray-600">
                    {expandedReviews[index]
                      ? review.text
                      : `${review.text.slice(0, 150)}... `}
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault()
                        handleExpandClick(index)
                      }}
                      className="text-blue-500"
                    >
                      {expandedReviews[index] ? " Leer menos" : " Leer más"}
                    </a>
                  </p>
                </>
              ) : (
                <p className="text-gray-600">{review.text}</p>
              )}
              <p className="text-xs text-gray-400">
                {review.relative_time_description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyComponent
