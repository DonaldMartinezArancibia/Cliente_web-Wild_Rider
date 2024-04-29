import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { Transition } from "@headlessui/react"
import LanguageSelector from "./languajeSelector"
import { useApolloClient, useQuery } from "@apollo/client"
import { menuElements } from "../gql/menuElements"
import { headerAndFooterElements } from "../gql/headerandfooterElements"
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
    data: headerAndFooterElementsData,
    loading: headerAndFooterElementsQueryLoading,
    error: headerAndFooterElementsQueryError,
  } = useQuery(headerAndFooterElements, {
    variables: { locale: [pageContext.langKey] },
  })
  client.refetchQueries({
    include: [headerAndFooterElements],
  })

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

  const langSelectorTitle =
    headerAndFooterElementsData?.headerAndFooterElements[0]

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

  const getLinkClass = to => {
    // console.log(location.pathname, to, location.pathname === to)
    return location.pathname === to
      ? "transition ease-in-out drop-shadow-[1px_1px_rgba(0,0,0)] text-[#f6cc4d] relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-[#f6cc4d]"
      : "drop-shadow-[1px_1px_rgba(0,0,0)] transition ease-in-out text-white hover:text-[#f6cc4d] relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-[#f6cc4d] before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300 before:ease-in-out"
  }

  return (
    <header className="w-full text-white font-Montserrat">
      <div className="bg-[#4f5153] w-full xl:grid xl:grid-cols-[1fr_1fr_1fr_12%] xl:grid-rows-[1fr] p-[10px_10px_10px] rounded-tr-2xl rounded-tl-2xl">
        <div className="relative xl:col-[1/5]">
          <img
            src={langSelectorTitle?.imageOverLogo?.url}
            alt={langSelectorTitle?.imageOverLogoAlt}
            className="w-full mb-4"
          />

          <div className="absolute transform -translate-y-1/2 top-1/2 left-6 xl:m-auto xl:hidden">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="h-8 text-[#f6cc4d]"
                fill="none"
                viewBox="0 1 25 19"
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

        <div className="flex justify-center m-auto lg:m-0">
          {/* <Link
            to={
              pageContext.langKey === "en"
                ? "/"
                : `/${pageContext.langKey || ""}`
            }
            className="self-center w-full"
          >
            <img src={logo} className="w-2/3 lg:w-full" alt="" />
          </Link> */}
          <h1 className="text-center text-[10vw] leading-none tracking-wide sm:w-2/5 sm:text-[5vw] xl:w-full xl:self-center">
            <Link
              to={
                pageContext.langKey === "en"
                  ? "/"
                  : `/${pageContext.langKey || ""}`
              }
              className="font-bold text-[#f6cc4d] font-CarterOne"
            >
              {langSelectorTitle?.logoTextTitle}
              <br />
              <p className="font-InterTight text-[.3em] tracking-[.0001px] xl:text-[.39em]">
                {langSelectorTitle?.logoTextSubtitle}
              </p>
            </Link>
          </h1>
        </div>
        <div className="self-center mt-2 overflow-hidden text-center">
          {langSelectorTitle?.displaySkypeTextAndNumber ? (
            <>
              <p className="my-2 px-6 font-medium animate-[textScroll_25s_linear_infinite] pl-[100%] lg:pl-0 lg:animate-[textScroll_0s_none] lg:whitespace-normal whitespace-nowrap">
                {langSelectorTitle.textOverSkypeNumber}
              </p>
              <a href="tel:18007219821" className="text-4xl font-black">
                {langSelectorTitle.skypeNumber}
              </a>
            </>
          ) : null}
        </div>
        <div className="grid min-[412px]:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2">
          {langSelectorTitle?.contactElements?.map((element, index) => (
            <div className="flex items-center col-span-1" key={index}>
              <img
                className="mr-2 h-7 lg:h-9"
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
        {!unHidden && (
          <LanguageSelector
            pageContext={pageContext}
            langSelectorTitle={langSelectorTitle}
          />
        )}
      </div>
      <div className="flex items-center bg-[#0833A2] xl:py-10 w-full justify-between">
        {/* <h1 className="text-center text-[40px] leading-none tracking-wide">
          <Link to="/" className="font-bold text-[#f6cc4d] font-CarterOne">
            Wild Rider
            <br />
            <p className="text-base font-InterTight tracking-[.0001px]">
              4×4 Car Rental & Travel Planner
            </p>
          </Link>
        </h1> */}
        <ul className="items-center hidden m-auto space-x-8 text-xl font-bold font-Poppins lg:flex-wrap lg:justify-evenly xl:flex">
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
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform transform duration-150"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="fixed top-0 left-0 z-20 h-screen min-h-screen p-0 m-0 overflow-hidden bg-opacity-50 bg-stone-700 w-80"
      >
        <div className="p-8">
          <ul className="space-y-8 text-center font-Poppins">
            {links.map((link, index) => (
              <li
                key={index}
                className={getLinkClass(link.to)}
                onClick={() => setIsOpen(false)}
              >
                <Link to={link.to}>{link.text}</Link>
              </li>
            ))}
            {!isHidden && (
              <div onClick={() => setIsOpen(false)}>
                <LanguageSelector
                  pageContext={pageContext}
                  langSelectorTitle={langSelectorTitle}
                />
              </div>
            )}
          </ul>
        </div>
      </Transition>
    </header>
  )
}
