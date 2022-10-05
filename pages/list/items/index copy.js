//react
import React, { useState, useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// @mui
import { styled } from '@mui/material/styles'
import { Container } from '@mui/material'
// auth
import { useUser } from '@auth0/nextjs-auth0'
// other lbrary
import moment from 'moment'
import { array, merge, aggregate } from 'cuttle'
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config'
// api && lib
import { readVAL } from '../../api/grpc'
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

import { useDomainContext } from '../../../src/contexts/DomainProvider'
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}))

// ----------------------------------------------------------------------

export default function PromotionItemsPage() {
  const { user, error, isLoading } = useUser()
  const [userDomain, setUserDomain] = useState()
  const [rowData, setRowData] = useState([])
  const [conf, setConf] = useState()
  const [listFields, setListFields] = useState()

  const selectedDomain = useDomainContext()

  const router = useRouter()
  if (typeof window !== 'undefined') {
    const URL = window.location.href
  }

  //get parameters from url query
  const { title, code } = router.query

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

  //whenever query change get the relevant config based on the code attribute in the query
  useEffect(() => {
    setRowData([])
    getConfig()
    if (user && URL.includes('datanet.thinkval.io')) {
      gtag.event({ action: 'screenview', category: code, label: user.email, value: 1 })
    }
  }, [router.query, userDomain])

  // //whenever users gets update
  // useEffect(() => {
  //   if (user && user.email) {
  //     getUserAppMetaData(user.email);
  //   }
  // }, [user]);

  // //get user appmetadata
  // const getUserAppMetaData = async (email) => {
  //   console.log(user);
  //   let appMetaData = await getAppMetaData(user.email);
  //   console.log(appMetaData.data[0]['app_metadata']['domain']);
  //   return appMetaData.data[0]['app_metadata']['domain'];
  // };

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

  //get the config from the config file based on environment variable
  //TODO: currently not working and need to fix properly, need to change the last if in each environment
  const getConfig = () => {
    let config2used = selectConfig(URL, userDomain, code)
    setConf(config2used)
  }

  //once config have been extracted, process based on config instructions
  useEffect(async () => {
    if (conf) {
      setListFields(conf.listFields)
      const staticQueryID = conf.staticSource.queryID
      const staticDomain = conf.staticSource.domain
      const staticKey = conf.staticSource.key
      //extract static data set
      let sD = await getDataFromVAL(staticQueryID, staticDomain, 'static', code, true)
      //extract metric data set
      const metricQueryID = conf.metricSource.queryID
      const metricDomain = conf.metricSource.domain
      const metricKey = conf.metricSource.key
      let mD = await getDataFromVAL(metricQueryID, metricDomain, 'metric', code, true)
      //extract the metrics that will be used to calculate latestMetrics, priorMetrics and changeMetrics
      const changeKey = conf.change.valueKey
      //extract the key for the trend data aka the chart data
      const trendQueryID = conf.chartSource.queryID
      const trendDomain = conf.chartSource.domain
      const chartValueKey = conf.chartSource.valueKey
      const chartGroupKey = conf.chartSource.groupKey

      // start merging of static and metric data
      let merged = merge.merge(sD, mD, staticKey, metricKey)

      //extract trend data set
      const trendKey = conf.chartSource.key
      let tD = await getDataFromVAL(trendQueryID, trendDomain, 'trend', code, true)

      console.log('Static Data', sD)
      console.log('Metric Data', mD)
      console.log('Trend Data', tD)
      console.log('Merged:', merged)

      //filter each item separately from the trend data to calculate the latestMetrics, priorMetrics and changeMetrics by iterating thru the merged data
      const filteredItemTrendData = await merged.map((item) => {
        // let sparklineDataArray = [];
        let filteredChart
        //filter by matching to the static data key
        // check if the attribute storing the key in metric is a value in the array or not as different processing required
        filteredChart = selectObject(tD, metricKey, trendKey, item[staticKey])

        // if data exists in the trend data for the item, start the calculating
        if (filteredChart.length > 0) {
          let latestMetric = 0,
            priorMetric = 0
          let latestObject = array.mostRecentObject(filteredChart, chartGroupKey)
          latestMetric = latestObject[changeKey]

          // if more than 1 rows of data exists in the trend data for the item, start the calculating
          if (filteredChart.length > 1) {
            // get the the 2nd recent date object in the trend data for the selected item
            const secondLatestDate = array.most2ndRecentObject(filteredChart, chartGroupKey)
            priorMetric = secondLatestDate[changeKey]
          } else {
            priorMetric = 0
          }

          // calculate change metrics
          let changeMetric = latestMetric - priorMetric
          let changeMetricPercent = ((latestMetric - priorMetric) / priorMetric) * 100

          item['latestMetric'] = latestMetric
          item['priorMetric'] = priorMetric
          item['changeMetric'] = changeMetric
          item['changeMetricPercent'] = changeMetricPercent

          // -----  test to get weekly
          let weeklyChangeTrend = aggregate.group2Weekly(
            filteredChart,
            chartGroupKey,
            chartValueKey
          )
          item['change'] = weeklyChangeTrend
        }

        // return enrich items that contain the latestMetrics, priorMetrics and changeMetrics
        return item
      })

      console.log('Combined: ', filteredItemTrendData)
      setRowData(merged)
    }
  }, [conf])

  //  if (errors != 200) {
  //     return <ErrorScreen />;
  //   }
  return (
    <Page title={title}>
      <RootStyle>
        <Container>
          {user ? (
            <AgGrid type={'list'} conf={conf} entity={code} rowD={rowData} title={title} />
          ) : (
            <>
              Please login to see data
              <br />
              <br />
            </>
          )}
        </Container>
      </RootStyle>
    </Page>
  )
}
