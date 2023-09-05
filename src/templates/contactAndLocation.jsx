import React, { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

export default function useContactAndLocation({ pageContext }) {
  const captcha = useRef(null)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)

  const onChange = () => {
    if (captcha.current.getValue()) {
      console.log("Usuario real")
      setIsCaptchaVerified(true) // Marcar como verificado cuando se obtenga una respuesta válida
    }
  }

  return (
    <main>
      <h1 className="font-CarterOne">Contact & Location</h1>
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        {/* You still need to add the hidden input with the form name to your JSX form */}
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <input type="hidden" name="form-name" value="contact" />
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" />
        </div>
        <div>
          <label htmlFor="telefono">Número de Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            pattern="[0-9]{10}"
            placeholder="Ej. 1234567890"
          />
        </div>
        <div>
          <label htmlFor="correo">Correo Electrónico:</label>
          <input type="email" id="correo" name="correo" />
        </div>
        <div>
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea id="mensaje" name="mensaje" rows="4"></textarea>
        </div>
        <div className="relative captcha">
          <ReCAPTCHA
            ref={captcha}
            sitekey="6Lf0V-0nAAAAAEENM44sYr38XhTfqXbPoGJNZ651"
            onChange={onChange}
          />
          {!isCaptchaVerified && (
            <input
              type="checkbox"
              className="absolute left-5 bottom-7 -z-10 captcha-fake-field"
              tabIndex="-1"
              required
            />
          )}
        </div>
        <button type="submit">Enviar</button>
      </form>
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            width="600"
            height="500"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=wild%20rider&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </div>
      </div>
    </main>
  )
}
