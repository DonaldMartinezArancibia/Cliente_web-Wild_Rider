import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { Transition } from "@headlessui/react"
import { StaticImage } from "gatsby-plugin-image"
import LanguageSelector from "./languajeSelector"
import { useApolloClient, useQuery } from "@apollo/client"
import { menuElements } from "../gql/menuElements"

export default function Header({ pageContext }) {
  const client = useApolloClient()
  const [isOpen, setIsOpen] = React.useState(false)
  const location = useLocation()

  React.useEffect(() => {
    if (isOpen) {
      const gatsbyElement = document.getElementById("gatsby-focus-wrapper")
      if (gatsbyElement) {
        gatsbyElement.classList.add("m-0", "h-screen", "overflow-hidden")
      }
    } else {
      const gatsbyElement = document.getElementById("gatsby-focus-wrapper")
      if (gatsbyElement) {
        gatsbyElement.classList.remove("m-0", "h-screen", "overflow-hidden")
      }
    }
  }, [isOpen])

  const {
    data: menuElementsData,
    loading: menuElementsDataQueryLoading,
    error: menuElementsDataQueryError,
  } = useQuery(menuElements, {
    variables: { locale: [pageContext.langKey] },
  })
  client.refetchQueries({
    include: [menuElements],
  })
  if (menuElementsDataQueryLoading) return <p>Loading...</p>
  if (menuElementsDataQueryError)
    return <p>Error : {menuElementsDataQueryError.message}</p>
  const menuData = menuElementsData.menus[0].menuElements

  const links = menuData.map(obj => ({
    to:
      pageContext.langKey === "en"
        ? `/${obj.slug}`
        : `/${pageContext.langKey}/${obj.slug}/`,
    text: `${obj.title}`,
  }))
  links.push(
    {
      to: "/our-cars",
      text: "Our Cars",
    },
    {
      to: "/videos-and-photos",
      text: "Videos & Photos",
    },
    {
      to: "/reservation",
      text: "Reservation",
    },
    {
      to: "/testimonials",
      text: "Testimonials",
    },
    {
      to: "/our-team",
      text: "Our Team",
    },
    {
      to: "/travel-planner",
      text: "Travel Planner",
    },
    {
      to: "/faq",
      text: "FAQ",
    }
  )

  // console.log(links)
  const getLinkClass = to => {
    return location.pathname === to
      ? "transition ease-in-out border-[#f6cc4d] border-b-[3.7px] py-2 drop-shadow-[1px_1px_#f6cc4d]"
      : "drop-shadow-[1px_1px_rgba(0,0,0)] transition ease-in-out text-white hover:text-[#f6cc4d] relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-[#f6cc4d] before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300 before:ease-in-out"
  }

  return (
    <header className="w-full">
      {/* <LanguageSelector pageContext={pageContext} /> */}
      <div className="flex items-center bg-[#0833A2] mx-auto xl:px-10 w-full justify-between">
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
          className="w-72 xl:mr-12"
        >
          <StaticImage
            src="../images/Logo Horizontal Amarillo Transparente.svg"
            alt=""
          />
        </Link>
        <div>
          <div className="mr-5 xl:hidden">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#f6cc4d]"
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
          </div>

          <ul className="items-center hidden space-x-8 text-lg font-Poppins xl:flex">
            {links.map((link, index) => (
              <li key={index} className={getLinkClass(link.to)}>
                <Link to={link.to}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0 invisible"
        enterTo="opacity-100 visible"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100 visible"
        leaveTo="opacity-0 invisible"
        className="fixed inset-0 z-10 w-screen h-screen p-0 m-0 overflow-hidden bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm"
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
        className="fixed top-0 right-0 z-20 h-screen min-h-screen p-0 m-0 overflow-hidden bg-opacity-50 bg-stone-700 w-80"
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
    </header>
  )
}
