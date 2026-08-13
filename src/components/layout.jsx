import * as React from "react"
import Header from "./header"
import Footer from "./footer"
import { headerAndFooterElements } from "../gql/headerandfooterElements"
import { menuElements } from "../gql/menuElements"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import { SiteDataProvider } from "../context/siteData"
import { DEFAULT_LOCALE } from "../config/locales"

export const Layout = ({ children, pageContext }) => {
  // Las páginas que no genera gatsby-node (p. ej. la 404) llegan sin langKey.
  const localizedContext = {
    ...pageContext,
    langKey: pageContext?.langKey || DEFAULT_LOCALE,
  }

  const { data: headerAndFooterData } = useLocalizedQuery(
    headerAndFooterElements,
    localizedContext
  )
  const { data: menusData } = useLocalizedQuery(menuElements, localizedContext)

  const headerAndFooter = headerAndFooterData?.headerAndFooterElements?.[0]

  const siteData = React.useMemo(
    () => ({
      headerAndFooter,
      menus: menusData,
      // Código de idioma del contenido en Hygraph; lo consumen widgets de
      // terceros (reCAPTCHA) a través de `useContentLangKey`.
      contentLangKey: headerAndFooter?.langKey,
    }),
    [headerAndFooter, menusData]
  )

  return (
    <SiteDataProvider value={siteData}>
      <Header pageContext={pageContext} />
      {children}
      {headerAndFooter && (
        <Footer
          footerData={headerAndFooter}
          footerMenus={menusData}
          pageContext={pageContext}
        />
      )}
    </SiteDataProvider>
  )
}

export default Layout
