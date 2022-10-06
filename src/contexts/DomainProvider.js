import { useUser } from '@auth0/nextjs-auth0'
import { createContext, useContext } from 'react'

export const ROOT_DOMAIN = 'thinkval'

export const useUserDomain = () => {
  const { user } = useUser()
  return user?.email.match(/@(\w+)/g)[0]?.slice(1)
}

export const DomainContext = createContext()

export function DomainProvider({ value, children }) {
  return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>
}

// TODO: remove this
export function useDomainContext() {
  return useContext(DomainContext)
}
