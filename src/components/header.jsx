import * as React from "react"
import { Link } from "gatsby"
import { Transition } from "@headlessui/react"

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <header className="w-full py-8">
      <div className="container mx-auto xl:px-24 flex items-center justify-between">
        <div>
          <Link to="/" className="font-bold text-lg text-black">
            BlogRentaCar
          </Link>
        </div>
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
              className="absolute top-0 right-0 z-20 min-h-screen bg-gray-50 bg-opacity-50 w-80"
            >
              <div className="p-8">
                <ul className="space-y-8 text-center">
                  <li>
                    <Link to="/car-and-rentals">Car and rentals</Link>
                  </li>
                  <li>
                    <Link to="/long-time-rental">Long time rental</Link>
                  </li>
                  <li>
                    <Link to="/quote">Quote</Link>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>

          <ul className="hidden lg:flex items-center space-x-8">
            <li>
              <Link to="/car-and-rentals">Car and rentals</Link>
            </li>
            <li>
              <Link to="/long-time-rental">Long time rental</Link>
            </li>
            <li>
              <Link to="/quote">Quote</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
