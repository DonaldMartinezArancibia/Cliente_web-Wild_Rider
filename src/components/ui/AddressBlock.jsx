import React from "react"

/**
 * Dirección de la oficina con su título.
 *
 * El marcado original era un `<p>` con un `<h1>` dentro (HTML inválido); aquí
 * se usa un `<h2>` con el mismo tamaño que el `h1` global para no alterar el
 * aspecto visual.
 */
const AddressBlock = ({ title, address, localizedAddress }) => (
  <div className="mx-3 font-semibold lg:w-10/12 lg:justify-self-center">
    <h2 className="text-[32px]">{title}</h2>
    {address}
    <br />
    <br />
    {localizedAddress}
  </div>
)

export default AddressBlock
