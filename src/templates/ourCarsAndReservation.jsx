import React from "react"
import { Car } from "../gql/carsQuery"
import { CarContent } from "../gql/carsPageQuery"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import OpenModal from "../components/carInfoModal"
import StickyBar from "../components/ui/StickyBar"

const OurCarsAndReservation = ({ pageContext }) => {
  const carsQuery = useLocalizedQuery(Car, pageContext)
  const pageQuery = useLocalizedQuery(CarContent, pageContext)

  const statusElement = carsQuery.statusElement ?? pageQuery.statusElement
  if (statusElement) return statusElement

  const cars = carsQuery.data?.cars ?? []
  const carsPage = pageQuery.data?.carsAndQuotes?.[0] ?? {}

  return (
    <main className="py-8 hero-surface hero-surface-low">
      <StickyBar pageContext={pageContext} />

      <h1 className="p-4 mb-10 font-CarterOne lg:text-5xl xl:p-14">
        {carsPage.title}
      </h1>

      <section className="p-[10px_10px_10px] sm:grid sm:grid-cols-[1fr_1fr] sm:grid-rows-[1fr] md:gap-10 xl:gap-28 xl:p-14">
        {cars.map(item => (
          <article key={item.id} className="mb-10 md:mb-0">
            {item.longTermRentalTitle != null && (
              <div className="flex flex-col items-center justify-center p-4 bg-yellow-200 rounded-lg sm:flex-row">
                <i
                  className={`text-2xl mr-2 text-[#ca8a04] ${carsPage.iconOfLongTermRental}`}
                ></i>
                <p className="text-yellow-700">{item.longTermRentalTitle}</p>
              </div>
            )}

            <img
              className="m-auto w-11/12 md:w-auto lg:h-[355px]"
              src={item.carMainPhoto?.url}
              alt={item.carMainPhoto?.altText}
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

export default OurCarsAndReservation
