import * as React from "react"
import Header from "./header"
import Footer from "./footer"
import { headerAndFooterElements } from "../gql/headerandfooterElements"
import { useApolloClient, useQuery } from "@apollo/client"
import { StaticImage } from "gatsby-plugin-image"

export const Layout = ({ children, pageContext }) => {
  const client = useApolloClient()
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
  return (
    <>
      <Header pageContext={pageContext} />
      {children}
      {headerAndFooterElementsData && (
        <Footer
          footerData={headerAndFooterElementsData.headerAndFooterElements[0]}
        />
      )}
    </>
  )
}

export default Layout
