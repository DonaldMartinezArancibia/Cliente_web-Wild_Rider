import * as React from "react"

const Footer = ({ footerData }) => {
  return (
    <footer className="w-full py-1 bg-[#0833A2] text-white lg:py-3">
      <div className="flex flex-col items-center w-9/12 m-auto mx-auto contanier sm:flex-row sm:justify-evenly sm:w-11/12 lg:w-9/12 lg:justify-between lg:space-y-0">
        <ul className="flex items-center mb-1 space-x-8 sm:mb-0 ">
          <li>
            <a href="#" rel="noopener noreferrer">
              {footerData.aboutUs}
            </a>
          </li>
          <li>
            <a href="#" rel="noopener noreferrer">
              {footerData.contact}
            </a>
          </li>
          <li>
            <a href="#" rel="noopener noreferrer">
              {footerData.explore}
            </a>
          </li>
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
        <ul className="flex items-center w-full justify-evenly lg:w-auto lg:space-x-8">
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
        </ul>
        <p>{footerData.footerCopyright}</p>
      </div>
    </footer>
  )
}

export default Footer
