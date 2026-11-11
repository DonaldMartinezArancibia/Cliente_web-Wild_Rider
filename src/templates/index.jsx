import React from "react"
import { Link } from "gatsby"
import ReactMarkdown from "react-markdown"
import { IndexContent } from "../gql/indexQuery"
import { useLocalizedQuery } from "../hooks/useLocalizedQuery"
import { useDocumentSeo } from "../hooks/useDocumentSeo"
import { MapContainerLayoutB } from "../components/reviewsHygraph"
import VideoPlayer from "../components/ui/videoPlayer"
import StickyBar from "../components/ui/StickyBar"
import TemplateBase from "../components/TemplateBase"
import OptimizedImage from "../components/ui/OptimizedImage"
import { markdownComponents } from "../lib/markdown"

const OPEN_GRAPH = {
  description:
    "Explora Costa Rica con nuestros vehículos 4x4. ¡Reserva hoy y empieza tu aventura!",
  image: "https://media.graphassets.com/OwrVgNoEQRK7vun9ALNj",
  imageAlt:
    "Alquiler de autos 4x4 todo terreno en Costa Rica, ideales para explorar montañas y selvas",
  url: "https://wild-rider.com/",
  type: "website",
}

const THIRD_PARTY_SCRIPTS = [
  {
    id: "tripadvisor-widget",
    src: "https://www.jscache.com/wejs?wtype=certificateOfExcellence&uniq=142&locationId=6539830&lang=es&year=2024&display_version=2",
    attributes: { "data-loadtrk": "" },
  },
]


/** Insignia flotante de TripAdvisor. */
const TripAdvisorBadge = () => (
  <div className="fixed bottom-4 right-4 z-50 bg-white shadow-lg rounded-lg p-3">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.tripadvisor.es/Attraction_Review-g309224-d6539830-Reviews-Wild_Rider-Alajuela_Province_of_Alajuela.html"
    >
      <img
        src="https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_2024_LL.png"
        alt="TripAdvisor"
        className="w-20 h-auto transition-transform duration-300 hover:scale-110"
      />
    </a>
  </div>
)

/**
 * Título de sección con el guion largo de la maqueta.
 * Es un h2 (antes h4, que saltaba de nivel desde el h1) con el tamaño de h4.
 */
const SectionTitle = ({ children, className = "" }) => (
  <h2
    className={`text-[20px] text-brand-blue font-black font-Inter tracking-widest uppercase mb-8 xl:pl-16 ${className}`}
  >
    — {children}
  </h2>
)

/**
 * Ancho que hace falta para un ícono de beneficio: se muestra a 48 px de alto
 * (h-12), y se pide al doble para pantallas de alta densidad. Antes se pedían
 * 256 px de ancho para un ícono que ocupa ~50-120.
 */
const BENEFIT_ICON_HEIGHT = 48
const benefitIconWidth = image =>
  image?.width && image?.height
    ? Math.ceil((BENEFIT_ICON_HEIGHT * 2 * image.width) / image.height)
    : 192

/** Empareja cada vídeo con su portada por posición. */
const buildVideoList = index => {
  const covers = index?.coverOfVideo ?? []
  return (index?.presentationVideos ?? []).map((video, position) => ({
    sources: [{ src: video.url, type: video.mimeType }],
    cover: covers[position],
  }))
}

const IndexPage = ({ pageContext }) => {
  const { data, statusElement } = useLocalizedQuery(IndexContent, pageContext)

  useDocumentSeo(
    data?.indices?.[0]?.searchEngineOptimization,
    OPEN_GRAPH,
    THIRD_PARTY_SCRIPTS
  )

  if (statusElement) return statusElement

  const index = data?.indices?.[0] ?? {}
  const videos = buildVideoList(index)

  const seo = data?.indices?.[0]?.searchEngineOptimization

  return (
    <TemplateBase pageContext={pageContext} seoData={seo}>
      <main className="pt-8 hero-surface">
        <TripAdvisorBadge />

        <section id="sectionBellowHeader">
          {/* Sin rehype-raw: el texto no lleva HTML crudo (comprobado en los 5
              idiomas, el resultado es idéntico) y ese plugin metía en el
              navegador el analizador parse5 (~26 KiB sin usar). Si un editor
              añade HTML dentro de este campo, react-markdown lo omite. */}
          <ReactMarkdown components={markdownComponents}>
            {index.mainTextBelow?.markdown}
          </ReactMarkdown>
      </section>

      <Link to={index.viewCarsbuttonurl?.slug}>
        <button className="bg-brand-blue text-white block m-auto py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg md:ml-16">
          {index.viewCarsButtonText}
        </button>
      </Link>

      <SectionTitle className="pl-4 mt-8">
        {index.videosSectionTitle}
      </SectionTitle>

      <div className="items-center justify-center px-4 m-auto mb-8 md:w-5/6 video-container">
        <VideoPlayer videos={videos} />
      </div>

      <section
        id="contentBelowVideo"
        className="!max-w-full !text-base px-2 md:px-4 md:mx-4 md:mb-8 md:mt-16 prose lg:prose-lg xl:prose-xl xl:px-16"
      >
        {(index.contentBelowVideo ?? []).map((item, position) => (
          <ReactMarkdown key={position}>{item.markdown}</ReactMarkdown>
        ))}
      </section>

      <SectionTitle className="px-4 mt-16">
        {index.offersSectionTitle}
      </SectionTitle>

      <section className="testimonials-intro">
        <ReactMarkdown>{index.offersSectionText?.markdown}</ReactMarkdown>
      </section>

      <section className="grid px-5 font-bold sm:grid-cols-2 lg:grid-cols-3 gap-y-5 md:gap-y-7 lg:gap-y-10 md:mx-4 md:my-12 justify-items-start md:text-center xl:px-16">
        {(index.freeBenefitsElements ?? []).map((benefit, position) => (
          <div key={position} className="flex items-center">
            <OptimizedImage
              src={benefit.benefitImage?.url}
              alt={benefit.benefitImage?.altText}
              widths={[benefitIconWidth(benefit.benefitImage)]}
              width={benefit.benefitImage?.width}
              height={benefit.benefitImage?.height}
              className="h-12 w-auto"
            />
            <p className="col-span-1 ml-5">{benefit.benefitTitle}</p>
          </div>
        ))}
      </section>

      <SectionTitle className="px-4 mt-16">
        {index.testimonialsSectionTitle}
      </SectionTitle>

      <section className="testimonials-intro">
        <ReactMarkdown>{index.testimonialSectionText?.markdown}</ReactMarkdown>
      </section>

      <MapContainerLayoutB pageContext={pageContext} />
    </main>
  </TemplateBase>
  )
}

export default IndexPage
