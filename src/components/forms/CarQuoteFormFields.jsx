import React from "react"
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/airbnb.css"
import { generateTimeOptions } from "../../lib/quoteForm"

/**
 * Campo de información básica (nombre, email, teléfono, país, viajeros, vehículo)
 */
export const BasicInfoFields = ({
  pageData,
  carsById,
  emailField,
  emailConfirmField,
  phone,
  setPhone,
  selectedCountry,
  handleCountryChange,
  defaultValue,
  setDefaultValue,
  handleInputChange,
}) => (
  <fieldset
    className="flex flex-col mb-10 md:row-span-2 lg:row-span-1 lg:w-1/2"
    role="group"
    aria-label="Datos personales"
  >
    <legend className="mb-5 text-3xl font-semibold">
      {pageData.basicInformationTitle}
    </legend>
    <div className="flex flex-col md:justify-between">
      <div className="flex flex-col justify-between w-1/2 pr-3">
        <input
          name="carName"
          style={{ height: "0px", width: "0px" }}
          value={carsById?.carName}
        />
        <label
          htmlFor="carName"
          style={{ height: "0px", width: "0px", fontSize: "0px" }}
        >
          Car Name
        </label>
        <ConditionalLabel
          text={pageData.completeNameField}
          htmlFor="name"
        />
        <input
          type="text"
          id="name"
          name="name"
          className="w-full h-10 p-2 my-2 bg-white"
          required={pageData.completeNameField?.includes("*")}
          onInvalid={e =>
            handleInputChange(e, pageData.completeNameFieldErrorMessage)
          }
        />
      </div>

      <div>
        <div className="flex flex-col justify-between pr-3">
          <ConditionalLabel text={pageData.emailField} htmlFor="email" />
          <input
            className="w-full h-10 p-2 bg-white"
            type="email"
            id="email"
            name="email"
            value={emailField.value}
            onChange={emailField.onChange}
            required={pageData.emailField?.includes("*")}
            onInvalid={e =>
              handleInputChange(e, pageData.emailFieldErrorMessage)
            }
          />

          {emailField.suggestion && (
            <div>
              Did you mean{" "}
              <button
                type="button"
                className="underline"
                onClick={emailField.acceptSuggestion}
              >
                {emailField.suggestion}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between pr-3">
          <ConditionalLabel
            text={pageData.confirmEmailField}
            htmlFor="emailConfirm"
          />
          <input
            className="w-full h-10 p-2 bg-white"
            type="email"
            id="emailConfirm"
            name="emailConfirm"
            value={emailConfirmField.value}
            onChange={emailConfirmField.onChange}
            required={pageData.confirmEmailField?.includes("*")}
            onInvalid={e =>
              handleInputChange(e, pageData.confirmEmailFieldErrorMessage)
            }
          />

          {emailConfirmField.suggestion && (
            <div>
              Did you mean{" "}
              <button
                type="button"
                className="underline"
                onClick={emailConfirmField.acceptSuggestion}
              >
                {emailConfirmField.suggestion}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between pr-3">
        <ConditionalLabel
          text={pageData.phoneNumberField}
          htmlFor="phoneNumber"
        />
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
          required={pageData.phoneNumberField?.includes("*")}
        />
      </div>
      <div className="flex flex-col justify-between pr-3">
        <ConditionalLabel
          text={pageData.countryResidenceField}
          htmlFor="countrySelection"
        />
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="w-full h-10 bg-white"
          name="countrySelection"
          required={pageData.countryResidenceField?.includes("*")}
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
      <ConditionalLabel
        text={pageData.numberOfTravelersField}
        htmlFor="numberOfTravelers"
      />

      <select
        id="numberOfTravelers"
        name="numberOfTravelers"
        required={pageData.numberOfTravelersField?.includes("*")}
        className="w-full h-10 bg-white"
      >
        {pageData.numberOfTravelersOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-col justify-between pr-3">
      <ConditionalLabel
        text={pageData.vehicleSelectionField}
        htmlFor="vehicleSelection"
      />
      <select
        id="vehicleSelection"
        name="vehicleSelection"
        className="w-full h-10 bg-white"
        required={pageData.vehicleSelectionField?.includes("*")}
        value={defaultValue.value}
        onInvalid={e =>
          handleInputChange(e, pageData.vehicleSelectionFieldErrorMessage)
        }
        onChange={e =>
          setDefaultValue({
            value: e.target.value,
            label: e.target.value,
          })
        }
      >
        <option value="">
          {pageData.vehicleSelectionFieldDefaultOption}
        </option>
        {pageData.cars
          .flatMap(car =>
            [car.manualTransmission, car.automaticTransmission]
              .filter(
                transmission =>
                  transmission && transmission.carTransmissionSelectorValue
              )
              .flatMap(transmission => ({
                value: transmission.carTransmissionSelectorValue,
                label: transmission.carTransmissionSelectorValue,
              }))
          )
          .map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  </fieldset>
)

/**
 * Campo de información de recogida
 */
export const PickUpFields = ({
  pageData,
  startDate,
  setStartDate,
  handleDateChange,
  locale,
}) => (
  <fieldset
    className="mb-2 lg:grid lg:grid-cols-2 lg:col-span-1 lg:w-1/2"
    role="group"
    aria-label="Detalles del Viaje"
  >
    <legend className="mb-5 text-3xl font-semibold">
      {pageData.pickUpInformationTitle}
    </legend>
    <div className="flex flex-col justify-between pr-3">
      <ConditionalLabel
        text={pageData.takeoverDateField}
        htmlFor="StartDate"
      />
      <Flatpickr
        options={{
          dateFormat: "F d, Y",
          minDate: "today",
          locale: locale,
        }}
        value={startDate}
        onChange={selectedDate => handleDateChange(selectedDate, setStartDate)}
        name="StartDate"
        id="startDate"
        className="w-full h-10 px-4 py-2 bg-white"
        required={pageData.takeoverDateField?.includes("*")}
      />
      <sub className="mt-2 text-sm text-gray-500">
        {pageData.subtextOfTakeoverDate}
      </sub>
    </div>
    <div className="flex flex-col justify-between pr-3">
      <ConditionalLabel
        text={pageData.takeoverHourField}
        htmlFor="StartTime"
      />
      <select
        name="StartTime"
        id="startTime"
        className="w-full h-10 px-4 py-2 bg-white"
        required={pageData.takeoverHourField?.includes("*")}
      >
        {generateTimeOptions("6:00", "20:00")}
        <option value={pageData.otherHour}>{pageData.otherHour}</option>
      </select>
      <sub className="mt-2 text-sm text-gray-500">
        {pageData.subtextOfTakeoverHour}
      </sub>
    </div>
    <div className="col-[1/3] justify-between pr-3">
      <div className="mb-6">
        <ConditionalLabel
          text={pageData.takeoverPlaceField}
          htmlFor="takeoverPlace"
        />
        <select
          id="takeoverPlace"
          name="takeoverPlace"
          className="w-full h-10 bg-white"
          required={pageData.takeoverPlaceField?.includes("*")}
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
)

/**
 * Campo de información de devolución
 */
export const DropOffFields = ({
  pageData,
  endDate,
  setEndDate,
  calculateMinEndDate,
  handleDateChange,
  locale,
}) => (
  <fieldset
    className="mb-4 lg:grid lg:grid-cols-2 lg:w-1/2"
    role="group"
    aria-label="Detalles del Viaje"
  >
    <legend className="mb-5 text-3xl font-semibold">
      {pageData.dropOffInformationTitle}
    </legend>
    <div className="flex flex-col justify-between pr-3">
      <ConditionalLabel
        text={pageData.returnDateField}
        htmlFor="EndDate"
      />
      <Flatpickr
        options={{
          dateFormat: "F d, Y",
          minDate: calculateMinEndDate(),
          locale: locale,
        }}
        value={endDate}
        onChange={selectedDate => handleDateChange(selectedDate, setEndDate)}
        name="EndDate"
        id="endDate"
        className="w-full h-10 px-4 py-2 bg-white"
        required={pageData.returnDateField?.includes("*")}
      />
      <sub className="mt-2 text-sm text-gray-500">
        {pageData.subtextOfReturnDate}
      </sub>
    </div>
    <div className="flex flex-col justify-between pr-3">
      <ConditionalLabel
        text={pageData.returnHourField}
        htmlFor="endTime"
      />
      <select
        id="endTime"
        name="endTime"
        className="w-full h-10 px-4 py-2 bg-white"
        required={pageData.returnHourField?.includes("*")}
      >
        {generateTimeOptions("6:00", "20:00")}
        <option value={pageData.otherHour}>{pageData.otherHour}</option>
      </select>
      <sub className="mt-2 text-sm text-gray-500">
        {pageData.subtextOfTakeoverHour}
      </sub>
    </div>
    <div className="col-[1/3] justify-between pr-3">
      <div className="mb-6">
        <ConditionalLabel
          text={pageData.returnPlaceField}
          htmlFor="returnPlace"
        />
        <select
          id="returnPlace"
          name="returnPlace"
          className="w-full h-10 bg-white"
          required={pageData.returnPlaceField?.includes("*")}
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
)

/**
 * Servicios gratuitos adicionales
 */
export const FreeServicesFields = ({
  pageData,
  selectedFreeServices,
  handleFreeServicesChange,
  handleServiceSelection,
}) => (
  <fieldset
    className="flex flex-col mb-10 md:col-span-2"
    role="group"
    aria-label="Información de Recogida"
  >
    <legend className="mb-5 text-3xl font-semibold">
      {pageData.freeAdditionalServicesTitle}
    </legend>
    <div className="mb-6">
      <label className="block text-xl font-semibold">
        {pageData.freeServicesSubtitle}
      </label>
      <ul>
        {pageData.freeServicesCheckboxOptions.map((option, index) => (
          <li key={index} className="mb-2">
            <input
              type="checkbox"
              id={option.replace(/\s+/g, "")}
              name={option.replace(/\s+/g, "")}
              value={option}
              checked={selectedFreeServices.includes(option)}
              onChange={handleFreeServicesChange}
            />
            <label
              className="ml-2"
              htmlFor={option.replace(/\s+/g, "")}
            >
              {option}
            </label>
          </li>
        ))}
      </ul>
      {/* Selectores de servicios gratuitos */}
      {pageData.freeServicesSelectors.map((selector, index) => (
        <div key={index} className="mb-6 lg:w-1/2">
          <label className="block text-xl font-semibold">
            {selector.serviceSelectorTitle}
          </label>
          <select
            id={selector.serviceSelectorTitle?.replace(/\s+/g, "")}
            name={selector.serviceSelectorTitle?.replace(/\s+/g, "")}
            className="w-full h-10 bg-white"
            onChange={e =>
              handleServiceSelection(
                selector.serviceSelectorTitle,
                e.target.value,
                true
              )
            }
          >
            {selector.serviceValues.map((value, valueIndex) => (
              <option key={valueIndex} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  </fieldset>
)

/**
 * Servicios de pago adicionales
 */
export const PaidServicesFields = ({
  pageData,
  selectedPaidServices,
  handlePaidServicesChange,
  handleServiceSelection,
}) => (
  <fieldset className="col-span-2 mb-5">
    <legend className="mb-5 text-3xl font-semibold">
      {pageData.paidAdditionalServicesTitle}
    </legend>
    <div className="mb-6">
      <label className="block text-xl font-semibold">
        {pageData.paidServicesSubtitle}
      </label>
      <ul>
        {pageData.paidServicesCheckboxOptions.map((option, index) => (
          <li key={index} className="mb-2">
            <input
              type="checkbox"
              id={option.replace(/\s+/g, "")}
              name={option.replace(/\s+/g, "")}
              value={option}
              checked={selectedPaidServices.includes(option)}
              onChange={handlePaidServicesChange}
            />
            <label className="ml-2" htmlFor={option.replace(/\s+/g, "")}>
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
    {pageData.paidServicesSelectors.map((selector, index) => (
      <div key={index} className="mb-6 lg:w-1/2">
        <label className="block text-xl font-semibold">
          {selector.serviceSelectorTitle}
        </label>
        <select
          id={selector.serviceSelectorTitle?.replace(/\s+/g, "")}
          name={selector.serviceSelectorTitle?.replace(/\s+/g, "")}
          className="w-full h-10 bg-white"
          onChange={e =>
            handleServiceSelection(selector.serviceSelectorTitle, e.target.value)
          }
        >
          {selector.serviceValues.map((value, valueIndex) => (
            <option key={valueIndex} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    ))}
  </fieldset>
)

/**
 * Campo de comunicación
 */
export const CommunicationFields = ({ pageData }) => (
  <fieldset className="col-span-2 mb-10 lg:w-1/2">
    <legend className="mb-5 text-3xl font-semibold">
      {pageData.communicationFieldTitle}
    </legend>
    <div>
      <ConditionalLabel
        text={pageData.communicationFieldSubtitle}
        htmlFor="questions"
      />
      <textarea
        id="questions"
        name="questions"
        required={pageData.communicationFieldSubtitle?.includes("*")}
        className="w-full h-32 p-2 md:h-40 bg-white"
      ></textarea>
    </div>
  </fieldset>
)

/**
 * Componente de etiqueta condicional con asterisco
 */
export const ConditionalLabel = ({ text, htmlFor }) => {
  const hasAsterisk = text?.includes("*")
  const labelText = hasAsterisk ? text.replace("*", "") : text

  return (
    <label htmlFor={htmlFor} className="w-full my-2 text-xl font-black">
      <span>{labelText}</span>
      {hasAsterisk && <span className="text-red-500">*</span>}
    </label>
  )
}