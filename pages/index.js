import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Layout from '../src/layouts'
import { Page } from '../src/components'
import { HomeHero } from '../src/sections/home'

export default function HomePage() {
  const { user } = useUser()

  const userDomain = user?.email.match(/@(\w+)/g)[0]?.slice(1)

  return (
    <Page title="The starting point for your next project">
      <Layout simpleFooter>
        <HomeHero userDomain={userDomain} />
      </Layout>
    </Page>
  )
}
