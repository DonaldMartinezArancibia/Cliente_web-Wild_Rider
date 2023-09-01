import React from "react"
import MapContainer from "../components/reviewsHygraph"

export default function contactAndLocation({ pageContext }) {
  return (
    <main>
      <h1 className="font-CarterOne">Contact & Location</h1>
      <form action="mailto:myforms@mydomain.com">
        <div>
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required />
        </div>
        <div>
          <label for="telefono">Número de Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            pattern="[0-9]{10}"
            placeholder="Ej. 1234567890"
            required
          />
        </div>
        <div>
          <label for="correo">Correo Electrónico:</label>
          <input type="email" id="correo" name="correo" required />
        </div>
        <div>
          <label for="mensaje">Mensaje:</label>
          <textarea id="mensaje" name="mensaje" rows="4" required></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe
            width="600"
            height="500"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=wild%20rider&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
      </div>
    </main>
  )
}
