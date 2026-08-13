import React from "react"

/**
 * Campo de email con sugerencia de dominio.
 * `field` es el objeto devuelto por `useEmailSuggestion`.
 */
const EmailField = ({
  id,
  name,
  label,
  errorMessage,
  field,
  onInvalid,
  className = "",
}) => (
  <div className={`flex flex-col justify-between ${className}`}>
    <label htmlFor={id} className="w-full my-2 font-black font-Poppins">
      {label}
      <span className="text-red-500">*</span>
    </label>

    <input
      className="w-full h-10 p-2 bg-white"
      type="email"
      id={id}
      name={name}
      value={field.value}
      onChange={field.onChange}
      onInvalid={event => onInvalid(event, errorMessage)}
      required
    />

    {field.suggestion && (
      <div>
        Did you mean{" "}
        <button
          type="button"
          className="underline"
          onClick={field.acceptSuggestion}
        >
          {field.suggestion}
        </button>
      </div>
    )}
  </div>
)

export default EmailField
