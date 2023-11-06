import React from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import { Car } from "../gql/carsQuery"
import { CarContent } from "../gql/carsPageQuery"
import OpenModal from "../components/carInfoModal"

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
  const {
    data: carsPageData,
    loading: carsPageDataLoading,
    error: carsPageDataError,
  } = useQuery(CarContent, { variables: { locale: [pageContext.langKey] } })
  client.refetchQueries({
    include: [CarContent],
  })
  if (carsQueryLoading) return <p>Loading...</p>
  if (carsPageDataLoading) return <p>Loading...</p>

  return (
    <main className="p-3 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-40rem_bottom_-40rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%] xl:p-14">
      <h1 className="mb-10 font-CarterOne lg:text-5xl">
        {carsPageData.carsAndQuotes[0].title}
      </h1>
      <section className="p-[10px_10px_10px] md:gap-10 xl:gap-28 sm:grid sm:grid-cols-[1fr_1fr] sm:grid-rows-[1fr]">
        {cars.cars.map(item => (
          <article key={item.id} className="mb-10 md:mb-0">
            <img
              className="m-auto w-11/12 md:w-auto lg:h-[355px]"
              src={item.carMainPhoto.url}
            />
            <div className="flex flex-col items-center justify-between py-4 xl:flex-row">
              <h2 className="max-w-3xl mb-6 text-4xl xl:mb-0 font-CarterOne">
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
