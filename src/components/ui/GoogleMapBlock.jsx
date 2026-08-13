import React from "react"

const openInPopup = url => {
  window.open(url, "Data", "height=700px,width=600px")
}

const PinIcon = () => (
  <svg className="h-6 ml-2" viewBox="0 0 448 510">
    <path
      fill="#fff"
      d="M352 192c0-88.4-71.6-160-160-160S32 103.6 32 192c0 20.2 9.1 48.6 26.5 82.7c16.9 33.2 39.9 68.2 63.4 100.5c23.4 32.2 46.9 61 64.5 81.9c1.9 2.3 3.8 4.5 5.6 6.6c1.8-2.1 3.6-4.3 5.6-6.6c17.7-20.8 41.1-49.7 64.5-81.9c23.5-32.3 46.4-67.3 63.4-100.5C342.9 240.6 352 212.2 352 192zm32 0c0 88.8-120.7 237.9-170.7 295.9C200.2 503.1 192 512 192 512s-8.2-8.9-21.3-24.1C120.7 429.9 0 280.8 0 192C0 86 86 0 192 0S384 86 384 192zm-240 0a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm48 80a80 80 0 1 1 0-160 80 80 0 1 1 0 160z"
    />
  </svg>
)

/**
 * Mapa embebido + botón que abre Google Maps en una ventana emergente.
 * Compartido por la página de contacto y la de aeropuerto/oficina.
 */
const GoogleMapBlock = ({ frameUrl, mapsUrl, buttonText, title }) => (
  <>
    <iframe
      width="360"
      height="300"
      id="gmap_canvas"
      title={title || "Google Maps"}
      src={frameUrl}
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      className="w-11/12 m-auto my-5 lg:col-[1/3] lg:w-[95%] rounded-xl shadow-md min-[2000px]:row-[2/3] min-[2000px]:col-[3/4] min-[2000px]:w-full min-[2000px]:h-full min-[2000px]:-mt-2"
    ></iframe>

    <div className="lg:col-[1/3] min-[2000px]:col-[3/4] min-[2000px]:row-[3/4]">
      <button
        type="button"
        onClick={() => openInPopup(mapsUrl)}
        className="bg-brand-blue flex text-white m-auto py-5 px-16 hover:bg-blue-800 rounded-lg font-semibold text-lg min-[2000px]:mt-2"
      >
        {buttonText}
        <PinIcon />
      </button>
    </div>
  </>
)

export default GoogleMapBlock
