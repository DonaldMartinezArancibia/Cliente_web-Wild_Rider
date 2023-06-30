import * as React from "react"
import Header from "./header"
import Footer from "./footer"
// import { StaticImage } from "gatsby-plugin-image"

export const Layout = ({ children, pageContext }) => {
  return (
    <>
      {/* <StaticImage
        src="../images/site-header-3000x516-1.jpg"
        alt="Profile"
        className="w-full"
      /> */}
      <Header pageContext={pageContext} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
