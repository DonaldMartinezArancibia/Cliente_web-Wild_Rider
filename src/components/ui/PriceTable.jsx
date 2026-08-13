import React from "react"
import he from "he"

/**
 * Tabla de precios compartida entre carInfoModal y carQuoteForm.
 *
 * Recibe el objeto `carsAndQuote` (títulos) y las transmisiones manual/automática
 * con sus arrays `priceOfCar`. Cada entrada tiene:
 *   - season: { seasonTitle, startDate, endDate }
 *   - priceOfCar: number
 *   - unsetPriceMessage?: { html: string }
 */
const PriceTable = ({
  carsAndQuote,
  manualTransmission,
  automaticTransmission,
  formatDate,
  locale,
}) => {
  if (!carsAndQuote || !manualTransmission?.priceOfCar) return null

  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap sm:w-auto sm:table-auto">
        <thead>
          <tr className="text-xl">
            <th className="p-2">{carsAndQuote.seasonTitle}</th>
            <th className="p-2">{carsAndQuote.datesTitle}</th>
            <th className="p-2">{carsAndQuote.priceTitleManual}</th>
            <th className="p-2">{carsAndQuote.priceTitleAutomatic}</th>
          </tr>
        </thead>
        <tbody>
          {manualTransmission.priceOfCar.map((manualPrice, priceIndex) => (
            <tr key={priceIndex}>
              <td className="p-2">{manualPrice.season?.seasonTitle}</td>
              <td className="p-2">
                {formatDate(manualPrice.season?.startDate, locale)} |{" "}
                {formatDate(manualPrice.season?.endDate, locale)}
              </td>
              <td className="text-center">
                {manualPrice.priceOfCar !== 0 ? (
                  <>${manualPrice.priceOfCar}</>
                ) : (
                  manualPrice.unsetPriceMessage?.html && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: he.decode(manualPrice.unsetPriceMessage.html),
                      }}
                    />
                  )
                )}
              </td>
              {automaticTransmission?.priceOfCar?.[priceIndex] && (
                <>
                  {automaticTransmission.priceOfCar[priceIndex].priceOfCar !== 0 ? (
                    <td className="text-center">
                      $
                      {automaticTransmission.priceOfCar[priceIndex].priceOfCar}
                    </td>
                  ) : (
                    <td className="text-center">
                      {automaticTransmission.priceOfCar[priceIndex]
                        .unsetPriceMessage?.html && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: he.decode(
                              automaticTransmission.priceOfCar[priceIndex]
                                .unsetPriceMessage.html
                            ),
                          }}
                        />
                      )}
                    </td>
                  )}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PriceTable