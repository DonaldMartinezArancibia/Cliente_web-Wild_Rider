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
import OptimizedImage from "./ui/OptimizedImage"

// Componente Review
const Review = ({ review, handleLinkClick, imageMapping, truncateReview }) => (
  <div className="m-2 p-4 border border-gray-300 bg-[#d9eaf9] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 md:m-3">
    {/* href real: antes era "view-original-review", una ruta relativa que no
        existe y que los buscadores seguían hasta dar 404. El clic sigue
        abriendo el popup (handleLinkClick hace preventDefault). */}
    <a
      href={review.reviewLink || undefined}
      target="_blank"
      rel="noopener noreferrer"
      onClick={e => handleLinkClick(e, review.reviewLink)}
      className="flex"
    >
      <OptimizedImage
        src={review.reviewImage.url}
        alt="Profile"
        widths={[96]}
        width={48}
        height={48}
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
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => handleLinkClick(e, review.reviewLink)}
          className="text-brand-blue ml-1 underline"
        >
          {review.testimonial?.reviewsLinkText || "Read more"}
          {/* "Read more" suelto no dice a dónde lleva: se añade el autor para
              lectores de pantalla y buscadores. */}
          <span className="sr-only"> – {review.reviewerName}</span>
        </a>
      )}
    </p>
  </div>
)

const ARROW_LABELS = {
  en: { prev: "Previous reviews", next: "Next reviews" },
  es: { prev: "Reseñas anteriores", next: "Reseñas siguientes" },
  de: { prev: "Vorherige Bewertungen", next: "Nächste Bewertungen" },
  fr: { prev: "Avis précédents", next: "Avis suivants" },
}

// Componentes personalizados para las flechas. react-slick les pasa también
// currentSlide y slideCount; no deben llegar al <button> del DOM.
const PrevArrow = ({ onClick, style, label }) => (
  <button
    type="button"
    onClick={onClick}
    style={style}
    aria-label={label}
    className="slick-arrow custom-prev-arrow"
  >
    <ChevronLeftIcon className="w-10 md:w-16" aria-hidden="true" />
  </button>
)

const NextArrow = ({ onClick, style, label }) => (
  <button
    type="button"
    onClick={onClick}
    style={style}
    aria-label={label}
    className="slick-arrow custom-next-arrow"
  >
    <ChevronRightIcon className="w-10 md:w-16" aria-hidden="true" />
  </button>
)

const SLIDES_TO_SHOW_BREAKPOINTS = [
  { maxWidth: 599, slidesToShow: 1 },
  { maxWidth: 768, slidesToShow: 2 },
  { maxWidth: 1024, slidesToShow: 3 },
]

// PRNG determinista (mulberry32): la misma semilla da siempre el mismo orden.
const seededRandom = seed => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const shuffleWithSeed = (array, seed) => {
  const random = seededRandom(seed)
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

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
  // Arranca en 3, igual que el servidor: si el primer render del navegador
  // usara window.innerWidth, el HTML no coincidiría y fallaría la hidratación.
  // El efecto de abajo lo ajusta al ancho real justo después de montar.
  const [slidesToShow, setSlidesToShow] = React.useState(3)

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
const getCarouselSettings = (slidesToShow, langKey) => ({
  infinite: true,
  speed: 500,
  slidesToShow,
  slidesToScroll: 1,
  prevArrow: <PrevArrow label={(ARROW_LABELS[langKey] ?? ARROW_LABELS.en).prev} />,
  nextArrow: <NextArrow label={(ARROW_LABELS[langKey] ?? ARROW_LABELS.en).next} />,
})

const ReviewsSlider = ({
  reviews,
  handleLinkClick,
  imageMapping,
  truncateReview,
  className,
  langKey,
}) => {
  const slidesToShow = useSlidesToShow()
  const containerRef = React.useRef(null)

  // react-slick marca con aria-hidden las diapositivas fuera de vista y las
  // clonadas, pero los enlaces de dentro siguen siendo enfocables, y eso rompe
  // el árbol de accesibilidad. `inert` las saca del foco y de ese árbol.
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const syncInert = () => {
      container.querySelectorAll(".slick-slide").forEach(slide => {
        slide.inert = slide.getAttribute("aria-hidden") === "true"
      })
    }

    syncInert()
    const observer = new MutationObserver(syncInert)
    observer.observe(container, {
      attributes: true,
      attributeFilter: ["aria-hidden"],
      childList: true,
      subtree: true,
    })
    return () => observer.disconnect()
  }, [slidesToShow])

  return (
    // display: contents: el contenedor no altera el layout del slider.
    <div ref={containerRef} className="contents">
      <Slider
        // Remonta al cruzar un breakpoint: react-slick no recalcula bien el
        // ancho de los slides si slidesToShow cambia en un componente ya vivo.
        key={slidesToShow}
        {...getCarouselSettings(slidesToShow, langKey)}
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
    </div>
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

  // La mezcla no puede ocurrir durante el render: el servidor y el navegador
  // sacarían órdenes distintos y la hidratación fallaría (error #418). Se
  // renderiza en el orden original y la semilla se elige tras montar. Una
  // semilla fija evita que se vuelvan a mezclar cuando Apollo revalida.
  const [shuffleSeed, setShuffleSeed] = React.useState(null)
  React.useEffect(() => {
    if (shuffle) setShuffleSeed(Math.floor(Math.random() * 2 ** 32))
  }, [shuffle])

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
    const combinedReviews = [
      ...allReviews.googleReviews,
      ...allReviews.tripAdvisorReviews,
      ...allReviews.facebookReviews,
    ]
    const shuffledReviews =
      shuffleSeed === null
        ? combinedReviews
        : shuffleWithSeed(combinedReviews, shuffleSeed)

    return (
      <ReviewsSlider
        reviews={shuffledReviews}
        handleLinkClick={handleLinkClick}
        imageMapping={imageMapping}
        truncateReview={truncateReview}
        langKey={pageContext?.langKey}
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
        langKey={pageContext?.langKey}
        className="mb-5 lg:p-4"
      />

      {/* Reseñas de TripAdvisor */}
      <ReviewsSlider
        reviews={allReviews.tripAdvisorReviews}
        handleLinkClick={handleLinkClick}
        imageMapping={imageMapping}
        truncateReview={truncateReview}
        langKey={pageContext?.langKey}
        className="mb-10 lg:p-4"
      />

      {/* Reseñas de Facebook */}
      <ReviewsSlider
        reviews={allReviews.facebookReviews}
        handleLinkClick={handleLinkClick}
        imageMapping={imageMapping}
        truncateReview={truncateReview}
        langKey={pageContext?.langKey}
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
