import React, { useState, useEffect } from "react"
import Slider from "react-slick" // Importa la biblioteca de carruseles
import "slick-carousel/slick/slick.css" // Importa los estilos CSS de slick-carousel
import "slick-carousel/slick/slick-theme.css" // Importa los estilos del tema de slick-carousel
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid"
import { GetAllReviews } from "../gql/allReviews"
import { useApolloClient, useQuery } from "@apollo/client"
import TripAdvisor from "../images/tripadvisor-logo.svg"
import Google from "../images/google-logo.svg"
import Facebook from "../images/facebook-logo.svg"

// Componente Review
const Review = ({ review, handleLinkClick, imageMapping, truncateReview }) => (
  <div className="m-1 p-4 border-opacity-100 border-gray-300 bg-[#d9eaf9] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 md:m-3">
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
              className={`h-4 w-4 ${
                review.numberOfStars >= i + 1
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
    <p className="text-[#1a1a1a]">
      {truncateReview(review.review, 250)}
      {review.review.length > 250 && (
        <a
          href={review.reviewLink}
          onClick={e => handleLinkClick(e, review.reviewLink)}
          className="text-[#0833a2] ml-1 hover:underline"
        >
          Leer más
        </a>
      )}
    </p>
  </div>
)

const GoogleReviewsCarousel = ({
  reviews,
  handleLinkClick,
  imageMapping,
  truncateReview,
}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Número de reseñas a mostrar en cada slide
    slidesToScroll: 3,
    prevArrow: <PrevArrow />, // Usa componentes personalizados para las flechas previas y siguientes
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings} className="!flex mb-5">
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
const TripAdvisorReviewsCarousel = ({
  reviews,
  handleLinkClick,
  imageMapping,
  truncateReview,
}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Número de reseñas a mostrar en cada slide
    slidesToScroll: 3,
    prevArrow: <PrevArrow />, // Usa componentes personalizados para las flechas previas y siguientes
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings} className="!flex mb-10">
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
const FacebookReviewsCarousel = ({
  reviews,
  handleLinkClick,
  imageMapping,
  truncateReview,
}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Número de reseñas a mostrar en cada slide
    slidesToScroll: 3,
    prevArrow: <PrevArrow />, // Usa componentes personalizados para las flechas previas y siguientes
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings} className="!flex mb-10">
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

const MapContainer = pageContext => {
  const [reviews, setReviews] = useState([])
  const client = useApolloClient()
  const {
    data: googleR,
    loading: googleRLoading,
    error: googleRError,
  } = useQuery(GetAllReviews, {
    variables: {
      // internalId: pageContext.remoteId,
      locale: [pageContext.pageContext.langKey],
    },
  })
  client.refetchQueries({
    include: [GetAllReviews],
  })

  if (googleRLoading) return <p>Loading...</p>

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

  // Define la variable newReviews aquí
  const newReviews = []

  // Define el mapeo de imágenes aquí
  const imageMapping = {
    TripAdvisor: TripAdvisor,
    Google: Google,
    Facebook: Facebook,
    DefaultImage: null,
  }

  return (
    <>
      {/* Utiliza el componente GoogleReviewsCarousel para mostrar las reseñas de Google */}
      <GoogleReviewsCarousel
        reviews={[...googleR.googleReviews, ...newReviews]}
        handleLinkClick={handleLinkClick}
        imageMapping={imageMapping}
        truncateReview={truncateReview}
      />

      {/* Agrega un carrusel similar para las reseñas de TripAdvisor */}
      <TripAdvisorReviewsCarousel
        reviews={[...googleR.tripAdvisorReviews, ...newReviews]}
        handleLinkClick={handleLinkClick}
        imageMapping={imageMapping}
        truncateReview={truncateReview}
      />
      {/* Agrega un carrusel similar para las reseñas de TripAdvisor */}
      <FacebookReviewsCarousel
        reviews={[...googleR.facebookReviews, ...newReviews]}
        handleLinkClick={handleLinkClick}
        imageMapping={imageMapping}
        truncateReview={truncateReview}
      />
    </>
  )
}

const ReviewsCarousel = ({
  reviews,
  handleLinkClick,
  imageMapping,
  truncateReview,
}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings} className="!flex mb-5">
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

const MapContainerLayoutB = pageContext => {
  const { data: allReviews, loading: allReviewsLoading } = useQuery(
    GetAllReviews,
    {
      variables: {
        // internalId: pageContext.remoteId,
        locale: [pageContext.pageContext.langKey],
      },
    }
  )

  if (allReviewsLoading) return <p>Loading...</p>

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

  function shuffleArray(array) {
    // Crea una copia del arreglo original para no modificarlo directamente
    const shuffledArray = [...array]

    // Baraja el arreglo utilizando el algoritmo de Fisher-Yates
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]
    }

    return shuffledArray
  }

  // Obtén una copia aleatoria de todas las reseñas
  const shuffledReviews = shuffleArray([
    ...allReviews.googleReviews,
    ...allReviews.tripAdvisorReviews,
    ...allReviews.facebookReviews,
  ])

  return (
    <ReviewsCarousel
      reviews={shuffledReviews}
      handleLinkClick={handleLinkClick}
      imageMapping={imageMapping}
      truncateReview={truncateReview}
    />
  )
}

export { MapContainer, MapContainerLayoutB }
