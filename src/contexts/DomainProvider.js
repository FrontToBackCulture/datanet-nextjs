import { createContext, useContext } from 'react'

export const DomainContext = createContext()

export function DomainProvider({ value, children }) {
  return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>
}

export function useDomainContext() {
  return useContext(DomainContext)
}
