import { useState, useEffect, useCallback, useRef } from "react"
import { useEmailSuggestion } from "./useEmailSuggestion"
import {
  formatRentalDuration,
  formatSelections,
  setValidationMessage,
} from "../lib/quoteForm"

const ZAPIER_QUOTE_WEBHOOK =
  "https://hooks.zapier.com/hooks/catch/17251260/3f91vun"

/**
 * Hook personalizado para la lógica del formulario de cotización.
 * Encapsula todo el estado, validación y envío.
 */
export function useCarQuoteForm({ pageData, pageContext, locale, setOpen }) {
  const captcha = useRef(null)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)

  const [phone, setPhone] = useState("")
  const [formError, setFormError] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submissionError, setSubmissionError] = useState(null)

  // Initialize dates without time component to avoid Flatpickr warnings
  const getInitialDate = () => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }

  const [startDate, setStartDate] = useState(getInitialDate())
  const [defaultValue, setDefaultValue] = useState("")

  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedPaidServices, setSelectedPaidServices] = useState([])
  const [selectedFreeServices, setSelectedFreeServices] = useState([])

  const [endDate, setEndDate] = useState(getInitialDate())

  const emailField = useEmailSuggestion()
  const emailConfirmField = useEmailSuggestion()

  const [selectedServices, setSelectedServices] = useState({})
  const [customSelectedFreeServices, setCustomSelectedFreeServices] = useState({})

  // Calcular la fecha mínima permitida para endDate
  const calculateMinEndDate = useCallback(() => {
    const minEndDate = new Date(startDate)
    minEndDate.setDate(startDate.getDate() + 4)
    return minEndDate
  }, [startDate])

  // Actualizar minDate al cambiar startDate
  useEffect(() => {
    const minDate = startDate
    setEndDate(prevEndDate => {
      if (prevEndDate < minDate) {
        return minDate
      }
      return prevEndDate
    })
  }, [startDate])

  // Actualizar minDate al cambiar startDate
  useEffect(() => {
    setEndDate(calculateMinEndDate())
  }, [startDate, calculateMinEndDate])

  const handleDateChange = (selectedDate, setState) => {
    if (selectedDate && selectedDate.length > 0) {
      setState(selectedDate[0])
    }
  }

  const formatDate = dateString => {
    const date = new Date(dateString)
    const options = { year: "numeric", month: "short", day: "numeric" }
    return date.toLocaleDateString(locale, options)
  }

  const handlePaidServicesChange = e => {
    const serviceName = e.target.value
    if (selectedPaidServices.includes(serviceName)) {
      setSelectedPaidServices(prevSelected =>
        prevSelected.filter(service => service !== serviceName)
      )
    } else {
      setSelectedPaidServices(prevSelected => [...prevSelected, serviceName])
    }
  }

  const handleFreeServicesChange = e => {
    const serviceName = e.target.value
    if (e.target.checked) {
      setSelectedFreeServices([...selectedFreeServices, serviceName])
    } else {
      setSelectedFreeServices(
        selectedFreeServices.filter(service => service !== serviceName)
      )
    }
  }

  const handleCountryChange = e => {
    setSelectedCountry(e.target.value)
  }

  const handleServiceSelection = (selectorTitle, selectedValue, isFreeService) => {
    if (isFreeService) {
      setCustomSelectedFreeServices(prevState => ({
        ...prevState,
        [selectorTitle]: selectedValue,
      }))
    } else {
      setSelectedServices(prevState => ({
        ...prevState,
        [selectorTitle]: selectedValue,
      }))
    }
  }

  const onChange = () => {
    if (captcha.current.getValue()) {
      setIsCaptchaVerified(true)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setFormError(null)
    setSubmissionError(null)

    const form = e.target
    const fullName = form.name.value.trim()

    if (!form.email || !form.emailConfirm) {
      return
    }

    if (!fullName.includes(" ")) {
      setFormError("Please enter at least a name and a last name.")
      return
    }

    const email = form.email.value.trim()
    const emailConfirm = form.emailConfirm.value.trim()

    if (email === "" || emailConfirm === "") {
      setFormError("Email or Email Confirm element is empty.")
      return
    }

    if (email !== emailConfirm) {
      setFormError(
        pageData.emailAndEmailConfirmNotEqualErrorMessage ||
          "Email and Confirm Email must match."
      )
      return
    }

    const formData = new FormData(form)

    formData.append(
      "timeDifference",
      formatRentalDuration(
        document.getElementById("startDate").value,
        document.getElementById("startTime").value,
        document.getElementById("endDate").value,
        document.getElementById("endTime").value
      )
    )

    formData.append(
      "selectedPaidServices",
      selectedPaidServices.join("<br><br>")
    )

    formData.append(
      "selectedFreeServices",
      selectedFreeServices.join("<br><br>")
    )

    formData.append(
      "quantityOfSelectedPaidServices",
      formatSelections(selectedServices)
    )

    formData.append(
      "customSelectedFreeServices",
      formatSelections(customSelectedFreeServices)
    )

    try {
      const response = await fetch(ZAPIER_QUOTE_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      setFormSubmitted(true)
      if (setOpen) {
        setOpen(true)
      }
      e.target.reset()

      emailField.reset()
      emailConfirmField.reset()

      captcha.current?.reset()
      setIsCaptchaVerified(false)
      setFormError(null)
    } catch (error) {
      setSubmissionError(`Error submitting form: ${error.message}`)
    }
  }

  const selectedTransmission = pageContext?.selectedTransmission

  const getTransmissionOptions = car =>
    [car.manualTransmission, car.automaticTransmission]
      .filter(
        transmission =>
          transmission && transmission.carTransmissionSelectorValue
      )
      .flatMap(transmission => ({
        value: transmission.carTransmissionSelectorValue,
        label: transmission.carTransmissionSelectorValue,
      }))

  const getDefaultOption = (transmissionOptions, selectedTransmission) =>
    transmissionOptions?.find(
      option =>
        selectedTransmission?.toLowerCase().trim() ===
        option?.value?.toLowerCase()
    ) || ""

  useEffect(() => {
    const transmissionOptions = pageData?.cars.flatMap(getTransmissionOptions)
    const defaultOption = getDefaultOption(
      transmissionOptions,
      selectedTransmission
    )
    setDefaultValue(defaultOption)
  }, [selectedTransmission, pageData?.cars])

  const handleInputChange = setValidationMessage

  return {
    // State
    phone,
    setPhone,
    formError,
    formSubmitted,
    setFormSubmitted,
    submissionError,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    defaultValue,
    setDefaultValue,
    selectedCountry,
    selectedPaidServices,
    selectedFreeServices,
    selectedServices,
    customSelectedFreeServices,
    emailField,
    emailConfirmField,
    isCaptchaVerified,
    captcha,
    calculateMinEndDate,
    formatDate,
    // Handlers
    handlePaidServicesChange,
    handleFreeServicesChange,
    handleCountryChange,
    handleServiceSelection,
    handleDateChange,
    handleSubmit,
    onChange,
    handleInputChange,
  }
}