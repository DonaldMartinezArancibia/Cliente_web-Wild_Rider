import React, { useRef, useState } from "react"
import { PhoneInput } from "react-international-phone"
import ReCAPTCHA from "react-google-recaptcha"
import { useEmailSuggestion } from "../../hooks/useEmailSuggestion"
import EmailField from "./EmailField"
import SubmitDialog from "../ui/SubmitDialog"

const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/17251260/3wu1vz2/"
const RECAPTCHA_SITE_KEY = "6Lf0V-0nAAAAAEENM44sYr38XhTfqXbPoGJNZ651"

/** Muestra el mensaje del CMS cuando un campo obligatorio queda vacío. */
const setValidationMessage = (event, message) => {
  event.target.setCustomValidity(
    event.target.value.trim() ? "" : message || "This field is required"
  )
}

/**
 * Formulario de contacto.
 *
 * Extraído de contactAndLocation.jsx, donde convivía con la maquetación de la
 * página: 300 líneas de estado, validación y envío mezcladas con el layout.
 *
 * @param {object} props.content  nodo `contactForm` de Hygraph
 * @param {string} props.successMarkdown  mensaje de éxito (markdown)
 * @param {string} props.recaptchaLang    idioma del widget de reCAPTCHA
 */
const ContactForm = ({ content, successMarkdown, recaptchaLang }) => {
  const captcha = useRef(null)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
  const [phone, setPhone] = useState("")
  const [formError, setFormError] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const email = useEmailSuggestion()
  const emailConfirm = useEmailSuggestion()

  const handleSubmit = async event => {
    event.preventDefault()
    setFormError(null)

    const form = event.target
    const emailValue = form.email?.value.trim()
    const emailConfirmValue = form.emailConfirm?.value.trim()

    if (!emailValue || !emailConfirmValue) {
      setFormError("Email or Email Confirm element is empty.")
      return
    }

    if (emailValue !== emailConfirmValue) {
      setFormError(
        content.emailAndEmailConfirmNotEqualErrorMessage ||
          "Email and Confirm Email must match."
      )
      return
    }

    try {
      const response = await fetch(ZAPIER_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      form.reset()
      email.reset()
      emailConfirm.reset()
      captcha.current?.reset()
      setIsCaptchaVerified(false)
      setIsDialogOpen(true)
    } catch (error) {
      setFormError(
        `There was an error submitting the form. Please try again later. (${error.message})`
      )
    }
  }

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="m-2 self-center md:grid md:grid-cols-[1fr_1fr] md:grid-rows-[1fr] md:gap-x-4 md:gap-y-2 lg:grid-cols-1 lg:my-5"
    >
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>
      <input type="hidden" name="form-name" value="contact" />

      <fieldset className="flex flex-row" aria-label="Datos personales">
        <div className="flex flex-col justify-between w-1/2 pr-3">
          <label htmlFor="nombre" className="w-full my-2 font-black font-Poppins">
            {content.nameField}
            <span className="text-red-500">*</span>:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="w-full h-10 p-2 bg-white"
            onInvalid={e => setValidationMessage(e, content.nameFieldErrorMessage)}
            required
          />
        </div>
        <div className="flex flex-col justify-between w-1/2 pl-3">
          <label
            htmlFor="surname"
            className="w-full my-2 font-black font-Poppins"
          >
            {content.surnameField}
            <span className="text-red-500">*</span>:
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            className="w-full h-10 p-2 bg-white"
            onInvalid={e =>
              setValidationMessage(e, content.surnameFieldErrorMessage)
            }
            required
          />
        </div>
      </fieldset>

      <fieldset className="md:flex md:flex-row" aria-label="Correo Electrónico">
        <EmailField
          id="email"
          name="email"
          label={content.emailField}
          errorMessage={content.emailFieldErrorMessage}
          field={email}
          onInvalid={setValidationMessage}
          className="md:pr-3 md:w-1/2"
        />
        <EmailField
          id="emailConfirm"
          name="emailConfirm"
          label={content.confirmEmailField}
          errorMessage={content.confirmEmailFieldErrorMessage}
          field={emailConfirm}
          onInvalid={setValidationMessage}
          className="md:pl-3 md:w-1/2"
        />
      </fieldset>

      <fieldset className="flex flex-row" aria-label="Número de Teléfono">
        <div className="flex flex-col justify-between w-full">
          <label
            htmlFor="phoneNumber"
            className="w-full my-2 font-black font-Poppins"
          >
            {content.phoneNumberField}:
          </label>
          <PhoneInput
            defaultCountry="us"
            value={phone}
            onChange={setPhone}
            inputStyle={{ width: "100%", borderRadius: "0" }}
            inputProps={{ name: "phoneNumber", type: "tel", id: "phoneNumber" }}
            className="w-full h-10"
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col md:row-span-2" aria-label="Mensaje">
        <label htmlFor="mensaje" className="my-2 font-black font-Poppins">
          {content.messageField}
          <span className="text-red-500">*</span>:
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="15"
          required
          onInvalid={e =>
            setValidationMessage(e, content.messageFieldErrorMessage)
          }
          className="p-2 bg-white"
        ></textarea>
      </fieldset>

      <div className="relative captcha">
        <ReCAPTCHA
          ref={captcha}
          sitekey={RECAPTCHA_SITE_KEY}
          hl={recaptchaLang}
          onChange={() => setIsCaptchaVerified(Boolean(captcha.current?.getValue()))}
          className="flex my-2 justify-evenly lg:justify-start"
        />
        {/* Campo señuelo: obliga al navegador a bloquear el envío mientras el
            captcha no esté resuelto, reutilizando su mensaje de validación. */}
        {!isCaptchaVerified && (
          <input
            type="checkbox"
            className="absolute left-[40%] bottom-7 -z-10 captcha-fake-field lg:left-[10%]"
            tabIndex="-1"
            onInvalid={e =>
              setValidationMessage(e, content.reCaptchaErrorMessage)
            }
            required
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-brand-yellow text-white font-bold h-10 w-full font-Poppins md:col-span-2 md:w-1/3 md:m-auto lg:col-span-1 lg:w-full"
      >
        {content.sendButton}
      </button>

      <SubmitDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        markdown={successMarkdown}
      />

      {formError && <p className="text-red-600">{formError}</p>}
    </form>
  )
}

export default ContactForm
