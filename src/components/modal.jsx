import React from "react"
import { Fragment, useRef, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useQuery } from "@apollo/client"
import { Cars } from "../gql/carsByIdQuery"
import { Link } from "gatsby"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

export default function OpenModal({ carId, pageContext }) {
  const [isOpen, setIsOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const {
    data: carsById,
    loading: carsByIdQueryLoading,
    error: carsByIdQueryError,
  } = useQuery(Cars, {
    variables: { internalId: carId, locale: ["en"] },
  })
  if (carsByIdQueryLoading) return <p>Loading...</p>
  if (carsByIdQueryError) return <p>Error : {carsByIdQueryError.message}</p>

  const car = carsById.cars[0]

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="bg-[#0833a2] text-white py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg"
        >
          More Information
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-11/12 p-6 overflow-hidden text-left align-middle transition-all transform bg-[#e0e0e0] shadow-xl rounded-2xl"
                  id="modalOfCar"
                >
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="mt-3 text-4xl font-medium leading-6 text-gray-900 font-CarterOne"
                    >
                      {car.carName}
                    </Dialog.Title>
                    <button
                      type="button"
                      ref={cancelButtonRef}
                      className="inline-flex justify-center w-full p-1 text-base font-medium text-red-600 border border-transparent rounded-md shadow-sm bg-white-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex mt-12">
                    <div className="mr-28">
                      <ReactMarkdown>{car.carDetails[0]}</ReactMarkdown>
                    </div>
                    <table>
                      <thead>
                        <tr className="text-xl">
                          <th>Season</th>
                          <th>Dates</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {car.pricesOfCar.map((price, priceIndex) => (
                          <tr key={priceIndex}>
                            <td className="p-[0.5rem_2.5rem_0.5rem_0]">
                              {price.season.seasonTitle}
                            </td>
                            <td className="p-[0.5rem_2.5rem_0.5rem_0]">
                              {price.season.startDate} | {price.season.endDate}
                            </td>
                            <td>${price.priceOfCar}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <section className="mt-16 mb-10 md:grid lg:gap-10 lg:grid-cols-[1fr_1fr_1fr] lg:grid-rows-[1fr]">
                    {/* Incluye la imagen principal junto con las demás imágenes */}
                    {[car.carMainPhoto, ...car.carPhotos].map(
                      (photo, index) => (
                        <img
                          key={index}
                          src={photo.url}
                          alt={`Car Photo ${index + 1}`}
                        />
                      )
                    )}
                  </section>

                  <div className="flex justify-center">
                    {/* Agrega un botón para ir al formulario */}
                    <Link
                      // to={`/formulario/${carId}`} // URL dinámica que incluye el carId
                      to={
                        pageContext.langKey === "en"
                          ? `/quote/${car.carName}`
                          : `/${pageContext.langKey}/cotizar/`
                      } // URL dinámica que incluye el carId
                      className="bg-[#0833a2] text-white py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
