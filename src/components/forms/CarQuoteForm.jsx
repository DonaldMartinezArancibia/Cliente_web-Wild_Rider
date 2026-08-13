import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import ReCAPTCHA from "react-google-recaptcha"
import { CarQuoteFormContent } from "../../gql/carQuotePageQuery"
import { useLocalizedQuery } from "../../hooks/useLocalizedQuery"
import { useContentLangKey } from "../../context/siteData"
import SubmitDialog from "../ui/SubmitDialog"
import PriceTable from "../ui/PriceTable"
import { useCarQuoteForm } from "../../hooks/useCarQuoteForm"
import {
  BasicInfoFields,
  PickUpFields,
  DropOffFields,
  FreeServicesFields,
  PaidServicesFields,
  CommunicationFields,
} from "./CarQuoteFormFields"

const CarQuoteForm = ({ apolloData, pageContext }) => {
  const [open, setOpen] = useState(true)
  const locale = pageContext.langKey
  const contentLangKey = useContentLangKey()

  const { data: CarQuoteFormData, statusElement } = useLocalizedQuery(
    CarQuoteFormContent,
    pageContext
  )

  const pageData = CarQuoteFormData?.carQuoteForms[0]
  const carsById = apolloData?.cars[0]

  const {
    phone,
    setPhone,
    formError,
    formSubmitted,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    defaultValue,
    setDefaultValue,
    selectedCountry,
    selectedPaidServices,
    selectedFreeServices,
    emailField,
    emailConfirmField,
    isCaptchaVerified,
    captcha,
    calculateMinEndDate,
    formatDate,
    handlePaidServicesChange,
    handleFreeServicesChange,
    handleCountryChange,
    handleServiceSelection,
    handleDateChange,
    handleSubmit,
    onChange,
    handleInputChange,
    submissionError,
  } = useCarQuoteForm({
    pageData,
    pageContext,
    locale,
    setOpen,
  })

  if (statusElement) return statusElement

  return (
    <main className="p-3 hero-surface lg:p-14">
      <h1 className="mb-4 font-CarterOne lg:text-5xl">{pageData.title}</h1>
      <div className="mb-10 lg:grid lg:grid-cols-2 lg:ml-0">
        <p className="mb-4 lg:col-span-2">
          <ReactMarkdown>{pageData.welcomeText?.markdown}</ReactMarkdown>
        </p>
        <h2 className="row-start-2 font-CarterOne lg:col-span-2">
          {carsById?.carName}
        </h2>
        {carsById?.insuranceAndTaxInfo !== null &&
          carsById?.insuranceAndTaxInfo !== undefined && (
            <span className="inline-flex items-center row-[3/4] px-2 py-1 text-xs font-medium text-blue-700 rounded-md lg:col-[1/3] gap-x-2 bg-blue-50 mt-2 ring-1 ring-inset ring-blue-700/10">
              <svg
                className="w-2 fill-[#3b82f6]"
                viewBox="0 0 6 6"
                aria-hidden="true"
              >
                <circle cx="3" cy="3" r="3"></circle>
              </svg>
              {carsById.insuranceAndTaxInfo}
            </span>
          )}
        <img
          src={carsById?.carMainPhoto.url}
          alt={carsById?.carMainPhoto.altText}
          className="w-full m-auto sm:w-4/5 lg:m-0 lg:col-[2/3]"
        />
        <div className="flex flex-col xl:flex-row lg:col-[1/2] lg:row-[4/5]">
          <div className="overflow-x-auto flex sm:m-auto xl:m-[auto_0_auto_8%]">
            <PriceTable
              carsAndQuote={carsById?.carsAndQuote}
              manualTransmission={carsById?.manualTransmission}
              automaticTransmission={carsById?.automaticTransmission}
              formatDate={formatDate}
              locale={locale}
            />
          </div>
        </div>
      </div>

      <form
        name="carquote"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="font-Poppins md:grid md:grid-cols-[1fr_1fr] md:grid-rows-[1fr] md:gap-x-4 md:gap-y-2 lg:block lg:my-5"
        onSubmit={handleSubmit}
      >
        {/* You still need to add the hidden input with the form name to your JSX form */}
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <input type="hidden" name="form-name" value="carquote" />

        <BasicInfoFields
          pageData={pageData}
          carsById={carsById}
          emailField={emailField}
          emailConfirmField={emailConfirmField}
          phone={phone}
          setPhone={setPhone}
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          handleInputChange={handleInputChange}
        />

        <PickUpFields
          pageData={pageData}
          startDate={startDate}
          setStartDate={setStartDate}
          handleDateChange={handleDateChange}
          locale={locale}
        />

        <DropOffFields
          pageData={pageData}
          endDate={endDate}
          setEndDate={setEndDate}
          calculateMinEndDate={calculateMinEndDate}
          handleDateChange={handleDateChange}
          locale={locale}
        />

        <FreeServicesFields
          pageData={pageData}
          selectedFreeServices={selectedFreeServices}
          handleFreeServicesChange={handleFreeServicesChange}
          handleServiceSelection={handleServiceSelection}
        />

        <PaidServicesFields
          pageData={pageData}
          selectedPaidServices={selectedPaidServices}
          handlePaidServicesChange={handlePaidServicesChange}
          handleServiceSelection={handleServiceSelection}
        />

        <CommunicationFields pageData={pageData} />

        {formError && <p style={{ color: "red" }}>{formError}</p>}

        <div className="relative captcha">
          <ReCAPTCHA
            ref={captcha}
            sitekey="6Lf0V-0nAAAAAEENM44sYr38XhTfqXbPoGJNZ651"
            hl={contentLangKey || locale}
            onChange={onChange}
            className="flex my-2 justify-evenly lg:justify-start"
          />
          {!isCaptchaVerified && (
            <input
              type="checkbox"
              className="absolute left-[40%] bottom-7 -z-10 captcha-fake-field lg:left-[10%]"
              tabIndex="-1"
              required
              onInvalid={e => handleInputChange(e, pageData.reCaptchaErrorMessage)}
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-brand-yellow text-white h-14 font-bold text-lg w-full md:col-span-2 lg:w-1/2 lg:col-span-1"
        >
          {pageData.buttonText}
        </button>
      </form>

      <SubmitDialog
        open={formSubmitted && open}
        onClose={() => setOpen(false)}
        markdown={pageData?.formOnSubmitMessage}
      />

      {submissionError && <p style={{ color: "red" }}>{submissionError}</p>}
    </main>
  )
}

export default CarQuoteForm