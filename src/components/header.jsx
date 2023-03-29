import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { Transition } from "@headlessui/react"
import { StaticImage } from "gatsby-plugin-image"
import LanguageSelector from "./languajeSelector"

export default function Header({ pageContext }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const location = useLocation()
  const links = [
    { to: "/cars-and-quote/", text: "Cars and Quote" },
    { to: "/long-time-rental/", text: "Long time rental" },
    { to: "/quote/", text: "Contact" },
  ]

  React.useEffect(() => {
    document.querySelector("html").style.overflow = isOpen ? "hidden" : ""
  }, [isOpen])
  const getLinkClass = to => {
    return location.pathname === to
      ? "transition ease-in-out border-[#f6cc4d] border-b-[3.7px] py-2"
      : "transition ease-in-out text-white hover:text-[#f6cc4d] relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-[#f6cc4d] before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300 before:ease-in-out"
  }
  return (
    <header className="w-full">
      <LanguageSelector pageContext={pageContext} />
      <div className="flex items-center bg-[#0833A2] mx-auto xl:px-10 w-full">
        {/* <h1 className="text-center text-[40px] leading-none tracking-wide">
          <Link to="/" className="font-bold text-black font-CarterOne">
            Wild Rider
            <br />
            <p className="text-[10px] font-Inter tracking-[.001px]">
              4x4 Car Rental & Travel Planner
            </p>
          </Link>
        </h1> */}
        <Link
          to={
            pageContext.langKey === "en" ? "/" : `/${pageContext.langKey || ""}`
          }
          className="w-72 xl:mr-52"
        >
          <StaticImage
            src="../images/Logo Horizontal Amarillo Transparente.svg"
            alt=""
          />
        </Link>
        <div>
          <div className="lg:hidden">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Transition
              show={isOpen}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0 invisible"
              enterTo="opacity-100 visible"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100 visible"
              leaveTo="opacity-0 invisible"
              className="fixed inset-0 z-10 bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            ></Transition>

            <Transition
              show={isOpen}
              enter="transition-transform transform duration-150"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform transform duration-150"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
              className="absolute top-0 right-0 z-20 min-h-screen bg-opacity-50 bg-gray-50 w-80"
            >
              <div className="p-8">
                <ul className="space-y-8 text-center font-Poppins">
                  {links.map((link, index) => (
                    <li key={index} className={getLinkClass(link.to)}>
                      <Link to={link.to}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Transition>
          </div>

          <ul className="items-center hidden space-x-8 text-lg font-Poppins lg:flex">
            {links.map((link, index) => (
              <li key={index} className={getLinkClass(link.to)}>
                <Link to={link.to}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
