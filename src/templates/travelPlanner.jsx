import React from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import Showdata from "../components/showdata"
import img1 from "../images/slider-img-1.webp"
import img2 from "../images/slider-img-2.webp"
import img3 from "../images/slider-img-3.webp"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid"

export default function AboutUs({ pageContext }) {
  const images = [img1, img2, img3]

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    cssEase: "linear",
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
    <main className="p-3 bg-hero-pattern bg-no-repeat bg-[right_60%_top_6%] md:bg-[right_-18rem_top_-2%] lg:bg-[right_-40rem_bottom_-40rem] bg-[length:150%] md:bg-[length:85%] lg:bg-[length:75%] lg:p-14">
      <h1 className="mb-10 font-CarterOne lg:text-5xl">Travel Planner</h1>
      <div>
        <Slider {...settings}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slider Image ${index}`}
              className="w-2/5 px-5"
            />
          ))}
        </Slider>
        <h1 className="my-10 font-CarterOne lg:text-5xl">News</h1>
        <Showdata pageContext={pageContext} />
      </div>
    </main>
  )
}
