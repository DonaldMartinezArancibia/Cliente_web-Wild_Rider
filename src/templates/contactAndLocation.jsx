import React, { useRef, useEffect, useState } from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import { PhoneInput } from "react-international-phone"
import mailcheck from "mailcheck"
import ReCAPTCHA from "react-google-recaptcha"
import { navigate } from "gatsby"
import parkingWR1 from "../images/Captura de pantalla 2023-09-06 124559(2).png"
import parkingWR2 from "../images/Captura de pantalla 2023-09-06 124559 (1).png"
import { ContactAndLocation, ContactContent } from "../gql/contactQuery"

export default function useContactAndLocation({ pageContext }) {
  const captcha = useRef(null)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
  const [phone, setPhone] = useState("")

  const onChange = () => {
    if (captcha.current.getValue()) {
      setIsCaptchaVerified(true) // Marcar como verificado cuando se obtenga una respuesta válida
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
  const [submissionError, setSubmissionError] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(null)
  const [redirecting, setRedirecting] = useState(false)

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      setFormError(null)
      setSubmissionError(null)

      const form = e.target

      // Verificar que 'form.email' y 'form.emailConfirm' no sean undefined
      if (!form.email || !form.emailConfirm) {
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

      const formData = new FormData(form)

      const response = await fetch(
        "https://hooks.zapier.com/hooks/catch/17251260/3wu1vz2/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(formData).toString(),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      setFormSubmitted(true)
      setRedirecting(true)

      setTimeout(() => {
        setRedirecting(false)
        navigate(pageContext.langKey === "en" ? "/" : `/${pageContext.langKey}`)
      }, 5000) // 5000 milisegundos = 5 segundos
    } catch (error) {
      setSubmissionError(`Error submitting form: ${error.message}`)
      // Limpiar errores después de enviar el formulario con éxito
      setFormError(
        "There was an error submitting the form. Please try again later."
      )
    }
    // Limpiar errores después de enviar el formulario con éxito
    setFormError(null)
    // Resto del código para manejar la respuesta del envío
  }

  const client = useApolloClient()
  const {
    data: ContactAndLocationData,
    loading: ContactAndLocationDataQueryLoading,
    error: ContactAndLocationDataQueryError,
  } = useQuery(ContactContent, {
    variables: {
      // internalId: pageContext.remoteId,
      locale: [pageContext.langKey],
    },
  })
  client.refetchQueries({
    include: [ContactContent],
  })
  if (ContactAndLocationDataQueryLoading) return <p>Loading...</p>

  const pageData = ContactAndLocationData.contactAndLocations[0]

  const handleLinkClick = url => {
    window.open(url, "Data", "height=700px,width=600px")
  }

  return (
    <main className="py-10 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%] lg:grid lg:grid-cols-[1fr_1fr] lg:p-16 min-[2000px]:grid-cols-[35%_35%_30%]">
      <h1 className="font-CarterOne lg:text-5xl lg:col-[1/3] ...">
        {pageData.title}
      </h1>
      <form
        name="contact"
        onSubmit={handleSubmit}
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="m-2 self-center md:grid md:grid-cols-[1fr_1fr] md:grid-rows-[1fr] md:gap-x-4 md:gap-y-2 lg:grid-cols-1 lg:my-5"
      >
        {/* You still need to add the hidden input with the form name to your JSX form */}
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <input type="hidden" name="form-name" value="contact" />

        <fieldset
          className="flex flex-row"
          role="group"
          aria-label="Datos personales"
        >
          <div className="flex flex-col justify-between w-1/2 pr-3">
            <label
              htmlFor="nombre"
              className="w-full my-2 font-black font-Poppins"
            >
              {pageData.contactForm.nameField}
              <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full h-10 p-2"
              required
            />
          </div>
          <div className="flex flex-col justify-between w-1/2 pl-3">
            <label
              htmlFor="surname"
              className="w-full my-2 font-black font-Poppins"
            >
              {pageData.contactForm.surnameField}
              <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              className="w-full h-10 p-2"
              required
            />
          </div>
        </fieldset>

        <fieldset
          className="md:flex md:flex-row"
          role="group"
          aria-label="Correo Electrónico"
        >
          <div className="flex flex-col justify-between md:pr-3 md:w-1/2">
            <label
              htmlFor="email"
              className="w-full my-2 font-black font-Poppins"
            >
              {pageData.contactForm.emailField}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-2"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => handleChange(e, setEmail, setSuggestion)}
              required
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
          <div className="flex flex-col justify-between md:pl-3 md:w-1/2">
            <label
              htmlFor="emailConfirm"
              className="w-full my-2 font-black font-Poppins"
            >
              {pageData.contactForm.confirmEmailField}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-2"
              type="email"
              id="emailConfirm"
              name="emailConfirm"
              value={emailConfirm}
              onChange={e =>
                handleChange(e, setEmailConfirm, setSuggestionConfirm)
              }
              required
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
        </fieldset>

        <fieldset
          className="flex flex-row"
          role="group"
          aria-label="Número de Teléfono"
        >
          <div className="flex flex-col justify-between w-full">
            <label
              htmlFor="phoneNumber"
              className="w-full my-2 font-black font-Poppins"
            >
              {pageData.contactForm.phoneNumberField}:
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
        </fieldset>

        <fieldset
          className="flex flex-col md:row-span-2"
          role="group"
          aria-label="Mensaje"
        >
          <label htmlFor="mensaje" className="my-2 font-black font-Poppins">
            {pageData.contactForm.messageField}{" "}
            <span className="text-red-500">*</span>:
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="5"
            required
            className="p-2 lg:h-16"
          ></textarea>
        </fieldset>

        <div className="relative captcha">
          <ReCAPTCHA
            ref={captcha}
            sitekey="6Lf0V-0nAAAAAEENM44sYr38XhTfqXbPoGJNZ651"
            onChange={onChange}
            className="flex my-2 justify-evenly lg:justify-start"
          />
          {!isCaptchaVerified && (
            <input
              type="checkbox"
              className="absolute left-[40%] bottom-7 -z-10 captcha-fake-field lg:left-[10%]"
              tabIndex="-1"
              required
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-[#F6CC4D] text-white font-bold h-10 w-full font-Poppins md:col-span-2 md:w-1/3 md:m-auto lg:col-span-1 lg:w-full"
        >
          {pageData.contactForm.sendButton}
        </button>
        {formSubmitted && (
          <div>
            <h1>Thank you!</h1>
            <p>Your form submission has been received.</p>
          </div>
        )}
        {formError && <p style={{ color: "red" }}>Form Error: {formError}</p>}
        {redirecting && (
          <div>
            <p>Redirecting to the home page...</p>
          </div>
        )}
      </form>
      <div className="grid mb-5 mx-3 min-[500px]:grid-cols-2 md:grid-cols-3 md:justify-items-center md:my-8 lg:col-[1/2] lg:row-[3/4]">
        {pageData.contactElements?.map((element, index) => (
          <div className="flex items-center col-span-1" key={index}>
            <img
              className="h-8 mr-2 lg:h-12"
              src={element?.elementIcon?.url}
              alt={`${element.elementTitle} Icon`}
            />
            <div className="text-base">
              <p className="font-bold">{element.elementTitle}</p>
              <p>{element.elementValue}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-11/12 m-auto mb-4 md:w-1/2 lg:row-[2/3] lg:col-[2/3] lg:w-10/12 min-[2000px]:row-[2/3]">
        <img
          src={pageData.topImage.url}
          alt="Profile"
          className="mb-10 min-[2000px]:mx-auto"
        />
        <img
          src={pageData.bottomImage.url}
          alt="Profile"
          className="min-[2000px]:m-auto"
        />
      </div>
      <p className="mx-3 font-semibold lg:w-10/12 lg:justify-self-center">
        <h1>{pageData.titleOfAddress}</h1>
        {pageData.address}
        <br />
        <br />
        {pageData.localizations[0]?.address}
      </p>
      <p className="mx-3 font-semibold lg:w-10/12 lg:justify-self-center"></p>
      <iframe
        width="360"
        height="300"
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=wild%20rider%204x4&t=&z=18&ie=UTF8&iwloc=&output=embed"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        className="w-11/12 m-auto my-5 lg:col-[1/3] lg:w-[95%] rounded-xl shadow-md min-[2000px]:row-[2/3] min-[2000px]:col-[3/4] min-[2000px]:w-full min-[2000px]:h-full min-[2000px]:-mt-2"
      ></iframe>
      <a
        className="lg:col-[1/3] min-[2000px]:col-[3/4] min-[2000px]:row-[3/4]"
        onClick={() => handleLinkClick("https://goo.gl/maps/KVoab3br7v4zSjoCA")}
      >
        <button className="bg-[#0833a2] flex text-white m-auto py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg min-[2000px]:mt-2">
          Google Maps
          <svg className="h-6 ml-2" viewBox="0 0 448 510">
            <path
              fill="#fff"
              d="M352 192c0-88.4-71.6-160-160-160S32 103.6 32 192c0 20.2 9.1 48.6 26.5 82.7c16.9 33.2 39.9 68.2 63.4 100.5c23.4 32.2 46.9 61 64.5 81.9c1.9 2.3 3.8 4.5 5.6 6.6c1.8-2.1 3.6-4.3 5.6-6.6c17.7-20.8 41.1-49.7 64.5-81.9c23.5-32.3 46.4-67.3 63.4-100.5C342.9 240.6 352 212.2 352 192zm32 0c0 88.8-120.7 237.9-170.7 295.9C200.2 503.1 192 512 192 512s-8.2-8.9-21.3-24.1C120.7 429.9 0 280.8 0 192C0 86 86 0 192 0S384 86 384 192zm-240 0a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm48 80a80 80 0 1 1 0-160 80 80 0 1 1 0 160z"
            />
          </svg>
        </button>
      </a>
    </main>
  )
}
