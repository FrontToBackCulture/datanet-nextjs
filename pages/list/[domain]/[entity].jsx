import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Stack } from '@mui/material'
import { useUser } from '@auth0/nextjs-auth0'
import { readVAL } from '../../api/grpc'
import { dataNetMerge, dataNetPerformCalc } from '../../api/datanet'
import * as gtag from '../../../lib/gtag'
import { Page } from '../../../src/components'
import AgGrid from '../../../src/components/AgGrid/AgGrid'
import { selectConfig, selectLocalDataSource } from '../../../src/utils/selectScript'
import { DomainContext, useUserDomain } from '../../../src/contexts/DomainProvider'
import Header from '../../../src/layouts/header/Header'

export default function ListPage({ rowData, conf }) {
  const { user } = useUser()

  const router = useRouter()
  const { domain, entity } = router.query

  const userDomain = useUserDomain()

  // const selectedDomain = userDomain === ROOT_DOMAIN ? domain : userDomain
  const selectedDomain = domain

  const domainConf = selectConfig(selectedDomain)

  const title = domainConf?.getConfig('navConfig')?.find((route) => route.code === entity)?.title

  // whenever query or userDomain change
  // - get the relevant config
  // - reset row data to blank
  // - push event to GA4
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CONFIGURATION === 'production') {
      gtag.event({ action: 'screenview', category: entity, label: user.email, value: 1 })
    }
  }, [router.query, userDomain])

  return (
    <DomainContext.Provider value={selectedDomain}>
      <Stack height={1}>
        <Header />
        <Page title={title}>
          <Container sx={{ flexGrow: 1, py: 3 }} maxWidth="xl">
            <AgGrid type="list" conf={conf} entity={entity} rowD={rowData} title={title} />
          </Container>
        </Page>
      </Stack>
    </DomainContext.Provider>
  )
}

// get static and metric data from VAL
const getDataFromVAL = async (id, dom, contentType, dataType, cache) => {
  if (process.env.NEXT_PUBLIC_CONFIGURATION === 'development') {
    return selectLocalDataSource(contentType, dataType, dom)
  }
  const valJobs = await readVAL({
    queryID: id,
    domain: dom,
    contentType,
    dataType,
    cache,
  })
  return valJobs.data
}

export const getServerSideProps = async ({ params }) => {
  const { domain, entity } = params

  const selectedDomain = domain

  const domainConf = selectConfig(selectedDomain)

  const conf = domainConf?.getConfig(entity)

  const { dataSources } = conf

  const rawData = {}
  for (const dataSet of Object.keys(dataSources)) {
    const { domain, queryID, contentType, name } = dataSources[dataSet]
    rawData[name] = await getDataFromVAL(queryID, domain, contentType, entity, true)
  }

  const trendSourceName = dataSources.trendSource.name

  const staticKey = dataSources.staticSource.key
  const metricKey = dataSources.metricSource.key

  const mergeParams = {
    arr1: rawData[`${entity}Static`],
    arr2: rawData[`${entity}Metrics`],
    arr1Key: staticKey,
    arr2Key: metricKey,
    domain: selectedDomain,
    dataType: entity,
  }

  const mergeStaticMetric = (await dataNetMerge(mergeParams)).data

  const performCalcParams = {
    data: {
      mergeStaticMetric,
      [trendSourceName]: rawData[trendSourceName],
    },
    conf,
    domain: selectedDomain,
    dataType: entity,
  }

  const rowData = (await dataNetPerformCalc(performCalcParams)).data

  return {
    props: {
      rowData,
      conf,
    },
  }
}
