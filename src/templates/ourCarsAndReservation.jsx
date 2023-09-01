import React from "react"
import MapContainer from "../components/reviewsHygraph"
import { graphql } from "gatsby"

export default function ourCarsAndReservation({ pageContext, data }) {
  const place = data.googlePlacesPlace
  const reviews = place.childrenGooglePlacesReview.map(r => (
    <div>
      <img height="50" width="50" src={r.profile_photo_url} />
      <strong>
        {r.author_name} - {r.rating}
      </strong>
      <p>{`${r.text.substring(0, 250)} ...`}</p>
    </div>
  ))
  return (
    <main>
      <h1>{place.name}</h1>
      <p>total ratings: {place.user_ratings_total}</p>
      <p>average: {place.rating}</p>
      <h3>Recent Reviews</h3>
      {reviews}
    </main>
  )
}

export const query = graphql`
  query {
    googlePlacesPlace {
      name
      rating
      childrenGooglePlacesReview {
        author_name
        text
        rating
        profile_photo_url
      }
      user_ratings_total
    }
  }
`
