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
            {item.longTermRentalTitle !== null &&
              item.longTermRentalTitle !== undefined && (
                <div className="flex flex-col items-center justify-center p-4 bg-yellow-200 rounded-lg sm:flex-row">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 512 512"
                    fill="#ca8a04"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-2 text-yellow-900"
                  >
                    <path d="M248.4 84.3c1.6-2.7 4.5-4.3 7.6-4.3s6 1.6 7.6 4.3L461.9 410c1.4 2.3 2.1 4.9 2.1 7.5c0 8-6.5 14.5-14.5 14.5H62.5c-8 0-14.5-6.5-14.5-14.5c0-2.7 .7-5.3 2.1-7.5L248.4 84.3zm-41-25L9.1 385c-6 9.8-9.1 21-9.1 32.5C0 452 28 480 62.5 480h387c34.5 0 62.5-28 62.5-62.5c0-11.5-3.2-22.7-9.1-32.5L304.6 59.3C294.3 42.4 275.9 32 256 32s-38.3 10.4-48.6 27.3zM288 368a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-8-184c0-13.3-10.7-24-24-24s-24 10.7-24 24v96c0 13.3 10.7 24 24 24s24-10.7 24-24V184z" />
                  </svg>
                  <p className="text-yellow-700">{item.longTermRentalTitle}</p>
                </div>
              )}

            <img
              className="m-auto w-11/12 md:w-auto lg:h-[355px]"
              src={item.carMainPhoto.url}
            />
            <div className="flex flex-col items-center justify-between py-4 2xl:grid 2xl:grid-cols-2">
              <h2 className="max-w-3xl mb-4 text-4xl 2xl:mb-0 font-CarterOne 2xl:col-[1/2] 2xl:row-[2/3]">
                {item.carName}
              </h2>
              <p className="m-auto text-lg font-semibold">
                {item.yearOfCarTitle && item.yearOfCarValue
                  ? `${item.yearOfCarTitle} : ${item.yearOfCarValue}`
                  : null}
              </p>
              <p className="m-auto text-lg font-semibold">
                {item.passengersTitle && item.passengersOfCarValue
                  ? `${item.passengersTitle} : ${item.passengersOfCarValue}`
                  : null}
              </p>
              <OpenModal pageContext={pageContext} carId={item.id} />
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
