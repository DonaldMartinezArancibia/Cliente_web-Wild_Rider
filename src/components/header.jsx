import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { Transition } from "@headlessui/react"
import LanguageSelector from "./languajeSelector"
import { useApolloClient, useQuery } from "@apollo/client"
import { menuElements } from "../gql/menuElements"
import logo from "../images/LogoWEB Horizontal Amarillo Transparente.svg"
import headerImg from "../images/site-header-3000x516-1.jpg"

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

  const [isHidden, setIsHidden] = React.useState(false)

  const validateWindowSize = () => {
    setIsHidden(window.innerWidth > 1280)
    setUnHidden(window.innerWidth < 1280)
  }

  React.useEffect(() => {
    validateWindowSize()

    // Función para manejar el cambio en el tamaño de la pantalla
    const handleWindowResize = () => {
      validateWindowSize()
    }

    // Agregar el evento de cambio en el tamaño de la pantalla al montar el componente
    window.addEventListener("resize", handleWindowResize)

    // Limpia el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  const [unHidden, setUnHidden] = React.useState(false)

  React.useEffect(() => {
    validateWindowSize()
    // Función para manejar el cambio en el tamaño de la pantalla
    const handleWindowResize = () => {
      validateWindowSize()
    }

    // Agregar el evento de cambio en el tamaño de la pantalla al montar el componente
    window.addEventListener("resize", handleWindowResize)

    // Limpia el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  // Antes de realizar la consulta, verifica si pageContext.langKey está definido
  const langKey = pageContext && pageContext.langKey ? pageContext.langKey : ""

  const {
    data: menuElementsData,
    loading: menuElementsDataQueryLoading,
    error: menuElementsDataQueryError,
  } = useQuery(menuElements, {
    variables: { locale: [langKey] },
  })
  client.refetchQueries({
    include: [menuElements],
  })
  if (menuElementsDataQueryLoading) return <p>Loading...</p>
  if (menuElementsDataQueryError)
    return <p>Error : {menuElementsDataQueryError.message}</p>

  //Retira los slug de los diferentes idiomas solamente para la pagina index
  function transformMenuElements(data) {
    if (data && data.menus && data.menus.length > 0) {
      const modifiedData = data.menus[0].menuElements.map(element => {
        if (element.__typename === "Index") {
          return {
            ...element,
            slug: "", // Modificamos el valor del slug para Index a ""
          }
        }
        return element
      })

      return {
        ...data,
        menus: [
          {
            ...data.menus[0],
            menuElements: modifiedData,
          },
        ],
      }
    }
    return data
  }
  // Aplicamos la función de transformación al resultado de la consulta
  const transformedMenuElementsData = transformMenuElements(menuElementsData)
  const menuData = transformedMenuElementsData.menus[0].menuElements
  const links = menuData.map(obj => ({
    to:
      pageContext.langKey === "en"
        ? `/${obj.slug}`
        : `/${pageContext.langKey}/${obj.slug}`,
    text: `${obj.title}`,
  }))
  /*links.push(
    {
      to: "/reservation",
      text: "Rental Info",
    },
    {
      to: "/testimonials",
      text: "Testimonials",
    },
    {
      to: "/faq",
      text: "FAQ",
    },
    {
      to: "/travel-planner",
      text: "Travel Planner",
    },
    {
      to: "/videos-and-photos",
      text: "Videos & Photos",
    },
    {
      to: "/our-team",
      text: "Our Team",
    },
  )*/

  // console.log(links)
  const getLinkClass = to => {
    // console.log(location.pathname, to, location.pathname === to)
    return location.pathname === to
      ? "transition ease-in-out drop-shadow-[1px_1px_rgba(0,0,0)] text-[#f6cc4d] relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-[#f6cc4d]"
      : "drop-shadow-[1px_1px_rgba(0,0,0)] transition ease-in-out text-white hover:text-[#f6cc4d] relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-[#f6cc4d] before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300 before:ease-in-out"
  }

  return (
    <header className="w-full text-white font-Montserrat">
      {/* <p className="p-4 text-xl animate-textScroll whitespace-nowrap">
        Este párrafo se moverá de derecha a izquierda en vistas menores a 960px.
      </p> */}
      <div className="bg-[#4f5153] w-full lg:grid lg:grid-cols-[1fr_1fr_1fr_12%] lg:grid-rows-[1fr] p-[10px_10px_10px] rounded-tr-2xl rounded-tl-2xl">
        <img src={headerImg} alt="Profile" className="col-[1/5] w-full mb-4" />
        <div className="flex justify-between m-auto lg:m-0">
          <Link
            to={
              pageContext.langKey === "en"
                ? "/"
                : `/${pageContext.langKey || ""}`
            }
            className="self-center w-full"
          >
            <img src={logo} className="w-2/3 lg:w-full" alt="" />
          </Link>
          <div className="lg:m-auto xl:hidden">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="h-8 text-[#f6cc4d]"
                fill="none"
                viewBox="0 0 21 19"
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
        </div>
        <div className="self-center overflow-hidden text-center">
          <p className="my-2 px-6 font-medium animate-[textScroll_25s_linear_infinite] pl-[100%] lg:pl-0 lg:animate-[textScroll_0s_none] lg:whitespace-normal whitespace-nowrap">
            Call us toll-free from the U.S & Canada, from 8:00 to 18:00 Central
            Time and with skype from almost anywhere else:
          </p>
          <a
            href="tel:18007219821"
            title="Call us toll-free"
            className="text-4xl font-black"
          >
            1 (800) 721-9821
          </a>
        </div>
        <div className="grid min-[412px]:grid-cols-2">
          <div className="flex items-center col-span-1">
            <svg className="h-8 mr-2 lg:h-12" viewBox="0 0 448 510">
              <path
                fill="#fff"
                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
              />
            </svg>
            <div className="text-base">
              <p className="font-bold">Whatsapp CR</p>
              <p>+506-8973-2759</p>
            </div>
          </div>
          <div className="flex items-center col-span-1">
            <svg className="mr-2 h-7" viewBox="0 0 500 525">
              <path
                fill="#fff"
                d="M112 48V215.6L64 183V48 0h48H400h48V48 183l-48 32.6V48H112zM256 410l-27-18.3L48 268.9V464H464V268.9L283 391.7 256 410zM464 210.9l48-32.6v58V464v48H464 48 0V464 236.3v-58l48 32.6L256 352 464 210.9zM184 96H328h24v48H328 184 160V96h24zm0 80H328h24v48H328 184 160V176h24z"
              />
            </svg>
            <div className="text-base">
              <p className="font-bold">Email</p>
              <p>info@wildrider.com</p>
            </div>
          </div>
          <div className="flex items-center col-span-1">
            <svg className="mr-2 h-7 lg:h-10" viewBox="0 0 585 610">
              <path
                fill="#fff"
                d="M160 48c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H160zM104.6 32C115.6 12.9 136.3 0 160 0h48c23.7 0 44.4 12.9 55.4 32H320h24 24H512c35.3 0 64 28.7 64 64v48 24 24V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32h40.6zM96 80H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V192H360c-22.1 0-40-17.9-40-40V80H272V352c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V80zm272 0v64H528V96c0-8.8-7.2-16-16-16H368zm16 192a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM352 400a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM480 272a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM448 400a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"
              />
            </svg>
            <div className="text-base">
              <p className="font-bold">Phone CR</p>
              <p>+506-2258-4604</p>
            </div>
          </div>
          <div className="flex items-center col-span-1">
            <svg className="mr-2 h-7 lg:h-9" viewBox="0 0 520 545">
              <path
                fill="#fff"
                d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zm73 166.7c11.3-13.8 30.3-18.5 46.7-11.4l112 48c17.6 7.5 27.4 26.5 23.4 45.1l-24 112c-4 18.4-20.3 31.6-39.1 31.6l0 0c-6.1 0-12.2-.1-18.2-.4l-.1 0 0 0c-10-.4-19.8-1.1-29.6-2.2C175.2 485.6 0 295.2 0 64v0C0 45.1 13.2 28.8 31.6 24.9l112-24c18.7-4 37.6 5.8 45.1 23.4l48 112c7 16.4 2.4 35.4-11.4 46.7l-40.6 33.2c26.7 46 65.1 84.4 111.1 111.1L329 286.7zm133.8 78.1l-100.4-43L333 357.6c-14.9 18.2-40.8 22.9-61.2 11.1c-53.3-30.9-97.7-75.3-128.6-128.6c-11.8-20.4-7.1-46.3 11.1-61.2l35.9-29.4-43-100.4L48.1 70.5C51.5 286.2 225.8 460.5 441.5 464l21.3-99.2z"
              />
            </svg>
            <div className="text-base">
              <p className="font-bold">Phone U.S</p>
              <p>+1 786-623-4663</p>
            </div>
          </div>
        </div>
        {!unHidden && <LanguageSelector pageContext={pageContext} />}
      </div>
      <div className="flex items-center bg-[#0833A2] xl:py-10 w-full justify-between">
        {/* <h1 className="text-center text-[40px] leading-none tracking-wide">
          <Link to="/" className="font-bold text-black font-CarterOne">
          Wild Rider
          <br />
          <p className="text-[10px] font-Inter tracking-[.001px]">
          4x4 Car Rental & Travel Planner
          </p>
          </Link>
        </h1> */}
        <ul className="items-center hidden m-auto space-x-8 text-xl font-bold font-Poppins xl:flex">
          {links.map((link, index) => (
            <li key={index} className={getLinkClass(link.to)}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </ul>
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
            {!isHidden && <LanguageSelector pageContext={pageContext} />}
          </ul>
        </div>
      </Transition>
    </header>
  )
}
