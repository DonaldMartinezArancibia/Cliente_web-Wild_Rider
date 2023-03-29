import React, { Component } from "react"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"

class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
    }
  }

  componentDidMount() {
    const { google } = this.props
    const service = new google.maps.places.PlacesService(
      document.createElement("section")
    )
    const request = {
      placeId: "ChIJkUvR8VbjoI8RjlaQqi1QI1U",
      fields: ["reviews"],
    }

    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.setState({
          reviews: place.reviews,
        })
      }
    })
  }

  render() {
    const { reviews } = this.state

    return (
      <div>
        <h1>Reviews:</h1>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>Author: {review.author_name}</p>
            <p>Rating: {review.rating}</p>
            <p>Text: {review.text}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB2H-WpOFQN0yyp8ARh4sl36uWL_Mb0ALE",
})(MapContainer)
