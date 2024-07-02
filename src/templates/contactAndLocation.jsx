import React, { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import parkingWR1 from "../images/Captura de pantalla 2023-09-06 124559(2).png"
import parkingWR2 from "../images/Captura de pantalla 2023-09-06 124559 (1).png"

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
    <main className="py-10 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-30rem_top_-15rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%] lg:grid lg:grid-cols-[1fr_1fr] lg:p-16 min-[2000px]:grid-cols-[35%_35%_30%]">
      <h1 className="font-CarterOne lg:text-5xl lg:col-[1/3] min-[2000px]:col-[1/4] min-[2000px]:row-[1/2]">
        Contact & Location
      </h1>
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="m-2 md:grid md:grid-cols-[1fr_1fr] md:grid-rows-[1fr] md:gap-x-4 md:gap-y-2 lg:grid-cols-1 lg:my-5"
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
              className="my-2 font-black font-Poppins w-full"
            >
              Name*:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Name"
              className="h-10 w-full"
              required
            />
          </div>
          <div className="flex flex-col justify-between w-1/2 pl-3">
            <label
              htmlFor="surname"
              className="my-2 font-black font-Poppins w-full"
            >
              Surname*:
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Surname"
              className="h-10 w-full"
              required
            />
          </div>
        </fieldset>

        <fieldset
          className="flex flex-row"
          role="group"
          aria-label="Correo Electrónico"
        >
          <div className="flex flex-col justify-between w-1/2 pr-3">
            <label
              htmlFor="correo"
              className="my-2 font-black font-Poppins w-full"
            >
              Email*:
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              className="h-10 w-full"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col justify-between w-1/2 pl-3">
            <label
              htmlFor="correoconfirm"
              className="my-2 font-black font-Poppins w-full"
            >
              Confirm Email*:
            </label>
            <input
              type="email"
              id="correoconfirm"
              name="correoconfirm"
              className="h-10 w-full"
              placeholder="Confirm Email"
              required
            />
          </div>
        </fieldset>

        <fieldset
          className="flex flex-row"
          role="group"
          aria-label="Número de Teléfono"
        >
          <div className="flex flex-col justify-between w-1/2 pr-3">
            <label
              htmlFor="countryCode"
              className="my-2 font-black font-Poppins w-full"
            >
              Country Code:
            </label>
            <input
              type="tel"
              id="countryCode"
              name="countryCode"
              pattern="[0-3]{3}"
              placeholder="+01"
              className="h-10 w-full"
            />
          </div>

          <div className="flex flex-col justify-between w-1/2 pl-3">
            <label
              htmlFor="telefono"
              className="my-2 font-black font-Poppins w-full"
            >
              Phone number:
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              pattern="[0-9]{10}"
              placeholder="Ej. 1234567890"
              className="h-10 w-full"
            />
          </div>
        </fieldset>

        <fieldset
          className="flex flex-col md:row-span-2"
          role="group"
          aria-label="Mensaje"
        >
          <label htmlFor="mensaje" className="my-2 font-black font-Poppins">
            Message*:
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="5"
            required
            placeholder="Message"
            className="lg:h-16"
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
          className="bg-[#F6CC4D] text-white h-10 w-full font-Poppins md:col-span-2 md:w-1/3 md:m-auto lg:col-span-1 lg:w-full"
        >
          SEND
        </button>
      </form>

      <div className="grid mb-5 mx-3 min-[412px]:grid-cols-3 md:justify-items-center md:my-8 lg:col-[1/2] lg:row-[3/4]">
        <div className="flex items-center col-span-1">
          <svg className="h-8 mr-2 lg:h-12" viewBox="0 0 448 510">
            <path
              fill="#000"
              d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
            />
          </svg>
          <div className="text-base">
            <p className="font-bold">Whatsapp</p>
            <p>+506-8973-2759</p>
          </div>
        </div>
        <div className="flex items-center col-span-1">
          <svg className="mr-2 h-7 lg:h-10" viewBox="0 0 585 610">
            <path
              fill="#000"
              d="M160 48c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H160zM104.6 32C115.6 12.9 136.3 0 160 0h48c23.7 0 44.4 12.9 55.4 32H320h24 24H512c35.3 0 64 28.7 64 64v48 24 24V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32h40.6zM96 80H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V192H360c-22.1 0-40-17.9-40-40V80H272V352c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V80zm272 0v64H528V96c0-8.8-7.2-16-16-16H368zm16 192a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM352 400a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM480 272a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM448 400a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"
            />
          </svg>
          <div className="text-base">
            <p className="font-bold">Central Time</p>
            <p>8:00 - 18:00</p>
          </div>
        </div>
        <div className="flex items-center col-span-1">
          <svg className="mr-2 h-7" viewBox="0 0 500 525">
            <path
              fill="#000"
              d="M112 48V215.6L64 183V48 0h48H400h48V48 183l-48 32.6V48H112zM256 410l-27-18.3L48 268.9V464H464V268.9L283 391.7 256 410zM464 210.9l48-32.6v58V464v48H464 48 0V464 236.3v-58l48 32.6L256 352 464 210.9zM184 96H328h24v48H328 184 160V96h24zm0 80H328h24v48H328 184 160V176h24z"
            />
          </svg>
          <div className="text-base">
            <p className="font-bold">Email</p>
            <p>info@wildrider.com</p>
          </div>
        </div>
      </div>

      <div className="w-11/12 m-auto mb-4 md:w-1/2 lg:row-[2/3] lg:col-[2/3] lg:w-10/12 min-[2000px]:row-[2/3]">
        <img
          src={parkingWR1}
          alt="Profile"
          className="mb-10 min-[2000px]:mx-auto"
        />
        <img src={parkingWR2} alt="Profile" className="min-[2000px]:m-auto" />
      </div>

      <p className="mx-3 font-semibold lg:w-10/12 lg:justify-self-center">
        Calle Alajuela, behind City Mall, from “Molinos de Costa Rica” 300
        meters South. Alajuela, Costa Rica
      </p>

      <iframe
        width="360"
        height="300"
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=wild%20rider&t=&z=18&ie=UTF8&iwloc=&output=embed"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        className="w-11/12 m-auto my-5 lg:col-[1/3] lg:w-[95%] rounded-xl shadow-md min-[2000px]:row-[2/3] min-[2000px]:col-[3/4] min-[2000px]:w-full min-[2000px]:h-full min-[2000px]:-mt-2"
      ></iframe>
      <a
        target="_blank"
        href="https://goo.gl/maps/KVoab3br7v4zSjoCA"
        className="lg:col-[1/3] min-[2000px]:col-[3/4] min-[2000px]:row-[3/4]"
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
