import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Grid, Stack, Tabs, Tab, Box } from '@mui/material'
import { useUser } from '@auth0/nextjs-auth0'
import { useResponsive } from '../../../../src/hooks'
import { readVAL } from '../../../api/grpc'
import { dataNetMerge, dataNetPerformCalc, dataNetConvert2MultiSeries } from '../../../api/datanet'
import * as gtag from '../../../../lib/gtag'
import { Page, LoadingScreen } from '../../../../src/components'
import DataTable from '../../../../src/components/DataTable/DataTable'
import DataTableGroup from '../../../../src/components/DataTable/DataTableGroup'
import SimpleAreaChart from '../../../../src/components/Recharts/SimpleAreaChart'
import MultiLineSeriesChart from '../../../../src/components/Recharts/MultiLineSeriesChart'
import { ItemHero } from '../../../../src/sections/list'
import { selectObject, selectLocalDataSource } from '../../../../src/utils/selectScript'
import { selectConfig } from '../../../../config/selectConfig'
import { DomainContext, ROOT_DOMAIN, useUserDomain } from '../../../../src/contexts/DomainProvider'
import Header from '../../../../src/layouts/header/Header'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  console.log(`🚀 ~ props.multiSeriesChannelData`, props.multiSeriesChannelData)
  console.log(`🚀 ~ props.uniqueChannels`, props.uniqueChannels)

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  )
}

export default function PromotionItemPage({
  conf,
  tab1,
  tab1Name,
  multiSeriesChannelData,
  uniqueChannels,
  overviewName,
  item,
  dataRows,
  chartData,
}) {
  const { user } = useUser()
  const [tabId, setTabId] = useState(0)

  const isDesktop = useResponsive('up', 'md')
  const router = useRouter()

  const { domain, entity } = router.query

  const userDomain = useUserDomain()

  const selectedDomain = userDomain === ROOT_DOMAIN ? domain : userDomain

  const switchTab = (_event, newTabId) => {
    setTabId(newTabId)
  }

  useEffect(() => {
    if (user && process.env.NEXT_PUBLIC_CONFIGURATION === 'production') {
      gtag.event({ action: 'screenview', category: entity, label: user.email, value: 1 })
    }
  }, [user, entity])

  if (!item) {
    return <LoadingScreen />
  }

  const dataRowsByChunk = isDesktop ? _.chunk(dataRows, Math.ceil(dataRows.length / 2)) : [dataRows]

  return (
    <DomainContext.Provider value={selectedDomain}>
      <Stack height={1}>
        <Header />
        <Page title={`${entity} | ${item.name}`}>
          <ItemHero item={item} entity={entity} />
          <Stack spacing={2} flexGrow={1}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabId}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={switchTab}
              >
                <Tab label={overviewName} />
                {tab1 && <Tab label={tab1Name} />}
              </Tabs>
            </Box>
            <TabPanel value={tabId} index={0}>
              <Stack spacing={3}>
                <SimpleAreaChart conf={conf} chartData={chartData} tab="overview" />
                <Stack direction="row" spacing={2}>
                  {dataRowsByChunk.map((dataRows, i) => (
                    <DataTable key={i} job={dataRows} conf={conf} tabType="overview" />
                  ))}
                </Stack>
              </Stack>
            </TabPanel>
            <TabPanel value={tabId} index={1}>
              <Stack spacing={3}>
                <MultiLineSeriesChart
                  conf={conf}
                  chartData={multiSeriesChannelData}
                  uniqueChannels={uniqueChannels}
                  tab="tab1"
                />
                <Stack sx={{ marginTop: '10px' }} spacing={2}>
                  <DataTableGroup job={multiSeriesChannelData} conf={conf} tabType="tab1" />
                </Stack>
              </Stack>
            </TabPanel>
          </Stack>
        </Page>
      </Stack>
    </DomainContext.Provider>
  )
}

const getDataFromVAL = async (qId, dom, contentType, dataType, cache) => {
  if (process.env.NEXT_PUBLIC_CONFIGURATION === 'development') {
    return selectLocalDataSource(contentType, dataType, dom)
  }
  const valJobs = await readVAL({
    queryID: qId,
    domain: dom,
    contentType,
    dataType,
    cache,
  })
  return valJobs.data
}

export const getServerSideProps = async ({ params }) => {
  const { domain, entity, id } = params

  const selectedDomain = domain

  const domainConf = selectConfig(selectedDomain)

  const conf = domainConf.entities[entity]

  const { dataSources, listFields, detailFields } = conf

  const { trendSource } = dataSources
  const { overview } = detailFields
  const staticKey = dataSources.staticSource.key
  const metricKey = dataSources.metricSource.key
  const trendKey = dataSources.trendSource.key

  const overviewName = detailFields?.overview?.name

  // iterate thru all the datasources define, cache and extract to UI
  const allData = {}
  for (const dataSet of Object.keys(dataSources)) {
    const { domain, queryID, contentType, name } = dataSources[dataSet]
    const data = await getDataFromVAL(queryID, domain, contentType, entity, true)
    allData[name] = data
  }

  const mergeParams = {
    arr1: allData[`${entity}Static`],
    arr2: allData[`${entity}Metrics`],
    arr1Key: staticKey,
    arr2Key: metricKey,
    domain: selectedDomain,
    dataType: entity,
  }

  // merge static and metric
  let mergeStaticMetricData = await dataNetMerge(mergeParams)
  mergeStaticMetricData = mergeStaticMetricData.data
  allData.mergeStaticMetric = mergeStaticMetricData

  const performCalcRequiredData = {}
  performCalcRequiredData.mergeStaticMetric = mergeStaticMetricData
  performCalcRequiredData[trendSource.name] = allData[trendSource.name]

  const performCalcParams = {
    data: performCalcRequiredData,
    conf,
    domain: selectedDomain,
    dataType: entity,
  }

  const performCalcData = (await dataNetPerformCalc(performCalcParams)).data

  // filter the selected item from the newly merged data with trend
  const filtered = performCalcData.find((merge) => merge[staticKey] === id)

  // for item hero -----------------------------------------
  // fetch the fields to show from static and metric
  let item = {}
  Object.keys(listFields).forEach((field2Show) => {
    const variableMetric = conf.variablesMetrics[listFields[field2Show].variablesMetrics]
    item[field2Show] = filtered[variableMetric.sourceColumn]
  })

  // for item hero -----------------------------------------

  // fetch the fields to show at the table level for overview aka landing page of each item   --------------------
  const fields2ShowDetail = Object.keys(overview.table)
  const dataRows = fields2ShowDetail.map((field2Show) => {
    const variableMetric = conf.variablesMetrics[overview.table[field2Show].variablesMetrics]
    return {
      name: variableMetric.headerName,
      value: filtered[variableMetric.sourceColumn],
    }
  })
  // fetch the fields to show at the table level for overview aka landing page of each item   --------------------

  // fetch the data for the chart for overview aka landing page    --------------------
  let chartData = []
  if (allData[dataSources[overview.chart.dataSource].name].length > 0) {
    chartData = selectObject(
      allData[dataSources[overview.chart.dataSource].name],
      trendKey,
      metricKey,
      id
    )
  }
  // fetch the data for the chart  for overview aka landing page  --------------------

  // group by channel performance   --------------------
  let multiSeriesChannelData = null
  let uniqueChannels = null
  if (detailFields.tab1) {
    const { tab1 } = detailFields
    const { chart } = tab1
    const { key, contentType } = dataSources[chart.dataSource]
    const cpd = allData[dataSources[chart.dataSource].name]

    // filter data specific to this id
    const cpdFiltered = cpd.filter((row) => row[key] === id)

    const convert2MultiSeriesParams = {
      data: cpdFiltered,
      conf,
      domain: selectedDomain,
      dataType: entity,
      contentType,
      itemId: id,
    }

    // convert data into multiseries
    const multiSeriesData = await dataNetConvert2MultiSeries(convert2MultiSeriesParams)
    const arrayUniqueByKey = multiSeriesData.data.uniqueKey
    multiSeriesChannelData = multiSeriesData.data.multiSeriesData
    uniqueChannels = arrayUniqueByKey
  }

  return {
    props: {
      conf,
      tab1: !!detailFields.tab1,
      tab1Name: detailFields?.tab1?.name ?? null,
      multiSeriesChannelData,
      uniqueChannels,
      overviewName,
      item,
      dataRows,
      chartData,
    },
  }
}
