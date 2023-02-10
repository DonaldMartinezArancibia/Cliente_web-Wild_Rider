import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { Transition } from "@headlessui/react"

const Header = () => {
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
      ? "text-indigo-600 border-indigo-600 border-b-2 py-2"
      : "hover:text-indigo-600"
  }

  return (
    <header className="w-full py-8">
      <div className="container flex items-center justify-between mx-auto xl:px-24">
        <h1 className="text-center text-[40px] leading-none tracking-wide">
          <Link to="/" className="font-bold text-black font-CarterOne">
            Wild Rider
            <br />
            <p className="text-[10px] font-Inter tracking-[.001px]">
              4x4 Car Rental & Travel Planner
            </p>
          </Link>
        </h1>
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

          <ul className="items-center hidden space-x-8 font-Poppins lg:flex">
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

export default Header
