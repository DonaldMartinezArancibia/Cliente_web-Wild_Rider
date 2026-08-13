import { useCallback, useState } from "react"
import mailcheck from "mailcheck"

/**
 * Campo de email con sugerencia de dominio (mailcheck).
 *
 * Antes esta lógica estaba escrita tres veces en contactAndLocation.jsx
 * (dos `useEffect` casi idénticos más un `handleChange` compartido).
 *
 * @returns {{value, suggestion, onChange, acceptSuggestion, reset}}
 */
export function useEmailSuggestion(initialValue = "") {
  const [value, setValue] = useState(initialValue)
  const [suggestion, setSuggestion] = useState(null)

  const check = useCallback(email => {
    mailcheck.run({
      email,
      suggested: s => setSuggestion(s.full),
      empty: () => setSuggestion(null),
    })
  }, [])

  const onChange = useCallback(
    event => {
      const next = event.currentTarget.value
      setValue(next)
      check(next)
    },
    [check]
  )

  const acceptSuggestion = useCallback(() => {
    if (suggestion != null) {
      setValue(suggestion)
      setSuggestion(null)
    }
  }, [suggestion])

  const reset = useCallback(() => {
    setValue("")
    setSuggestion(null)
  }, [])

  return { value, suggestion, onChange, acceptSuggestion, reset }
}
