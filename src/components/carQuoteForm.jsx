import React, { useState, useEffect, useMemo, useRef } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import mailcheck from "mailcheck"
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import countryList from "react-select-country-list"
import "flatpickr/dist/themes/airbnb.css"
import Flatpickr from "react-flatpickr"
import { datosVar } from "./variableReactiva"
import { useApolloClient, useQuery } from "@apollo/client"
import { CarQuoteFormContent } from "../gql/carQuotePageQuery"

const CarFormHtml = ({ apolloData, pageContext }) => {
  const client = useApolloClient()

  const {
    data: CarQuoteFormData,
    loading: CarQuoteFormQueryLoading,
    error: CarQuoteFormQueryError,
  } = useQuery(CarQuoteFormContent, {
    variables: {
      locale: [pageContext.pageContext.langKey],
    },
  })
  client.refetchQueries({
    include: [CarQuoteFormContent],
  })

  // console.log(pageContext.pageContext.langKey)
  const datos = apolloData
  // console.log(datos)
  // console.log(datosVar())
  // const { carName, remoteId } = pageContext
  const carsById = apolloData.cars[0]
  // console.log(carsById)
  // const { carsById } = apolloData.apolloData.carsById

  const [phone, setPhone] = useState("")

  const [value, setValue] = useState("")
  const [formError, setFormError] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submissionError, setSubmissionError] = useState(null)

  const formRef = useRef(null)

  const [startDate, setStartDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())

  const handleTimeChange = (selectedTime, setState) => {
    if (selectedTime && selectedTime.length > 0) {
      setState(selectedTime[0])
    }
  }

  const [selectedCountry, setSelectedCountry] = useState("")

  const handleCountryChange = e => {
    setSelectedCountry(e.target.value)
  }

  const countryOptions = [
    "Mexico",
    "Colombia",
    "Argentina",
    "Canada",
    // ... otros países
  ]

  const changeHandler = e => {
    setValue(e.target.value)
  }

  const [endDate, setEndDate] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())

  const handleDateChange = (selectedDate, setState) => {
    if (selectedDate && selectedDate.length > 0) {
      setState(selectedDate[0])
    }
  }

  const [email, setEmail] = useState("")
  const [emailConfirm, setEmailConfirm] = useState("")
  const [suggestion, setSuggestion] = useState(null)
  const [suggestionConfirm, setSuggestionConfirm] = useState(null)

  useEffect(() => {
    mailcheck.run({
      email: email,
      suggested(s) {
        setSuggestion(s.full)
      },
      empty() {
        setSuggestion(null)
      },
    })
  }, [email])

  useEffect(() => {
    mailcheck.run({
      email: emailConfirm,
      suggested(s) {
        setSuggestionConfirm(s.full)
      },
      empty() {
        setSuggestionConfirm(null)
      },
    })
  }, [emailConfirm])

  const handleChange = (e, setEmailFunc, setSuggestionFunc) => {
    const newValue = e.currentTarget.value
    setEmailFunc(newValue)

    // Run mailcheck for suggestions
    mailcheck.run({
      email: newValue,
      suggested(s) {
        setSuggestionFunc(s.full)
      },
      empty() {
        setSuggestionFunc(null)
      },
    })
  }

  const acceptSuggestion = (suggestion, setEmailFunc) => {
    if (suggestion != null) setEmailFunc(suggestion)
  }
  const formatDate = dateString => {
    const date = new Date(dateString)
    const options = { year: "numeric", month: "short", day: "numeric" }
    return date.toLocaleDateString(pageContext.pageContext.langKey, options)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setFormError(null)
    setSubmissionError(null)

    const form = e.target

    // Verificar que 'form.email' y 'form.emailConfirm' no sean undefined
    if (!form.email || !form.emailConfirm) {
      // Si aún no se han llenado los campos, simplemente regresa sin hacer nada
      return
    }

    // Validación personalizada solo si ambos campos están llenos
    const email = form.email.value.trim()
    const emailConfirm = form.emailConfirm.value.trim()

    if (email === "" || emailConfirm === "") {
      setFormError("Email or Email Confirm element is empty.")
      return
    }

    if (email !== emailConfirm) {
      setFormError("Email and Confirm Email must match.")
      return
    }

    // Resto del código para enviar la solicitud
    const formData = new FormData(form)
    fetch("/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        setFormSubmitted(true)
      })
      .then(data => {
        console.log("Formulario enviado con éxito:", data)
      })
      .catch(error => {
        setSubmissionError(`Error submitting form: ${error.message}`)
      })

    // Limpiar errores después de enviar el formulario con éxito
    setFormError(null)
    // Resto del código para manejar la respuesta del envío
  }

  if (CarQuoteFormQueryLoading) return <p>Loading...</p>
  if (CarQuoteFormQueryError)
    return <p>Error : {CarQuoteFormQueryError.message}</p>

  // console.log(CarQuoteFormData.carQuoteForms[0])
  const pageData = CarQuoteFormData.carQuoteForms[0]

  //   const {
  //     data: carsById,
  //     loading: carsByIdQueryLoading,
  //     error: carsByIdQueryError,
  //   } = useQuery(Cars, {
  //     variables: { internalId: remoteId, locale: ["en"] },
  //   })
  //   if (carsByIdQueryLoading) return <p>Loading...</p>
  //   if (carsByIdQueryError) return <p>Error : {carsByIdQueryError.message}</p>

  return (
    <main className="p-3 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%] lg:p-14">
      <h1 className="mb-10 font-CarterOne lg:text-5xl">{pageData.title}</h1>
      <p className="font-bold">
        Your Car: <span className="font-normal">{carsById.carName}</span>
      </p>
      <div className="mb-10 md:ml-16 md:flex lg:ml-0">
        <p className="2xl:w-1/5">
          <ReactMarkdown>{pageData.welcomeText?.markdown}</ReactMarkdown>
        </p>
        <div className="flex flex-col xl:flex-row">
          <div className="overflow-x-auto flex">
            <table className="w-full whitespace-nowrap sm:w-auto sm:table-auto">
              <thead>
                <tr className="text-xl">
                  <th className="p-2">{carsById.carsAndQuote.seasonTitle}</th>
                  <th className="p-2">{carsById.carsAndQuote.datesTitle}</th>
                  <th className="p-2">{carsById.carsAndQuote.priceTitle}</th>
                </tr>
              </thead>
              <tbody>
                {carsById.pricesOfCar.map((price, priceIndex) => (
                  <tr key={priceIndex}>
                    <td className="p-2">{price.season.seasonTitle}</td>
                    <td className="p-2">
                      {formatDate(price.season.startDate)}
                      {" | "}
                      {formatDate(price.season.endDate)}
                    </td>
                    <td className="p-2">${price.priceOfCar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="w-full whitespace-nowrap sm:w-auto sm:table-auto">
              <thead>
                <tr className="text-xl">
                  <th className="p-2">
                    {carsById.transmissionVariant?.transmissionPriceTitle}
                  </th>
                </tr>
              </thead>
              <tbody>
                {carsById.transmissionVariant?.priceOfCar?.map(
                  (price, priceIndex) => (
                    <tr key={priceIndex}>
                      <td>${price.priceOfCar}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <img
          src={carsById.carMainPhoto.url}
          className="w-full mr-10 lg:w-1/3"
        />
      </div>

      <form
        // ref={formRef}
        name="carquote"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="font-Poppins md:grid md:grid-cols-[1fr_1fr] md:grid-rows-[1fr] md:gap-x-4 md:gap-y-2 lg:grid-cols-1 lg:my-5"
        onSubmit={handleSubmit}
      >
        {/* You still need to add the hidden input with the form name to your JSX form */}
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <input type="hidden" name="form-name" value="carquote" />
        <fieldset
          className="flex flex-col mb-10 md:row-span-2 md:w-1/2"
          role="group"
          aria-label="Datos personales"
        >
          <legend className="mb-5 text-3xl font-semibold">
            {pageData.basicInformationTitle}
          </legend>
          <div className="flex flex-col md:justify-between">
            <div className="w-full pr-3">
              <label htmlFor="name" className="w-full text-xl font-black">
                {pageData.completeNameField}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full h-10 my-2"
                required
              />
            </div>
            <div>
              <div className="flex flex-col justify-between pr-3">
                <label
                  htmlFor="email"
                  className="w-full my-2 text-xl font-black"
                >
                  {pageData.emailField}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full h-10"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => handleChange(e, setEmail, setSuggestion)}
                />
                {suggestion && (
                  <div>
                    Did you mean{" "}
                    <a
                      href=""
                      onClick={e => {
                        e.preventDefault()
                        acceptSuggestion(suggestion, setEmail)
                      }}
                    >
                      {suggestion}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between pr-3">
                <label
                  htmlFor="emailConfirm"
                  className="w-full my-2 text-xl font-black"
                >
                  {pageData.confirmEmailField}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full h-10"
                  type="email"
                  id="emailConfirm"
                  name="emailConfirm"
                  value={emailConfirm}
                  onChange={e =>
                    handleChange(e, setEmailConfirm, setSuggestionConfirm)
                  }
                />
                {suggestionConfirm && (
                  <div>
                    Did you mean{" "}
                    <a
                      href=""
                      onClick={e => {
                        e.preventDefault()
                        acceptSuggestion(suggestionConfirm, setEmailConfirm)
                      }}
                    >
                      {suggestionConfirm}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between pr-3">
              <label
                htmlFor="phoneNumber"
                className="w-full my-2 text-xl font-black"
              >
                {pageData.phoneNumberField}
              </label>
              <PhoneInput
                defaultCountry="us"
                value={phone}
                onChange={phone => setPhone(phone)}
                inputStyle={{ width: "100%", borderRadius: "0" }}
                inputProps={{
                  name: "phoneNumber",
                  type: "tel",
                  id: "phoneNumber",
                }}
                className="w-full h-10"
              />
            </div>
            <div className="flex flex-col justify-between pr-3">
              <label
                htmlFor="country"
                className="w-full my-2 text-xl font-black"
              >
                {pageData.countryResidenceField}
              </label>
              <select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-full h-10"
                name="countrySelection"
              >
                {pageData.countriesOptions.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col justify-between pr-3">
            <label
              htmlFor="numberOfTravelers"
              className="w-full my-2 text-xl font-black"
            >
              {pageData.numberOfTravelersField}
              <span className="text-red-500">*</span>{" "}
            </label>
            <select
              id="numberOfTravelers"
              name="numberOfTravelers"
              required
              className="w-full h-10"
            >
              {pageData.numberOfTravelersOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="flex flex-col justify-between pr-3 mb-6">
            <label
              htmlFor="vehicleSelection"
              className="w-full my-2 text-xl font-black"
            >
              Vehicle selection <span className="text-red-500">*</span>
            </label>
            <select
              id="vehicleSelection"
              name="vehicleSelection"
              className="w-full h-10"
              required
            >
              <option value="Suzuki Jimny with Manual Transmission">
                Suzuki Jimny with Manual Transmission
              </option>
              <option value="Daihatsu Bego with Manual Transmission">
                Daihatsu Bego with Manual Transmission
              </option>
              <option value="Daihatsu Bego with Automatic Transmission">
                Daihatsu Bego with Automatic Transmission
              </option>
              <option value="Hyundai Tucson with Manual Transmission">
                Hyundai Tucson with Manual Transmission
              </option>
              <option value="Hyundai Tucson with Automatic Transmission">
                Hyundai Tucson with Automatic Transmission
              </option>
              <option value="Toyota RAV4 with Manual Transmission">
                Toyota RAV4 with Manual Transmission
              </option>
              <option value="Toyota RAV4 with Automatic Transmission">
                Toyota RAV4 with Automatic Transmission
              </option>
              <option value="Suzuki Jimny with Manual T. 2023 Model">
                Suzuki Jimny with Manual T. 2023 Model
              </option>
              <option value="Toyota RAV4 with Automatic T. 2023 Model">
                Toyota RAV4 with Automatic T. 2023 Model
              </option>
              <option value="Renault Koleos with Automatic T. 2024 Model">
                Renault Koleos with Automatic T. 2024 Model
              </option>
            </select>
          </div> */}
        </fieldset>

        <fieldset
          className="grid grid-cols-2 mb-10 md:w-1/2"
          role="group"
          aria-label="Detalles del Viaje"
        >
          <legend className="mb-5 text-3xl font-semibold">
            {pageData.pickUpInformationTitle}
          </legend>
          <div className="flex flex-col justify-between pr-3">
            <label
              htmlFor="startDate"
              className="w-full my-2 text-xl font-black"
            >
              {pageData.takeoverDateField}
              <span className="text-red-500">*</span>
            </label>
            <Flatpickr
              options={{
                dateFormat: "F d, Y",
                minDate: "today",
              }}
              value={startDate}
              onChange={selectedDate =>
                handleDateChange(selectedDate, setStartDate)
              }
              name="StartDate"
              id="startDate"
              className="w-full h-10 px-4 py-2"
            />
            <sub className="mt-2 text-sm text-gray-500">
              {pageData.subtextOfTakeoverDate}
            </sub>
          </div>
          <div className="flex flex-col justify-between pr-3">
            <label
              htmlFor="startTime"
              className="w-full my-2 text-xl font-black"
            >
              {pageData.takeoverHourField}
            </label>
            <Flatpickr
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
                minTime: "6:00",
                maxTime: "19:00",
              }}
              value={startTime}
              onChange={selectedTime =>
                handleTimeChange(selectedTime, setStartTime)
              }
              name="StartTime"
              id="startTime"
              className="w-full h-10 px-4 py-2"
            />
            <sub className="mt-2 text-sm text-gray-500">
              {pageData.subtextOfTakeoverHour}
            </sub>
          </div>
          <div className="col-[1/3] justify-between pr-3">
            <div className="mb-6">
              <label
                htmlFor="takeoverPlace"
                className="block my-2 text-xl font-semibold"
              >
                {pageData.takeoverPlaceField}
                <span className="text-red-500">*</span>
              </label>
              <select
                id="takeoverPlace"
                name="takeoverPlace"
                className="w-full h-10"
                required
              >
                {pageData.takeoverPlaceOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset
          className="grid grid-cols-2 mb-10 lg:w-1/2"
          role="group"
          aria-label="Detalles del Viaje"
        >
          <legend className="mb-5 text-3xl font-semibold">
            {pageData.dropOffInformationTitle}
          </legend>
          <div className="flex flex-col justify-between pr-3">
            <label
              htmlFor="selectedDate"
              className="w-full my-2 text-xl font-black"
            >
              {pageData.returnDateField}
              <span className="text-red-500">*</span>
            </label>
            <Flatpickr
              options={{
                dateFormat: "F d, Y",
                minDate: "today",
              }}
              value={endDate}
              onChange={selectedDate =>
                handleDateChange(selectedDate, setEndDate)
              }
              name="EndDate"
              id="endDate"
              className="w-full h-10 px-4 py-2"
            />
            <sub className="mt-2 text-sm text-gray-500">
              {pageData.subtextOfReturnDate}
            </sub>
          </div>
          <div className="flex flex-col justify-between pr-3">
            <label
              htmlFor="selectedTime"
              className="w-full my-2 text-xl font-black"
            >
              {pageData.returnHourField}
            </label>
            <Flatpickr
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
                minTime: "6:00",
                maxTime: "19:00",
              }}
              value={endTime}
              onChange={selectedTime =>
                handleTimeChange(selectedTime, setEndTime)
              }
              name="EndTime"
              id="endTime"
              className="w-full h-10 px-4 py-2"
            />
            <sub className="mt-2 text-sm text-gray-500">
              {pageData.subtextOfReturnHour}
            </sub>
          </div>
          <div className="col-[1/3] justify-between pr-3">
            <div className="mb-6">
              <label
                htmlFor="returnPlace"
                className="block my-2 text-xl font-semibold"
              >
                {pageData.returnPlaceField}
                <span className="text-red-500">*</span>
              </label>
              <select
                id="returnPlace"
                name="returnPlace"
                className="w-full h-10"
                required
              >
                {pageData.returnPlaceOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset
          className="flex flex-col mb-10 md:row-span-2"
          role="group"
          aria-label="Información de Recogida"
        >
          <legend className="mb-5 text-3xl font-semibold">
            Free additional services *
          </legend>
          <div className="mb-6">
            <label className="block text-xl font-semibold">Services</label>
            <ul>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="secondDriver"
                  name="secondDriver"
                  value="YES"
                />
                <label className="ml-2" htmlFor="secondDriver">
                  Second driver (must be over 25 years old)
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="roofRack"
                  name="roofRack"
                  value="YES"
                />
                <label className="ml-2" htmlFor="roofRack">
                  Roof rack (consisting of 2 cross braces for surfboard or kayak
                  transport)
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="childSeats"
                  name="childSeats"
                  value="YES"
                />
                <label className="ml-2" htmlFor="childSeats">
                  Child seats (different sizes)
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="seatElevations"
                  name="seatElevations"
                  value="YES"
                />
                <label className="ml-2" htmlFor="seatElevations">
                  Seat elevations/Booster Seat
                </label>
              </li>
              <li className="mb-2">
                <input type="checkbox" id="cooler" name="cooler" value="YES" />
                <label className="ml-2" htmlFor="cooler">
                  Cooler
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="beachChairs"
                  name="beachChairs"
                  value="YES"
                />
                <label className="ml-2" htmlFor="beachChairs">
                  Beach chairs
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="phoneHolder"
                  name="phoneHolder"
                  value="YES"
                />
                <label className="ml-2" htmlFor="phoneHolder">
                  Phone holder
                </label>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <label className="block my-2 text-xl font-semibold">
              Select the quantity of child seats you will need
            </label>
            <select
              className="w-full p-2 border border-gray-300"
              id="childSeatsQuantity"
              name="childSeatsQuantity"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="md:w-1/2">
            <label className="block my-2 text-xl font-semibold">
              Select the seat elevations/Booster Seat that you will need
            </label>
            <select
              className="w-full p-2 border border-gray-300"
              id="seatElevationsQuantity"
              name="seatElevationsQuantity"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="md:w-1/2">
            <label className="block my-2 text-xl font-semibold">
              Select the quantity of beach chairs you will need
            </label>
            <select
              className="w-full p-2 border border-gray-300"
              id="beachChairsQuantity"
              name="beachChairsQuantity"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="mb-10">
          <legend className="mb-5 text-3xl font-semibold">
            Paid additional services
          </legend>
          <div className="mb-6">
            <label className="block text-xl font-semibold">Services</label>
            <ul>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="simpleSmartphone"
                  name="simpleSmartphone"
                  value="YES"
                />
                <label htmlFor="simpleSmartphone">
                  (US$ 25.-) Simple smartphone (for navigation and local phone
                  calls).
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="comprehensiveInsurance"
                  name="comprehensiveInsurance"
                  value="YES"
                />
                <label htmlFor="comprehensiveInsurance">
                  Fully comprehensive insurance without excess / Zero deductible
                  insurance /Full CDW (US$ 7.- to US$9,90.- depend on the car
                  model)
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="kolbiSIMCard"
                  name="kolbiSIMCard"
                  value="YES"
                />
                <label htmlFor="kolbiSIMCard">
                  (US$ 15.-) KOLBI SIM phone card.
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="roofBasket"
                  name="roofBasket"
                  value="YES"
                />
                <label htmlFor="roofBasket">
                  A roof basket for additional items of luggage. (US$ 5.-/day)
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="thirdDriver"
                  name="thirdDriver"
                  value="YES"
                />
                <label htmlFor="thirdDriver">Third driver (US$ 5/day)</label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="fourthDriver"
                  name="fourthDriver"
                  value="YES"
                />
                <label htmlFor="fourthDriver">Fourth driver (US$ 5/day)</label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="supplementaryInsurance"
                  name="supplementaryInsurance"
                  value="YES"
                />
                <label htmlFor="supplementaryInsurance">
                  Supplementary insurance for drivers between the ages of 21 and
                  25. (UAS$ 6.-/day)
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="pickupOrDropoffAtHotels"
                  name="pickupOrDropoffAtHotels"
                  value="YES"
                />
                <label htmlFor="pickupOrDropoffAtHotels">
                  Pick-up or drop-off at hotels; RB&amp;B outside of Alajuela or
                  San Jose. Price according to distance
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="deliveryOrCollection"
                  name="deliveryOrCollection"
                  value="YES"
                />
                <label htmlFor="deliveryOrCollection">
                  Delivery or collection at different locations countrywide.
                  Price according to distance
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-4 md:w-1/2">
            <label
              htmlFor="simpleSmartphoneQuantity"
              className="block my-2 text-xl font-semibold"
            >
              Select the quantity of simple smartphone you will need
            </label>
            <select
              id="simpleSmartphoneQuantity"
              name="simpleSmartphoneQuantity"
              className="w-full p-2 border"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-4 md:w-1/2">
            <label
              htmlFor="kolbiSIMQuantity"
              className="block my-2 text-xl font-semibold"
            >
              Select the quantity of KOLBI SIM you will need
            </label>
            <select
              id="kolbiSIMQuantity"
              name="kolbiSIMQuantity"
              className="w-full p-2 border"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-4 md:w-1/2">
            <label
              htmlFor="supplementaryInsuranceQuantity"
              className="block my-2 text-xl font-semibold"
            >
              Select the supplementary insurance you will need for drivers
              between the ages of 21 and 25
            </label>
            <select
              id="supplementaryInsuranceQuantity"
              name="supplementaryInsuranceQuantity"
              className="w-full p-2 border"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="mb-10 md:w-1/2">
          <legend className="mb-5 text-3xl font-semibold">
            Communication field
          </legend>
          <div>
            <label
              htmlFor="questions"
              className="block mb-5 text-xl font-semibold"
            >
              Write us your questions:
            </label>
            <textarea
              id="questions"
              name="questions"
              required
              placeholder="Your questions or requests"
              className="w-full lg:h-52"
            ></textarea>
          </div>
        </fieldset>
        {formError && <p style={{ color: "red" }}>{formError}</p>}

        <button
          type="submit"
          className="bg-[#F6CC4D] text-white h-14 font-bold text-lg md:col-span-2 md:w-1/2 lg:col-span-1"
        >
          REQUEST A QUOTE
        </button>
      </form>
      {formSubmitted ? (
        <div>
          <h1>Thank you!</h1>
          <p>Your form submission has been received.</p>
        </div>
      ) : (
        <></>
      )}
      {submissionError && <p style={{ color: "red" }}>{submissionError}</p>}
    </main>
  )
}

export default CarFormHtml
