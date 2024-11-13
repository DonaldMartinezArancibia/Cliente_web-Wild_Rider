import React, { useState, Fragment, useRef } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { IubendaCookieConsent } from "./iubendaComponent"
import Example from "./popup"

const Footer = ({ footerData, footerMenus, pageContext }) => {
  const currentYear = new Date().getFullYear()
  const location = useLocation()

  const cancelButtonRef = useRef(null)

  let [isOpen, setOpen] = useState(false)

  function open() {
    setOpen(true)
  }

  function close() {
    setOpen(false)
  }

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
  const menu3Data = footerMenus?.menus[2].menuElements

  const links = menuData?.map(obj => ({
    to:
      pageContext.langKey === "en"
        ? `/${obj.slug}`
        : `/${pageContext.langKey}/${obj.slug}`,
    text: `${obj.title}`,
  }))
  const getLinkClass = to => {
    return location.pathname === to
      ? "transition ease-in-out drop-shadow-[1px_1px_rgba(0,0,0)] text-[#f6cc4d] relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-[#f6cc4d]"
      : "mt-4 drop-shadow-[1px_1px_rgba(0,0,0)] transition ease-in-out text-white hover:cursor-pointer hover:text-[#f6cc4d] relative before:content-[''] before:absolute before:bottom-0 before:top-8 before:left-0 before:right-0 before:h-[3px] before:rounded-3xl before:bg-[#f6cc4d] before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300 before:ease-in-out sm:mr-10 lg:mt-0"
  }
  return (
    <footer className="w-full py-1 bg-[#0833A2] text-white lg:py-3">
      <div className="flex flex-col w-9/12 m-auto mx-auto contanier sm:flex-row sm:justify-evenly sm:w-11/12 lg:w-9/12 lg:justify-between lg:space-y-0">
        <ul className="items-center my-5 sm:flex sm:flex-wrap sm:m-0">
          {links?.map((link, index) => (
            <li key={index} className={getLinkClass(link.to)}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
          {/* <li onClick={open} className={`${getLinkClass()} !mr-0`}>
            {footerData.imprintTitle}
          </li> */}
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
      <hr className="w-9/12 h-px mx-auto my-1 bg-[#0833A2] lg:my-3" />
      <div className="flex flex-col items-center m-auto mx-auto sm:w-9/12 contanier lg:flex-row-reverse lg:justify-between lg:space-y-0">
        <IubendaCookieConsent
          cookiePolicyId={cookiePolicyId}
          lang={pageContext.langKey}
        />
        <p>
          &copy; {"1998 - " + currentYear + " " + footerData.footerCopyright}
        </p>
      </div>
      {/* <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-9/12">
                  <div className="px-4 py-3 text-right bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6 md:-mb-8">
                    <button
                      type="button"
                      className="z-10 inline-flex justify-center px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="px-1 pb-4 bg-white">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                        <div
                          id="contentBelowVideo"
                          className="!max-w-full !text-base px-2 md:px-4 md:mx-4 md:mb-8 prose lg:prose-lg xl:prose-xl xl:px-6"
                        >
                          <ReactMarkdown>
                            {footerData.imprintDetailText.markdown}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root> */}
    </footer>
  )
}

export default Footer
