import { createContext, useContext, useState } from 'react'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('./header/Header'), { ssr: false })
const Footer = dynamic(() => import('./footer/Footer'), { ssr: false })
const FooterSimple = dynamic(() => import('./footer/FooterSimple'), { ssr: false })

import { DomainProvider } from '../contexts/DomainProvider'

const DomainContext = createContext()

export default function Layout({ children, simpleFooter }) {
  const [selectedDomain, setSelectedDomain] = useState()
  const header2Layout = (domain) => {
    setSelectedDomain(domain)
  }

  return (
    <>
      <Header header2Layout={header2Layout} />

      <DomainProvider value={selectedDomain}>{children}</DomainProvider>

      {simpleFooter ? <FooterSimple /> : <Footer />}
    </>
  )
}

export function useDomainContext() {
  return useContext(DomainContext)
}
