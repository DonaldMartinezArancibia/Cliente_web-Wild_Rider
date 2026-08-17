import React from "react"
import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import ReactMarkdown from "react-markdown"
import { navigate } from "gatsby"
import { localePath } from "../lib/routes"
import { useCarData } from "../hooks/useCarData"
import PriceTable from "./ui/PriceTable"

export default function OpenModal({ carId, pageContext }) {
  const [isOpen, setIsOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const { car, statusElement } = useCarData(pageContext, carId)
  const [answerState, setAnswerState] = useState(false)

  const toggleAnswerVisibility = () => {
    setAnswerState(!answerState)
  }

  if (statusElement) return statusElement

  const formatDate = dateString => {
    const date = new Date(dateString)
    const options = { year: "numeric", month: "short", day: "numeric" }
    return date.toLocaleDateString(pageContext.langKey, options)
  }

  const handleButtonClick = () => {
    // Obtener las transmisiones disponibles
    const automaticTransmissionValue =
      car.automaticTransmission?.carTransmissionSelectorValue
    const manualTransmissionValue =
      car.manualTransmission?.carTransmissionSelectorValue

    const selectedTransmission =
      manualTransmissionValue !== undefined && manualTransmissionValue !== null
        ? manualTransmissionValue
        : automaticTransmissionValue !== undefined
          ? automaticTransmissionValue
          : ""

    navigate(localePath(pageContext.langKey, car.carQuoteForm.slug), {
      state: { carId: car.id, selectedTransmission },
    })
  }

  return (
    <>
      <div className="flex items-center justify-center 2xl:col-[2/3] 2xl:row-[2/3]">
        <button
          type="button"
          onClick={openModal}
          className="bg-brand-blue text-white py-5 px-16 mt-4 hover:bg-blue-800 rounded-lg font-semibold text-lg"
        >
          {car.carsAndQuote.carsInformationButtonText}
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
                  className="xl:w-11/12 p-6 overflow-hidden text-left align-middle transition-all transform bg-[#e0e0e0] shadow-xl rounded-2xl"
                  id="modalOfCar"
                >
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-4xl font-medium text-gray-900 xl:mt-3 xl:leading-6 font-CarterOne"
                    >
                      {car.carName}
                    </Dialog.Title>
                    <button
                      type="button"
                      ref={cancelButtonRef}
                      className="justify-center p-1 text-base font-medium text-red-600 border border-transparent rounded-md shadow-sm 2xl:inline-flex bg-white-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  {car.insuranceAndTaxInfo !== undefined && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 rounded-md gap-x-2 bg-blue-50 mt-7 ring-1 ring-inset ring-blue-700/10">
                      <svg
                        className="w-2 fill-[#3b82f6]"
                        viewBox="0 0 6 6"
                        aria-hidden="true"
                      >
                        <circle cx="3" cy="3" r="3"></circle>
                      </svg>
                      {car.insuranceAndTaxInfo}
                    </span>
                  )}

                  <div className="flex flex-col mt-4 xl:flex-row 2xl:mt-4">
                    <div className="overflow-x-auto xl:w-[50%] flex">
                      <PriceTable
                        carsAndQuote={car.carsAndQuote}
                        manualTransmission={car.manualTransmission}
                        automaticTransmission={car.automaticTransmission}
                        formatDate={formatDate}
                        locale={pageContext.langKey}
                      />
                    </div>
                    <div className="xl:w-3/5 2xl:mr-2">
                      <div className="mb-10 lg:w-full">
                        <h3
                          onClick={toggleAnswerVisibility}
                          className="p-4 relative bg-white border-[2.9px] border-[#979797] rounded-2xl cursor-pointer z-10"
                        >
                          <p>{car.carDetailsTitle}</p>
                          <span className="absolute top-6 right-7">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 text-black transition-transform ${answerState ? "rotate-180" : ""
                                }`}
                              viewBox="0 0 512 512"
                              fill="currentColor"
                            >
                              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                          </span>
                        </h3>
                        {answerState && (
                          <div className="relative">
                            <p className="bg-white p-4 pt-8 pb-20 border-[1px] border-[#979797] drop-shadow-[1px_0px_3px_rgba(80,80,80)] rounded-xl m-[0_0_-12px] relative bottom-3 z-0">
                              <ReactMarkdown>
                                {car.carDetails[0]?.markdown}
                              </ReactMarkdown>
                            </p>
                            {/* Botón "Mostrar menos" como elemento hermano del párrafo */}
                            <button
                              onClick={toggleAnswerVisibility}
                              className="right-[44%] text-primary hover:underline cursor-pointer absolute bottom-10 md:right[55%] lg:right-1/2 z-10 flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-3 w-3 mr-2 text-black transition-transform ${answerState ? "rotate-180" : ""
                                  }`}
                                viewBox="0 0 512 512"
                                fill="currentColor"
                              >
                                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                              </svg>
                              Show less
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <section className="2xl:mt-10 mb-10 sm:grid sm:grid-cols-[1fr_1fr] sm:gap-4 lg:gap-10 lg:grid-cols-[1fr_1fr_1fr] lg:grid-rows-[1fr]">
                    {/* Incluye la imagen principal junto con las demás imágenes */}
                    {[car.carMainPhoto, ...car.carPhotos].map(
                      (photo, index) => (
                        <img
                          key={index}
                          src={photo?.url}
                          alt={photo?.altText}
                        />
                      )
                    )}
                  </section>

                  <div>
                    {/* Botón de redirección */}
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={handleButtonClick}
                        className="bg-brand-blue text-white py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg"

                      >
                        {car.carsAndQuote.quoteButtonText}
                      </button>
                    </div>
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
