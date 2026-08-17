import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { Transition } from "@headlessui/react"
import LanguageSelector from "./languajeSelector"
import { menuElements } from "../gql/menuElements"
import { headerAndFooterElements } from "../gql/headerandfooterElements"
import { useI18n } from "../hooks/useI18n"
import { localePath } from "../lib/routes"
import { transformMenuElements, createMenuLinks } from "../lib/menuUtils"

export default function Header({ pageContext }) {
  const { localizedQuery } = useI18n(pageContext)
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
  const [unHidden, setUnHidden] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      const isWide = window.innerWidth > 1280;
      setIsHidden(isWide);
      setUnHidden(!isWide);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const { data: headerAndFooterElementsData } = localizedQuery(
    headerAndFooterElements
  )

  const { data: menuElementsData, statusElement } = localizedQuery(
    menuElements
  )

  if (statusElement) return statusElement

  const langSelectorTitle =
    headerAndFooterElementsData?.headerAndFooterElements[0]

  //Retira los slug de los diferentes idiomas solamente para la pagina index
  const transformedMenuElementsData = transformMenuElements(menuElementsData, 3)
  const menuData = transformedMenuElementsData.menus[0].menuElements
  const links = createMenuLinks(
    menuData,
    pageContext.langKey,
    localePath
  )

  const getLinkClass = to => {
    // console.log(location.pathname, to, location.pathname === to)
    return location.pathname === to
      ? "transition ease-in-out drop-shadow-[1px_1px_rgba(0,0,0)] text-brand-yellow relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-brand-yellow"
      : "drop-shadow-[1px_1px_rgba(0,0,0)] transition ease-in-out text-white my-2 hover:text-brand-yellow relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-brand-yellow before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300 before:ease-in-out"
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
            <button type="button" aria-label="Abrir menú de navegación" onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="h-8 text-brand-yellow"
                fill="none"
                viewBox="0 1 25 19"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
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
              to={localePath(pageContext.langKey)}
              className="font-bold text-brand-yellow font-CarterOne"
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
      <div className="flex items-center bg-brand-blue xl:py-4 w-full justify-between">
        {/* <h1 className="text-center text-[40px] leading-none tracking-wide">
          <Link to="/" className="font-bold text-brand-yellow font-CarterOne">
            Wild Rider
            <br />
            <p className="text-base font-InterTight tracking-[.0001px]">
              4×4 Car Rental & Travel Planner
            </p>
          </Link>
        </h1> */}
        <ul className="hidden xl:px-5 xl:grid grid-cols-[auto] gap-x-12 m-auto text-lg font-bold font-Poppins sm:grid-cols-[auto_auto] md:grid-cols-[auto_auto_auto] lg:grid-cols-[auto_auto_auto_auto_auto_auto] xl:grid-cols-[auto_auto_auto_auto_auto_auto]">
          {links.map((link, index) => (
            <li
              key={index}
              className={`${getLinkClass(link.to)} ${index === 0
                  ? "col-span-1 row-span-3 content-center text-3xl before:bottom-8 before:top-16 lg:before:top-20 xl:before:top-16"
                  : ""
                }`}
            >
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>

      <Transition
        as="div"
        show={isOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0 invisible"
        enterTo="opacity-100 visible"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100 visible"
        leaveTo="opacity-0 invisible"
        className="fixed inset-0 z-10 w-screen h-screen p-0 m-0 overflow-hidden bg-black/10 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <Transition
        as="div"
        show={isOpen}
        enter="transition-transform transform duration-150"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform transform duration-150"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="fixed top-0 left-0 z-20 h-screen min-h-screen p-0 m-0 overflow-hidden bg-stone-700/50 w-80"
      >
        <div className="p-8">
          <ul className="space-y-5 text-center font-Poppins">
            {links.map((link, index) => (
              <li key={index} className={getLinkClass(link.to)}>
                <Link to={link.to} onClick={() => setIsOpen(false)}>{link.text}</Link>
              </li>
            ))}
            {!isHidden && (
              <li>
                <LanguageSelector
                  pageContext={pageContext}
                  langSelectorTitle={langSelectorTitle}
                  onSelect={() => setIsOpen(false)}
                />
              </li>
            )}
          </ul>
        </div>
      </Transition>
    </header>
  )
}