import { Post } from "./allPost"
import { Index } from "./indexQuery"
import { CarsAndQuote } from "./carsPageQuery"
import { AboutUsAndOurTeam } from "./aboutusPageQuery"
import { RentalInfo } from "./rentalInfoPageQuery"
import { Testimonial } from "./testimonialPageQuery"
import { Faq } from "./faqPageQuery"
import { ContactAndLocation } from "./contactQuery"
import { TravelPlanner } from "./travelPlannerPageQuery"
import { Car } from "./carsQuery"
import { CarQuoteForm } from "./carQuotePageQuery"
import { AirportAndOfficePage } from "./airportAndOfficePage"
import { CampingPage } from "./campingPage"
import { Insurance } from "./insurancePageQuery"
import { RoadSafety } from "./roadSafetyPageQuery"
import { Imprint } from "./imprintPageQuery"

const LOCALIZATION_QUERIES = [
  Index,
  Post,
  CarsAndQuote,
  AboutUsAndOurTeam,
  RentalInfo,
  Testimonial,
  Faq,
  ContactAndLocation,
  TravelPlanner,
  Car,
  CarQuoteForm,
  AirportAndOfficePage,
  CampingPage,
  Insurance,
  RoadSafety,
  Imprint,
]

/**
 * Query que devuelve las traducciones de un content type.
 *
 * Cada documento se llama igual que el tipo en Hygraph, así que basta con el
 * `remoteTypeName` que gatsby-node pone en el contexto de la página.
 */
export function getLocalizationQuery(remoteTypeName) {
  return LOCALIZATION_QUERIES.find(
    query => query.definitions[0].name.value === remoteTypeName
  )
}

export { LOCALIZATION_QUERIES }
