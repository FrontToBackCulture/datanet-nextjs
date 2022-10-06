import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Stack, Typography } from '@mui/material'
import { useUser } from '@auth0/nextjs-auth0'
import { readVAL } from '../../api/grpc'
import { dataNetMerge, dataNetPerformCalc } from '../../api/datanet'
import * as gtag from '../../../lib/gtag'
import { Page } from '../../../src/components'
import AgGrid from '../../../src/components/AgGrid/AgGrid'
import { selectConfig, selectLocalDataSource } from '../../../src/utils/selectScript'
import { DomainContext } from '../../../src/contexts/DomainProvider'
import Header from '../../../src/layouts/header/Header'

const USER_DOMAIN_ROUTE = 'userDomain'

export default function ListPage() {
  const { user } = useUser()
  const [rowData, setRowData] = useState([])
  const [rawData, setRawData] = useState({})

  const router = useRouter()
  const { domain, code } = router.query

  const userDomain = user?.email.match(/@(\w+)/g)[0].slice(1)

  const selectedDomain = domain === USER_DOMAIN_ROUTE ? userDomain : domain

  const domainConf = selectConfig(selectedDomain)

  const conf = domainConf?.getConfig(code)

  const title = domainConf?.getConfig('navConfig')?.find((route) => route.code === code)?.title

  //whenever query or userDomain change
  //- get the relevant config
  //- reset row data to blank
  //- push event to GA4
  useEffect(() => {
    setRowData([])
    if (process.env.NEXT_PUBLIC_CONFIGURATION === 'production') {
      gtag.event({ action: 'screenview', category: code, label: user.email, value: 1 })
    }
  }, [router.query, userDomain])

  //once config have been extracted, process based on config instructions
  useEffect(() => {
    ;(async () => {
      if (conf) {
        const { dataSources } = conf

        let allData = {}
        for (const dataSet of Object.keys(dataSources)) {
          let { domain, queryID, contentType, name } = dataSources[dataSet]
          let data = await getDataFromVAL(queryID, domain, contentType, code, true)
          allData[name] = data
        }
        setRawData(allData)
      }
    })()
  }, [conf])

  useEffect(() => {
    ;(async () => {
      if (conf && code && rawData && rawData[`${code}Static`] && rawData[`${code}Metrics`]) {
        const { dataSources, variablesMetrics, listFields, detailFields } = conf
        const { staticSource, metricSource, trendSource } = dataSources
        const staticKey = dataSources['staticSource'].key
        const metricKey = dataSources['metricSource'].key
        const trendKey = dataSources['trendSource'].key

        let mergeParams = {
          arr1: rawData[`${code}Static`],
          arr2: rawData[`${code}Metrics`],
          arr1Key: staticKey,
          arr2Key: metricKey,
          domain: userDomain,
          dataType: code,
        }

        //merge static and metric
        let mergeStaticMetricData = await dataNetMerge(mergeParams)
        mergeStaticMetricData = mergeStaticMetricData.data
        rawData['mergeStaticMetric'] = mergeStaticMetricData

        let performCalcRequiredData = {}
        performCalcRequiredData['mergeStaticMetric'] = mergeStaticMetricData
        performCalcRequiredData[trendSource.name] = rawData[trendSource.name]

        let performCalcParams = {
          data: performCalcRequiredData,
          conf: conf,
          domain: userDomain,
          dataType: code,
        }

        let performCalcData
        if ((rawData, mergeStaticMetricData)) {
          performCalcData = await dataNetPerformCalc(performCalcParams)
          performCalcData = performCalcData.data
          console.log('Perform Calculation:', performCalcData)

          setRowData(performCalcData)
        }

        console.log(rawData)
      }
    })()
  }, [rawData])

  // get static and metric data from VAL
  const getDataFromVAL = async (id, dom, contentType, dataType, cache) => {
    if (process.env.NEXT_PUBLIC_CONFIGURATION === 'development') {
      return selectLocalDataSource(contentType, dataType, dom)
    }
    if (
      process.env.NEXT_PUBLIC_CONFIGURATION === 'production' ||
      process.env.NEXT_PUBLIC_CONFIGURATION === 'productionTest'
    ) {
      let valJobs = await readVAL({
        queryID: id,
        domain: dom,
        contentType: contentType,
        dataType: dataType,
        cache: cache,
      })
      return valJobs.data
    }
  }

  return (
    <DomainContext.Provider value={selectedDomain}>
      <Stack height={1}>
        <Header />
        <Page title={title}>
          <Container sx={{ flexGrow: 1, py: 3 }} maxWidth="xl">
            {user ? (
              <AgGrid type="list" conf={conf} entity={code} rowD={rowData} title={title} />
            ) : (
              <Typography align="center" variant="h4">
                Please login to see data
              </Typography>
            )}
          </Container>
        </Page>
      </Stack>
    </DomainContext.Provider>
  )
}
