import React from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import { Car } from "../gql/carsQuery"
import OpenModal from "../components/modal"

export default function useOurCarsAndReservation({ pageContext }) {
  const client = useApolloClient()
  const {
    data: cars,
    loading: carsQueryLoading,
    error: carsQueryError,
  } = useQuery(Car, { variables: { locale: [pageContext.langKey] } })
  client.refetchQueries({
    include: [Car],
  })
  if (carsQueryLoading) return <p>Loading...</p>
  // if (carsQueryError) return <p>Error : {carsQueryError.message}</p>
  return (
    <main className="p-3 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-40rem_bottom_-40rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%] lg:p-14">
      <h1 className="mb-10 font-CarterOne lg:text-5xl">
        Our cars & Reservation
      </h1>
      <section className=" lg:gap-28 lg:grid lg:grid-cols-[1fr_1fr] lg:grid-rows-[1fr] p-[10px_10px_10px]">
        {cars.cars.map(item => (
          <article key={item.id}>
            <img className="h-[355px]" src={item.carMainPhoto.url} />
            <div className="flex items-center justify-between py-4">
              <h2 className="max-w-3xl text-4xl font-CarterOne">
                {item.carName}
              </h2>
              <OpenModal pageContext={pageContext} carId={item.id} />
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
