import React from 'react'
import { Page } from '../src/components'
import { Home } from '../src/sections/Home'
import { Stack } from '@mui/material'
import Header from '../src/layouts/header/Header'
import { DomainContext, useUserDomain } from '../src/contexts/DomainProvider'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function HomePage() {
  const userDomain = useUserDomain()

  const router = useRouter()

  useEffect(() => {
    if (userDomain) router.push(`/${userDomain}`)
  }, [userDomain])

  return (
    <DomainContext.Provider value={null}>
      <Stack height={1}>
        <Header />
        <Page title="The starting point for your next project" simpleFooter>
          <Home />
        </Page>
      </Stack>
    </DomainContext.Provider>
  )
}
