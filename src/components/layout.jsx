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

  // Puedes clonar el elemento children y pasarle datos adicionales utilizando React.cloneElement
  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child, {
      headerAndFooterData:
        headerAndFooterElementsData?.headerAndFooterElements[0].langKey, // Puedes ajustar esto según tus necesidades
    })
  })

  return (
    <>
      <Header pageContext={pageContext} />
      {childrenWithProps}
      {headerAndFooterElementsData && (
        <Footer
          footerData={headerAndFooterElementsData.headerAndFooterElements[0]}
        />
      )}
    </>
  )
}

export default Layout
