import React from "react"
import Slider from "react-slick"
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid"
import { GetAllReviews } from "../gql/allReviews"
import { useI18n } from "../hooks/useI18n"
import TripAdvisor from "../images/tripadvisor-logo.svg"
import Google from "../images/google-logo.svg"
import Facebook from "../images/facebook-logo.svg"

// Componente Review
const Review = ({ review, handleLinkClick, imageMapping, truncateReview }) => (
  <div className="m-2 p-4 border border-gray-300 bg-[#d9eaf9] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 md:m-3">
    <a
      href="view-original-review"
      onClick={e => handleLinkClick(e, review.reviewLink)}
      className="flex"
    >
      <img
        src={review.reviewImage.url}
        alt="Profile"
        className="w-12 h-12 mr-4 rounded-full"
      />
      <div>
        <h2 className="mb-2 text-lg font-bold">{review.reviewerName}</h2>
        <div className="flex items-center mb-2">
          {Array.from(Array(5), (_, i) => (
            <StarIcon
              key={i}
              className={`h-4 w-4 ${review.numberOfStars >= i + 1
                ? "text-yellow-500"
                : "text-gray-400"
                }`}
            />
          ))}
        </div>
      </div>
      <img
        src={imageMapping[review.reviewOrigin]}
        alt={`${review.reviewOrigin} Logo`}
        className="ml-auto"
      />
    </a>
    <p className="mt-3 text-[#1a1a1a] text-sm md:text-base">
      {truncateReview(review.review, 250)}
      {review.review.length > 250 && (
        <a
          href={review.reviewLink}
          onClick={e => handleLinkClick(e, review.reviewLink)}
          className="text-brand-blue ml-1 hover:underline"
        >
          {review.testimonial?.reviewsLinkText || "Read more"}
        </a>
      )}
    </p>
  </div>
)

// Componentes personalizados para las flechas
const PrevArrow = props => (
  <button {...props} className="slick-arrow custom-prev-arrow">
    <ChevronLeftIcon className="w-10 md:w-16" />
  </button>
)

const NextArrow = props => (
  <button {...props} className="slick-arrow custom-next-arrow">
    <ChevronRightIcon className="w-10 md:w-16" />
  </button>
)

const SLIDES_TO_SHOW_BREAKPOINTS = [
  { maxWidth: 599, slidesToShow: 1 },
  { maxWidth: 768, slidesToShow: 2 },
  { maxWidth: 1024, slidesToShow: 3 },
]

const resolveSlidesToShow = () => {
  if (typeof window === "undefined") return 3
  const match = SLIDES_TO_SHOW_BREAKPOINTS.find(
    b => window.innerWidth <= b.maxWidth
  )
  return match ? match.slidesToShow : 3
}

/**
 * react-slick solo re-evalúa `responsive` cuando el ancho de ventana cruza un
 * breakpoint DESPUÉS del montaje (usa matchMedia().addListener, que no
 * dispara en el mount inicial) — en un sitio server-rendered esto deja el
 * carrusel mostrando el slidesToShow de escritorio en la primera carga
 * mobile. Se calcula acá con window.innerWidth y se pasa como prop directa,
 * que sí se respeta en cada render.
 */
const useSlidesToShow = () => {
  const [slidesToShow, setSlidesToShow] = React.useState(resolveSlidesToShow)

  React.useEffect(() => {
    const handleResize = () => setSlidesToShow(resolveSlidesToShow())
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return slidesToShow
}

/** Config compartida de los carruseles de reseñas; función (no constante) porque
 * prevArrow/nextArrow son elementos JSX y cada <Slider> necesita su propia instancia. */
const getCarouselSettings = slidesToShow => ({
  infinite: true,
  speed: 500,
  slidesToShow,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
})

const ReviewsSlider = ({
  reviews,
  handleLinkClick,
  imageMapping,
  truncateReview,
  className,
}) => {
  const slidesToShow = useSlidesToShow()

  return (
    <Slider
      // Remonta al cruzar un breakpoint: react-slick no recalcula bien el
      // ancho de los slides si slidesToShow cambia en un componente ya vivo.
      key={slidesToShow}
      {...getCarouselSettings(slidesToShow)}
      className={`!flex [&_.slick-track]:flex [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full ${className}`}
    >
      {reviews.map((review, index) => (
        <Review
          key={index}
          review={review}
          handleLinkClick={handleLinkClick}
          imageMapping={imageMapping}
          truncateReview={truncateReview}
        />
      ))}
    </Slider>
  )
}

/**
 * Contenedor de reseñas.
 *
 * Unifica MapContainer (separa por origen) y MapContainerLayoutB (mezcla todo).
 * Ambos comparten la misma lógica de click, truncado y mapeo de imágenes.
 *
 * @param {object} props.pageContext  contexto de página de Gatsby
 * @param {boolean} props.shuffle     si true, mezcla todas las reseñas
 * @param {string} props.className    clase extra para el slider
 */
const ReviewsContainer = ({ pageContext, shuffle = false, className = "" }) => {
  const { localizedQuery } = useI18n(pageContext)
  const { data: allReviews, statusElement } = localizedQuery(
    GetAllReviews
  )
  if (statusElement) return statusElement

  const openReviewLink = url => {
    window.open(url, "Data", "height=700px,width=600px")
  }

  const handleLinkClick = (e, url) => {
    e.preventDefault()
    openReviewLink(url)
  }

  const truncateReview = (review, length) => {
    return review.length > length ? review.substring(0, length) + "..." : review
  }

  const imageMapping = {
    TripAdvisor: TripAdvisor,
    Google: Google,
    Facebook: Facebook,
    DefaultImage: null,
  }

  if (shuffle) {
    function shuffleArray(array) {
      const shuffledArray = [...array]
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ]
      }
      return shuffledArray
    }

    const shuffledReviews = shuffleArray([
      ...allReviews.googleReviews,
      ...allReviews.tripAdvisorReviews,
      ...allReviews.facebookReviews,
    ])

    return (
      <ReviewsSlider
        reviews={shuffledReviews}
        handleLinkClick={handleLinkClick}
        imageMapping={imageMapping}
        truncateReview={truncateReview}
        className={className}
      />
    )
  }

  return (
    <>
      {/* Reseñas de Google */}
      <ReviewsSlider
        reviews={allReviews.googleReviews}
        handleLinkClick={handleLinkClick}
        imageMapping={imageMapping}
        truncateReview={truncateReview}
        className="mb-5 lg:p-4"
      />

      {/* Reseñas de TripAdvisor */}
      <ReviewsSlider
        reviews={allReviews.tripAdvisorReviews}
        handleLinkClick={handleLinkClick}
        imageMapping={imageMapping}
        truncateReview={truncateReview}
        className="mb-10 lg:p-4"
      />

      {/* Reseñas de Facebook */}
      <ReviewsSlider
        reviews={allReviews.facebookReviews}
        handleLinkClick={handleLinkClick}
        imageMapping={imageMapping}
        truncateReview={truncateReview}
        className="mb-10 lg:p-4"
      />
    </>
  )
}

// Mantener nombres de exportación originales para no romper los imports
export const MapContainer = props => <ReviewsContainer {...props} />
export const MapContainerLayoutB = props => (
  <ReviewsContainer {...props} shuffle className="m-5" />
)
