import React from 'react'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { Page } from '../src/components'
import { Home } from '../src/sections/Home'
import Header from '../src/layouts/header/Header'
import { DomainContext, ROOT_DOMAIN, useUserDomain } from '../src/contexts/DomainProvider'

export default function HomePage() {
  const userDomain = useUserDomain()

  const router = useRouter()

  const { domain } = router.query

  const selectedDomain = userDomain === ROOT_DOMAIN ? domain : userDomain

  return (
    <DomainContext.Provider value={selectedDomain}>
      <Stack height={1}>
        <Header />
        <Page title="The starting point for your next project" simpleFooter>
          <Home />
        </Page>
      </Stack>
    </DomainContext.Provider>
  )
}
