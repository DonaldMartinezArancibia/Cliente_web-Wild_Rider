import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { IubendaPrivacyPolicy } from "./iubendaComponent"

const Footer = ({ footerData, footerMenus, pageContext }) => {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  //Retira los slug de los diferentes idiomas solamente para la pagina index
  function transformMenuElements(data) {
    if (data && data.menus && data.menus.length > 0) {
      const modifiedData = data.menus[1].menuElements.map(element => {
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
            ...data.menus[1],
            menuElements: modifiedData,
          },
        ],
      }
    }
    return data
  }
  const transformedMenuElementsData = transformMenuElements(footerMenus)
  const menuData = transformedMenuElementsData?.menus[0].menuElements
  const menu3Data = footerMenus?.menus[2].menuElements

  const links = menuData?.map(obj => ({
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
    <footer className="w-full py-1 bg-[#0833A2] text-white lg:py-3">
      <div className="flex flex-col items-center w-9/12 m-auto mx-auto contanier sm:flex-row sm:justify-evenly sm:w-11/12 lg:w-9/12 lg:justify-between lg:space-y-0">
        <ul className="flex items-center mb-1 space-x-8 sm:mb-0">
          {links?.map((link, index) => (
            <li key={index} className={getLinkClass(link.to)}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center space-x-8">
          {footerData.socialNetworks.map((network, index) => (
            <li key={index}>
              <a
                href={network.urlToSocialNetwork}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={network.socialNetworkLogo.url}
                  alt="Social Network Logo"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <hr className="w-9/12 h-px mx-auto my-1 bg-[#0833A2] lg:my-3" />
      <div className="flex flex-col items-center m-auto mx-auto sm:w-9/12 contanier lg:flex-row-reverse lg:justify-between lg:space-y-0">
        {/* <ul className="flex items-center w-full justify-evenly lg:w-auto lg:space-x-8">
          <li>
            <a href="#" rel="noopener noreferrer">
            {footerData.termsOfService}
            </a>
          </li>
          <li>
            <a href="#" rel="noopener noreferrer">
              {footerData.privacyPolicy}
            </a>
            </li>
          </ul> */}
        <ul className="flex items-center mb-1 space-x-8 sm:mb-0">
          <IubendaPrivacyPolicy />
          {/* {menu3Data?.map((link, index) => (
            <li key={index} className={getLinkClass(link.to)}>
              <Link to={`/${link.slug}`}>{link.title}</Link>
            </li>
          ))} */}
        </ul>
        <p>
          &copy; {"1998 - " + currentYear + " " + footerData.footerCopyright}
        </p>
      </div>
    </footer>
  )
}

export default Footer
