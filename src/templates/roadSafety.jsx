import React from "react"
import { RoadSafetyContent } from "../gql/roadSafetyPageQuery"
import ToggleContentPage from "../components/pages/ToggleContentPage"

const RoadSafety = ({ pageContext }) => (
  <ToggleContentPage
    pageContext={pageContext}
    query={RoadSafetyContent}
    selectPage={data => data?.roadSafeties?.[0]}
  />
)

export default RoadSafety
