//react
import React, { useState, useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// @mui
import { styled } from '@mui/material/styles'
import { Box, Container, Typography } from '@mui/material'
// auth
import { useUser } from '@auth0/nextjs-auth0'
// other lbrary
import moment from 'moment'
import { array, merge, aggregate } from 'cuttle'
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config'
// api && lib
import { readVAL } from '../../api/grpc'
import { dataNetMerge, dataNetPerformCalc } from '../../api/datanet'
import { getAppMetaData } from '../../api/auth/auth0API'
import * as gtag from '../../../lib/gtag'
// components
import { Page, ErrorScreen } from '../../../src/components'
import AgGrid from '../../../src/components/AgGrid/AgGrid'
// utils
import {
  selectConfig,
  selectObject,
  selectLocalDataSource,
  selectDomain,
} from '../../../src/utils/selectScript'
import { performCalc } from '../../../src/utils/metricCalc'

import { useDomainContext } from '../../../src/contexts/DomainProvider'
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}))

// ----------------------------------------------------------------------

export default function ListPage() {
  const { user, error, isLoading } = useUser()
  const [userDomain, setUserDomain] = useState()
  const [rowData, setRowData] = useState([])
  const [conf, setConf] = useState()
  const [rawData, setRawData] = useState({})

  // set domain to the selected domain in the header
  const selectedDomain = useDomainContext()

  // extract URL information
  const router = useRouter()
  if (typeof window !== 'undefined') {
    const URL = window.location.href
  }

  //get parameters from url query
  const { title, code } = router.query

  // if user login perform checks on email to determine domain
  useEffect(() => {
    if (user) {
      const regex = /@(\w+)/g
      let result = user.email.match(regex)[0]
      result = result.substring(1, result.length)
      if (selectedDomain) {
        setUserDomain(selectDomain(selectedDomain))
      } else {
        setUserDomain(selectDomain(result))
      }
    }
  }, [user])

  //whenever query or userDomain change
  //- get the relevant config
  //- reset row data to blank
  //- push event to GA4
  useEffect(() => {
    setRowData([])
    getConfig()
    if (user && URL.includes('datanet.thinkval.io')) {
      gtag.event({ action: 'screenview', category: code, label: user.email, value: 1 })
    }
  }, [router.query, userDomain])

  //get config from the config file based on environment variable
  const getConfig = () => {
    let config2used = selectConfig(userDomain).getConfig(code)
    setConf(config2used)
  }

  //once config have been extracted, process based on config instructions
  useEffect(async () => {
    if (conf) {
      const { dataSources, variablesMetrics, listFields, detailFields } = conf
      const { staticSource, metricSource, trendSource } = dataSources
      const staticKey = dataSources['staticSource'].key
      const metricKey = dataSources['metricSource'].key
      const trendKey = dataSources['trendSource'].key
      // iterate thru all the datasources define, cache and extract to UI

      let allData = {}
      for (const dataSet of Object.keys(dataSources)) {
        console.log('Check', dataSet)
        let { domain, queryID, contentType, name } = dataSources[dataSet]
        let data = await getDataFromVAL(queryID, domain, contentType, code, true)
        allData[name] = data
      }
      setRawData(allData)
    }
  }, [conf])

  useEffect(async () => {
    if (conf && code && rawData && rawData[`${code}Static`] && rawData[`${code}Metrics`]) {
      console.log('I got in')
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
  }, [rawData])

  // get static and metric data from VAL
  const getDataFromVAL = async (id, dom, contentType, dataType, cache) => {
    if (URL.includes('localhost')) {
      let localJsonData
      localJsonData = selectLocalDataSource(contentType, dataType, dom)
      return localJsonData
    }
    if (URL.includes('datanet')) {
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
  )
}
