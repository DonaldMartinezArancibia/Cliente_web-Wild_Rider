import React from "react"
import MapContainer from "../components/reviewsHygraph"

export default function ourCarsAndReservation({ pageContext, data }) {
  return (
    <main className="p-3 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%] lg:p-14">
      <h1 className="mb-10 font-CarterOne lg:text-5xl">Testimonials</h1>
      <h2 className="max-w-3xl mb-4 text-3xl font-CarterOne">
        Hear what our clients say
      </h2>
      <p className="mb-5">
        Don’t just take our word for it. Here are a few (of many) reviews of
        WildRider.
      </p>
      <MapContainer />
    </main>
  )
}
