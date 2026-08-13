import React from "react"

/** Estado de carga de una página. Reemplaza los `<p>Loading...</p>` sueltos. */
export const Loading = () => (
  <div
    role="status"
    aria-live="polite"
    className="flex items-center justify-center min-h-[50vh]"
  >
    <span className="sr-only">Loading…</span>
    <span className="w-10 h-10 border-4 rounded-full border-brand-blue/20 border-t-brand-blue animate-spin" />
  </div>
)

/** Estado de error de una página. */
export const ErrorState = ({ error }) => (
  <div
    role="alert"
    className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center"
  >
    <p className="font-CarterOne text-xl mb-2">Something went wrong</p>
    {error?.message && (
      <p className="text-sm text-gray-600 max-w-prose">{error.message}</p>
    )}
  </div>
)
