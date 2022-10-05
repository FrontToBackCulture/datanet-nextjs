import { createContext, useContext } from 'react'

// Create Context object.
const DomainContext = createContext()

// Export Provider.
export function DomainProvider(props) {
  const { value, children } = props

  return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>
}

// Export useContext Hook.
export function useDomainContext() {
  return useContext(DomainContext)
}
