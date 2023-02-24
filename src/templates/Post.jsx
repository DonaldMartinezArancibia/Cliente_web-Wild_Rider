import React from "react"
import { graphql } from "gatsby"
import { formatDate } from "../utils"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { Seo } from "../components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function DynamicPage({ data }) {
  const post = data.graphCmsPost
  const cover = data.cover

  const shareImage =
    post.seo && post.seo.image ? post.seo.image.url : post.cover.url || null

  return (
    <>
      {post.seo !== null ? (
        <Seo
          title={post.seo.title}
          description={post.seo.description}
          image={shareImage}
        />
      ) : null}
      <div className="container px-5 mx-auto">
        <GatsbyImage
          image={getImage(cover)}
          alt={post.seo !== null ? post.seo.title : null}
          className="h-64 lg:h-[380px]"
        />
        <section className="mt-10 max-w-[760px] mx-auto">
          <h1 className="text-[#2D3738] font-bold text-5xl">{post.title}</h1>
          <div className="mt-5 flex space-x-[56px]">
            <p className="text-[#2D3738] font-bold">Escrito por Donald</p>
            <p className="text-[#718096]">
              {formatDate(post.publishedAt, "EEEE, LLLL yyyy")}
            </p>
          </div>
          <hr className="my-8 border-gray-200" />
          <div className="prose max-w-full mb-[58px]">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </section>
      </div>
    </>
  )
}

export const query = graphql`
  query Post($slug: String!, $langKey: GraphCMS_Locale!) {
    graphCmsPost(slug: { eq: $slug }, locale: { eq: $langKey }) {
      id
      title
      slug
      category
      content
      seo {
        ... on GraphCMS_Seo {
          title
          description
          image {
            url
          }
        }
      }
      publishedAt
    }
    cover: graphCmsAsset(coverPost: { elemMatch: { slug: { eq: $slug } } }) {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
`
//Dropdown para ver los vehiculos, especificaciones de cada carro, por tipo de vehiculo, para galerias de vehiculos, y solicitud de ese vehiculo, boton para mas información, siempre deberia estar visible la información de la temporada, la información editar los precios.

//Un modelo de temporadas, un boton de calendario para filtrar la información de los calendarios /*para más adelante*/

//Quote en los carros.

//Long time rental es un formulario, aparte del de contacto.

//Free extra and pickup airport, se planea colocar un pickup de el cual muestra información de precios según la distancia

//Lo ventajoso y positivo.

//Videos en la pagina, preview en la home.

//Travel information carousel de fotos, información mas nueva se mostrara al inicio de la pagina, separa información por importancia, por medio de etiquetas.

//Contact and location.

//Rental information and inssurace, dropdown.

//Posicionamiento de marca y seo.

//Input para el search
