import React from "react"
import { Fragment, useRef, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useApolloClient, useQuery } from "@apollo/client"
import { Cars } from "../gql/carsByIdQuery"
import { Link } from "gatsby"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { setDatos } from "./variableReactiva"
import { navigate } from "gatsby"
import he from "he" // Importar la biblioteca para desescapar HTML

export default function OpenModal({ carId, pageContext }) {
  const client = useApolloClient()
  const [isOpen, setIsOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const [selectedTransmission, setSelectedTransmission] = useState("")

  const {
    data: carsById,
    loading: carsByIdQueryLoading,
    error: carsByIdQueryError,
  } = useQuery(Cars, {
    variables: { internalId: carId, locale: [pageContext.langKey] },
  })
  client.refetchQueries({
    include: [Cars],
  })
  const [answerState, setAnswerState] = useState(false)

  const toggleAnswerVisibility = () => {
    setAnswerState(!answerState)
  }

  if (carsByIdQueryLoading) return <p>Loading...</p>
  if (carsByIdQueryError) return <p>Error : {carsByIdQueryError.message}</p>

  const car = carsById.cars[0]

  const formatDate = dateString => {
    const date = new Date(dateString)
    const options = { year: "numeric", month: "short", day: "numeric" }
    return date.toLocaleDateString(pageContext.langKey, options)
  }
  // Tu lógica para obtener datos
  const datos = car.id

  setDatos(car.id)
  // console.log(car.carDetails[0].markdown)

  const handleTransmissionChange = event => {
    setSelectedTransmission(event.target.value)
  }

  const handleButtonClick = () => {
    // Obtener las transmisiones disponibles
    const automaticTransmissionValue =
      car.automaticTransmission?.carTransmissionSelectorValue
    const manualTransmissionValue =
      car.manualTransmission?.carTransmissionSelectorValue

    console.log(
      "Valor de automaticTransmissionValue:",
      automaticTransmissionValue
    )
    console.log("Valor de manualTransmissionValue:", manualTransmissionValue)

    // Agregar el valor de la transmisión al objeto datos
    const datosConTransmision = {
      ...datos, // Copiar los datos existentes
      selectedTransmission:
        manualTransmissionValue !== undefined &&
        manualTransmissionValue !== null
          ? manualTransmissionValue
          : automaticTransmissionValue !== undefined
          ? automaticTransmissionValue
          : "",
    }

    // Realizar la navegación con el nuevo objeto datos
    console.log(datosConTransmision)
    navigate(
      pageContext.langKey === "en"
        ? `/${car.carQuoteForm.slug}`
        : `/${pageContext.langKey || ""}/${car.carQuoteForm.slug}`,
      { state: { datos: datosConTransmision } }
    )
  }

  return (
    <>
      <div className="flex items-center justify-center 2xl:col-[2/3] 2xl:row-[2/3]">
        <button
          type="button"
          onClick={openModal}
          className="bg-[#0833a2] text-white py-5 px-16 mt-4 hover:bg-blue-800 rounded-lg font-semibold text-lg"
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
                      {/* <div className="w-full overflow-x-auto">
                        <table className="w-full border border-solid border-[#ccc] border-collapse m-0 p-0 table-fixed max-sm:border-0">
                          <caption className="mb-3 m-[5px_0_10px] text-xl font-semibold max-sm:text-sm">
                            Statement Summary
                          </caption>
                          <thead className="max-sm:absolute max-sm:w-1 max-sm:h-1 max-sm:p-0 max-sm:-m-1 max-sm:overflow-hidden max-sm:border-0">
                            <tr className="max-sm:block max-sm:border-b-4 max-sm:border-solid max-sm:border-b-[#ddd] bg-gray-200 border-[#ddd] border-solid border p-3">
                              <th className="p-2 text-xs tracking-widest text-center uppercase">
                                Account
                              </th>
                              <th className="p-2 text-xs tracking-widest text-center uppercase">
                                Due Date
                              </th>
                              <th className="p-2 text-xs tracking-widest text-center uppercase">
                                Amount
                              </th>
                              <th className="p-2 text-xs tracking-widest text-center uppercase">
                                Period
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="max-sm:block max-sm:border-b-4 max-sm:border-solid max-sm:border-b-[#ddd] bg-gray-100">
                              <td
                                scope="row"
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Account"
                              >
                                Visa - 3412
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Due Date"
                              >
                                04/01/2016
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Amount"
                              >
                                $1,190
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Period"
                              >
                                03/01/2016 - 03/31/2016
                              </td>
                            </tr>
                            <tr className="max-sm:block max-sm:border-b-4 max-sm:border-solid max-sm:border-b-[#ddd] bg-gray-100">
                              <td
                                scope="row"
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Account"
                              >
                                Visa - 6076
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Due Date"
                              >
                                03/01/2016
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Amount"
                              >
                                $2,443
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Period"
                              >
                                02/01/2016 - 02/29/2016
                              </td>
                            </tr>
                            <tr className="max-sm:block max-sm:border-b-4 max-sm:border-solid max-sm:border-b-[#ddd] bg-gray-100">
                              <td
                                scope="row"
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Account"
                              >
                                Corporate AMEX
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Due Date"
                              >
                                03/01/2016
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Amount"
                              >
                                $1,181
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Period"
                              >
                                02/01/2016 - 02/29/2016
                              </td>
                            </tr>
                            <tr className="max-sm:block max-sm:border-b-4 max-sm:border-solid max-sm:border-b-[#ddd] bg-gray-100">
                              <td
                                scope="row"
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Account"
                              >
                                Visa - 3412
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Due Date"
                              >
                                02/01/2016
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Amount"
                              >
                                $842
                              </td>
                              <td
                                className="max-sm:block max-sm:border-b-2 max-sm:text-right p-2 max-sm:before:content-[attr(data-label)] max-sm:before:float-left max-sm:before:font-bold max-sm:before:uppercase sm:text-center"
                                data-label="Period"
                              >
                                01/01/2016 - 01/31/2016
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div> */}
                      <table className="w-full whitespace-nowrap sm:w-auto sm:table-auto">
                        <thead>
                          <tr className="text-xl">
                            <th className="p-2">
                              {car.carsAndQuote.seasonTitle}
                            </th>
                            <th className="p-2">
                              {car.carsAndQuote.datesTitle}
                            </th>
                            <th className="p-2">
                              {car.carsAndQuote.priceTitleManual}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {car.manualTransmission?.priceOfCar?.length > 0
                            ? car.manualTransmission.priceOfCar.map(
                                (price, priceIndex) => (
                                  <tr key={priceIndex}>
                                    <td className="p-2">
                                      {price.season.seasonTitle}
                                    </td>
                                    <td className="p-2">
                                      {formatDate(price.season.startDate)} |{" "}
                                      {formatDate(price.season.endDate)}
                                    </td>
                                    <td className="flex justify-center">
                                      {price.priceOfCar !== 0 ? (
                                        <>${price.priceOfCar}</>
                                      ) : (
                                        price.unsetPriceMessage?.html && (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: he.decode(
                                                price.unsetPriceMessage.html
                                              ),
                                            }}
                                          />
                                        )
                                      )}
                                    </td>
                                  </tr>
                                )
                              )
                            : car.automaticTransmission?.priceOfCar?.map(
                                (price, priceIndex) => (
                                  <tr key={priceIndex}>
                                    <td className="p-2">
                                      {price.season?.seasonTitle}
                                    </td>
                                    <td className="p-2">
                                      {formatDate(price.season?.startDate)} |{" "}
                                      {formatDate(price.season?.endDate)}
                                    </td>
                                    <td className="p-2">
                                      ${price.priceOfCar}
                                      {price.unsetPriceMessage?.html && (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: he.decode(
                                              price.unsetPriceMessage.html
                                            ),
                                          }}
                                        />
                                      )}
                                    </td>
                                  </tr>
                                )
                              )}
                        </tbody>
                      </table>
                      {car.manualTransmission?.priceOfCar?.length > 0 &&
                        car.automaticTransmission?.priceOfCar?.length > 0 && (
                          <table className="w-full whitespace-nowrap sm:w-auto sm:table-auto">
                            <thead>
                              <tr className="text-xl">
                                <th className="p-2">
                                  {car.carsAndQuote?.priceTitleAutomatic}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {car.automaticTransmission?.priceOfCar?.map(
                                (price, priceIndex) => (
                                  <tr key={priceIndex}>
                                    <td className="text-center">
                                      ${price.priceOfCar}
                                      {price.unsetPriceMessage?.html && (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: he.decode(
                                              price.unsetPriceMessage.html
                                            ),
                                          }}
                                        />
                                      )}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        )}
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
                              className={`h-4 w-4 text-black transition-transform ${
                                answerState ? "rotate-180" : ""
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
                                className={`h-3 w-3 mr-2 text-black transition-transform ${
                                  answerState ? "rotate-180" : ""
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
                          src={photo.url}
                          alt={`Car Photo ${index + 1}`}
                        />
                      )
                    )}
                  </section>

                  <div>
                    {/* Botón de redirección */}
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={handleButtonClick}
                        className="bg-[#0833a2] text-white py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg"
                        // disabled={
                        //   car.automaticTransmission
                        //     ?.carTransmissionSelectorValue !== null &&
                        //   car.automaticTransmission
                        //     ?.carTransmissionSelectorValue !== undefined &&
                        //   car.manualTransmission
                        //     ?.carTransmissionSelectorValue !== null &&
                        //   car.manualTransmission
                        //     ?.carTransmissionSelectorValue !== undefined &&
                        //   selectedTransmission === ""
                        // }
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
