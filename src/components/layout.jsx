import * as React from "react"
import Header from "./header"
import Footer from "./footer"
import { StaticImage } from "gatsby-plugin-image"

export const Layout = ({ children, pageContext }) => {
  return (
    <>
      <Header pageContext={pageContext} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
