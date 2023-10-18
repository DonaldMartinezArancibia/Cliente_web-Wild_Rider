import React, { useState, useEffect, useMemo } from "react"
import mailcheck from "mailcheck"
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import countryList from "react-select-country-list"
import "flatpickr/dist/themes/airbnb.css"
import Flatpickr from "react-flatpickr"
import { useQuery } from "@apollo/client"
import { Cars } from "../gql/carsByIdQuery"

const CarForm = ({ pageContext }) => {
  const { carName, remoteId } = pageContext

  const [phone, setPhone] = useState("")

  const [value, setValue] = useState("")

  const [time, setTime] = useState(new Date())

  const handleTimeChange = selectedTime => {
    setTime(selectedTime[0])
  }
  const countries = useMemo(() => countryList().getData(), [])

  const changeHandler = e => {
    setValue(e.target.value)
  }

  const [date, setDate] = useState(new Date())

  const handleDateChange = selectedDates => {
    if (selectedDates && selectedDates.length > 0) {
      setDate(selectedDates[0])
    }
  }

  const [email, setEmail] = useState("yourmail@mailclient.example")
  const [suggestion, setSuggestion] = useState(null)

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

  const handleChange = e => {
    setEmail(e.currentTarget.value)
  }

  const acceptSuggestion = e => {
    if (suggestion != null) setEmail(suggestion)
  }

  const {
    data: carsById,
    loading: carsByIdQueryLoading,
    error: carsByIdQueryError,
  } = useQuery(Cars, {
    variables: { internalId: remoteId, locale: ["en"] },
  })
  if (carsByIdQueryLoading) return <p>Loading...</p>
  if (carsByIdQueryError) return <p>Error : {carsByIdQueryError.message}</p>

  return (
    <main className="p-3 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%] lg:p-14">
      <h1 className="mb-10 font-CarterOne lg:text-5xl">Get a Quote</h1>
      <p className="font-bold">
        Your Car: <span className="font-normal">{carName}</span>
      </p>
      <div className="flex ml-16 mb-10">
        <img src={carsById.cars[0].carMainPhoto.url} className="w-64 mr-10" />
        <table>
          <thead>
            <tr className="text-xl text-left">
              <th>Season</th>
              <th>Dates</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {carsById.cars[0].pricesOfCar.map((price, priceIndex) => (
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

      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="font-Poppins md:grid md:grid-cols-[1fr_1fr] md:grid-rows-[1fr] md:gap-x-4 md:gap-y-2 lg:grid-cols-1 lg:my-5"
      >
        {/* You still need to add the hidden input with the form name to your JSX form */}
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <input type="hidden" name="form-name" value="contact" />
        {/* Agrega el campo oculto con el nombre del formulario */}
        <input type="hidden" name="form-name" value="contact" />

        {/* Sección de Datos Personales */}
        <fieldset
          className="flex flex-col mb-10 md:row-span-2 md:w-1/2"
          role="group"
          aria-label="Datos personales"
        >
          <legend className="text-3xl font-semibold mb-5">
            Basic information
          </legend>
          <div className="flex flex-col md:justify-between">
            <div className="w-full pr-3">
              <label htmlFor="name" className="text-xl w-full font-black">
                Complete Name*:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="w-full h-10 my-2"
                required
              />
            </div>
            <div className="flex flex-col justify-between pr-3">
              <label htmlFor="email" className="text-xl w-full my-2 font-black">
                Email*:
              </label>
              <input
                className="w-full h-10"
                value={email}
                onChange={handleChange}
              />
            </div>
            {suggestion && (
              <div>
                Did you mean{" "}
                <a href="#" onClick={acceptSuggestion}>
                  {suggestion}
                </a>
              </div>
            )}
            <div className="flex flex-col justify-between pr-3">
              <label htmlFor="email" className="text-xl w-full my-2 font-black">
                Confirm Email Address*:
              </label>
              <input
                className="w-full h-10"
                value={email}
                onChange={handleChange}
              />
            </div>

            {suggestion && (
              <div>
                Did you mean{" "}
                <a href="#" onClick={acceptSuggestion}>
                  {suggestion}
                </a>
              </div>
            )}

            <div className="flex flex-col justify-between pr-3">
              <label
                htmlFor="phoneNumber"
                className="text-xl w-full my-2 font-black"
              >
                Phone number (optional if you want):
              </label>
              <PhoneInput
                defaultCountry="us"
                value={phone}
                onChange={phone => setPhone(phone)}
                inputStyle={{ width: "100%", borderRadius: "0" }}
                className="w-full h-10"
              />
            </div>
            <div className="flex flex-col justify-between pr-3">
              <label
                htmlFor="country"
                className="text-xl w-full my-2 font-black"
              >
                Your country of residence*:
              </label>
              <select
                id="country"
                value={value}
                onChange={changeHandler}
                className="w-full h-10"
              >
                <option value="">Select...</option>
                {countries.map(country => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col justify-between pr-3">
            <label
              htmlFor="numberOfTravelers"
              className="text-xl w-full my-2 font-black"
            >
              Number of travelers <span className="text-red-500">*</span>
            </label>
            <select
              id="numberOfTravelers"
              name="numberOfTravelers"
              required
              className="w-full h-10"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="More than 10">More than 10</option>
            </select>
          </div>

          <div className="flex flex-col justify-between pr-3 mb-6">
            <label
              htmlFor="vehicleSelection"
              className="text-xl w-full my-2 font-black"
            >
              Vehicle selection*:
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
          </div>
        </fieldset>

        <fieldset
          className="grid grid-cols-2 mb-10 md:w-1/2"
          role="group"
          aria-label="Detalles del Viaje"
        >
          <legend className="text-3xl font-semibold mb-5">
            Pick up information
          </legend>
          <div className="flex flex-col justify-between pr-3">
            <label
              htmlFor="selectedDate"
              className="text-xl w-full my-2 font-black"
            >
              Selected Date:
            </label>
            <Flatpickr
              options={{
                dateFormat: "F d, Y",
                minDate: "today",
              }}
              value={date}
              onChange={handleDateChange}
              id="selectedDate"
              className="w-full h-10 px-4 py-2"
            />
          </div>
          <div className="flex flex-col justify-between pr-3">
            <label
              htmlFor="selectedTime"
              className="text-xl w-full my-2 font-black"
            >
              Selected Time:
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
              value={time}
              onChange={handleTimeChange}
              id="selectedTime"
              className="w-full h-10 px-4 py-2"
            />
          </div>
          <div className="col-[1/3] justify-between pr-3">
            <div className="mb-6">
              <label
                htmlFor="takeoverPlace"
                className="text-xl block font-semibold my-2"
              >
                Takeover place <span className="text-red-500">*</span>:
              </label>
              <select
                id="takeoverPlace"
                name="takeoverPlace"
                className="w-full h-10"
                required
              >
                <option value="Direct Pick Up on the airport">
                  Direct Pick Up on the airport
                </option>
                <option value="Pick Up on Alajuela Office">
                  Pick Up on Alajuela Office
                </option>
                <option value="Pick Up in Alajuela Hotels/B&B (fees US$10-30)">
                  Pick Up in Alajuela Hotels/B&B (fees US$10-30)
                </option>
                <option value="Pick Up in San Jose Hotels/B&B (fees US$20-40)">
                  Pick Up in San Jose Hotels/B&B (fees US$20-40)
                </option>
                <option value="Guapiles (fees US$90)">
                  Guapiles (fees US$90)
                </option>
                <option value="La Pavona (fees US$125)">
                  La Pavona (fees US$125)
                </option>
                <option value="Other Location">Other Location</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset
          className="grid grid-cols-2 mb-10 w-1/2"
          role="group"
          aria-label="Detalles del Viaje"
        >
          <legend className="text-3xl font-semibold mb-5">
            Drop off information
          </legend>
          <div className="flex flex-col justify-between pr-3">
            <label
              htmlFor="selectedDate"
              className="text-xl w-full my-2 font-black"
            >
              Selected Date:
            </label>
            <Flatpickr
              options={{
                dateFormat: "F d, Y",
                minDate: "today",
              }}
              value={date}
              onChange={handleDateChange}
              id="selectedDate"
              className="w-full h-10 px-4 py-2"
            />
          </div>
          <div className="flex flex-col justify-between pr-3">
            <label
              htmlFor="selectedTime"
              className="text-xl w-full my-2 font-black"
            >
              Selected Time:
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
              value={time}
              onChange={handleTimeChange}
              id="selectedTime"
              className="w-full h-10 px-4 py-2"
            />
          </div>
          <div className="col-[1/3] justify-between pr-3">
            <div className="mb-6">
              <label
                htmlFor="returnPlace"
                className="text-xl block font-semibold my-2"
              >
                Return place <span className="text-red-500">*</span>:
              </label>
              <select
                id="returnPlace"
                name="returnPlace"
                className="w-full h-10"
                required
              >
                <option value="Direct Drop off on the airport (only between 19:00 and 6:00 overnight Parking US$5/hour)">
                  Direct Drop off on the airport (only between 19:00 and 6:00
                  overnight Parking US$5/hour)
                </option>
                <option value="Drop off in the Alajuela Office">
                  Drop off in the Alajuela Office
                </option>
                <option value="Drop off in Alajuela Hotels/B&B (fees US$10-30)">
                  Drop off in Alajuela Hotels/B&B (fees US$10-30)
                </option>
                <option value="Drop off in San Jose Hotels/B&B (fees US$20-40)">
                  Drop off in San Jose Hotels/B&B (fees US$20-40)
                </option>
                <option value="Guapiles (fees US$90)">
                  Guapiles (fees US$90)
                </option>
                <option value="La Pavona (fees US$125)">
                  La Pavona (fees US$125)
                </option>
                <option value="Other Location">Other Location</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset
          className="flex flex-col mb-10 md:row-span-2"
          role="group"
          aria-label="Información de Recogida"
        >
          <legend className="text-3xl font-semibold mb-5">
            Free additional services *
          </legend>
          <div className="mb-6">
            <label className="text-xl block font-semibold">Services</label>
            <ul>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="secondDriver"
                  name="secondDriver"
                  value="Second driver (must be over 25 years old)"
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
                  value="Roof rack (consisting of 2 cross braces for surfboard or kayak transport)"
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
                  value="Child seats (different sizes)"
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
                  value="Seat elevations/Booster Seat"
                />
                <label className="ml-2" htmlFor="seatElevations">
                  Seat elevations/Booster Seat
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="cooler"
                  name="cooler"
                  value="Cooler"
                />
                <label className="ml-2" htmlFor="cooler">
                  Cooler
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="beachChairs"
                  name="beachChairs"
                  value="Beach chairs"
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
                  value="Phone holder"
                />
                <label className="ml-2" htmlFor="phoneHolder">
                  Phone holder
                </label>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <label className="text-xl my-2 block font-semibold">
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
            <label className="text-xl my-2 block font-semibold">
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
            <label className="text-xl my-2 block font-semibold">
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
          <legend className="text-3xl font-semibold mb-5">
            Paid additional services
          </legend>
          <div className="mb-6">
            <label className="text-xl block font-semibold">Services</label>
            <ul>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="simpleSmartphone"
                  name="simpleSmartphone"
                  value="(US$ 25.-) Simple smartphone (for navigation and local phone calls)."
                />
                <label htmlFor="simpleSmartphone">
                  (US$text-xl 25.-) Simple smartphone (for navigation and local
                  phone calls).
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="comprehensiveInsurance"
                  name="comprehensiveInsurance"
                  value="Fully comprehensive insurance without excess / Zero deductible insurance /Full CDW (US$ 7.- to US$9,90.- depend on the car model)"
                />
                <label htmlFor="comprehensiveInsurance">
                  Fully comprehensivetext-xl insurance without excess / Zero
                  deductible insurance /Full CDW (US$ 7.- to US$9,90.- depend on
                  the car model)
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="kolbiSIMCard"
                  name="kolbiSIMCard"
                  value="(US$ 15.-) KOLBI SIM phone card."
                />
                <label htmlFor="kolbiSIMCard">
                  (US$text-xl 15.-) KOLBI SIM phone card.
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="roofBasket"
                  name="roofBasket"
                  value="A roof basket for additional items of luggage. (US$ 5.-/day)"
                />
                <label htmlFor="roofBasket">
                  A rooftext-xl basket for additional items of luggage. (US$
                  5.-/day)
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="thirdDriver"
                  name="thirdDriver"
                  value="Third  driver (US$ 5/day)"
                />
                <label htmlFor="thirdDriver">
                  Third drivertext-xl (US$ 5/day)
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="fourthDriver"
                  name="fourthDriver"
                  value="Fourth driver (US$ 5/day)"
                />
                <label htmlFor="fourthDriver">
                  Fourth drivertext-xl (US$ 5/day)
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="supplementaryInsurance"
                  name="supplementaryInsurance"
                  value="Supplementary insurance for drivers between the ages of 21 and 25. (UAS$ 6.-/day)"
                />
                <label htmlFor="supplementaryInsurance">
                  Supplementary insurancetext-xl for drivers between the ages of
                  21 and 25. (UAS$ 6.-/day)
                </label>
              </li>
              <li className="mb-2">
                <input
                  type="checkbox"
                  id="pickupOrDropoffAtHotels"
                  name="pickupOrDropoffAtHotels"
                  value="Pick-up or drop-off at hotels; RB&amp;B outside of Alajuela or San Jose. Price according to distance"
                />
                <label htmlFor="pickupOrDropoffAtHotels">
                  Pick-uptext-xl or drop-off at hotels; RB&amp;B outside of
                  Alajuela or San Jose. Price according to distance
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="deliveryOrCollection"
                  name="deliveryOrCollection"
                  value="Delivery or collection at different locations countrywide. Price according to distance"
                />
                <label htmlFor="deliveryOrCollection">
                  Delivery ortext-xl collection at different locations
                  countrywide. Price according to distance
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-4 md:w-1/2">
            <label
              htmlFor="simpleSmartphoneQuantity"
              className="text-xl my-2 block font-semibold"
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
              className="text-xl my-2 block font-semibold"
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
              className="text-xl my-2 block font-semibold"
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
          <legend className="text-3xl font-semibold mb-5">
            Communication field
          </legend>
          <div>
            <label
              htmlFor="questions"
              className="text-xl mb-5 block font-semibold"
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

        <button
          type="submit"
          className="bg-[#F6CC4D] text-white h-14 font-bold text-lg md:col-span-2 md:w-1/2 lg:col-span-1"
        >
          REQUEST A QUOTE
        </button>
      </form>
    </main>
  )
}

export default CarForm
