import React from "react"
import { InsuranceContent } from "../gql/insurancePageQuery"
import ToggleContentPage from "../components/pages/ToggleContentPage"

const Insurance = ({ pageContext }) => (
  <ToggleContentPage
    pageContext={pageContext}
    query={InsuranceContent}
    selectPage={data => data?.insurances?.[0]}
  />
)

export default Insurance
