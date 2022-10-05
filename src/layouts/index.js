import { createContext, useContext, useState } from 'react'

import Header from './header/Header'

import { DomainProvider } from '../contexts/DomainProvider'
import { Stack } from '@mui/material'

const DomainContext = createContext()

export default function Layout({ children }) {
  const [selectedDomain, setSelectedDomain] = useState()
  const header2Layout = (domain) => {
    setSelectedDomain(domain)
  }

  return (
    <Stack height={1}>
      <Header header2Layout={header2Layout} />

      <DomainProvider value={selectedDomain}>{children}</DomainProvider>
    </Stack>
  )
}

export function useDomainContext() {
  return useContext(DomainContext)
}
