import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { IubendaCookieConsent } from "./iubendaComponent"
import Example from "./popup"
import { localePath } from "../lib/routes"

const Footer = ({ footerData, footerMenus, pageContext }) => {
  const currentYear = new Date().getFullYear()
  const location = useLocation()

  // Configuración de idioma y cookiePolicyId
  const iubendaConfig = {
    en: 44395300,
    es: 76904439,
    de: 91112901,
    fr: 21879201,
  }

  // Obtener cookiePolicyId correspondiente
  const cookiePolicyId = iubendaConfig[pageContext.langKey] || 44395300

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

  const links = menuData?.map(obj => ({
    to: localePath(pageContext.langKey, obj.slug),
    text: `${obj.title}`,
  }))
  const getLinkClass = to => {
    return location.pathname === to
      ? "transition ease-in-out drop-shadow-[1px_1px_rgba(0,0,0)] text-brand-yellow relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-brand-yellow"
      : "mt-4 drop-shadow-[1px_1px_rgba(0,0,0)] transition ease-in-out text-white hover:cursor-pointer hover:text-brand-yellow relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-brand-yellow before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300 before:ease-in-out sm:mr-10 lg:mt-0"
  }
  return (
    <footer className="w-full py-1 bg-brand-blue text-white lg:py-3">
      <div className="flex flex-col w-9/12 m-auto mx-auto contanier sm:flex-row sm:justify-evenly sm:w-11/12 lg:w-9/12 lg:justify-between lg:space-y-0">
        <ul className="items-center my-5 sm:flex sm:flex-wrap sm:m-0">
          {links?.map((link, index) => (
            <li key={index} className={getLinkClass(link.to)}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
          <Example
            iframeUrl={footerData.iFrameLinkOfTermsAndConditions}
            linkTitle={footerData.termsAndConditionsTitle}
          />
          <Example
            iframeUrl={footerData.iFrameLinkOfCookiePolicy}
            linkTitle={footerData.cookiePolicyTitle}
          />
          <Example
            iframeUrl={footerData.iFrameLinkOfPrivacyPolicy}
            linkTitle={footerData.privacyPolicyTitle}
          />
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
      <hr className="w-9/12 h-px mx-auto my-1 bg-brand-blue lg:my-3" />
      <div className="flex flex-col items-center m-auto mx-auto sm:w-9/12 contanier lg:flex-row-reverse lg:justify-between lg:space-y-0">
        <IubendaCookieConsent
          cookiePolicyId={cookiePolicyId}
          lang={pageContext.langKey}
        />
        <p>
          &copy; {"1998 - " + currentYear + " " + footerData.footerCopyright}
        </p>
      </div>
    </footer>
  )
}

export default Footer
