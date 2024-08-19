// src/context/ContextProvider.js
import React, { createContext, useContext, useState } from "react"

const MyContext = createContext()

export const useMyContext = () => useContext(MyContext)

export const ContextProvider = ({ children, initialContext }) => {
  const [context, setContext] = useState(initialContext)

  return (
    <MyContext.Provider value={{ context, setContext }}>
      {children}
    </MyContext.Provider>
  )
}
