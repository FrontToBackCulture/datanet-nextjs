//react
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// next
import { useRouter } from 'next/router'
// @mui
import { styled } from '@mui/material/styles'
import { Grid, Stack, Container, Typography, Tabs, Tab, Box } from '@mui/material'
// auth
import { useUser } from '@auth0/nextjs-auth0'
// other library
import moment from 'moment'
import { array, merge, aggregate, groupBy } from 'cuttle'
// hooks
import { useResponsive } from '../../../src/hooks'
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config'
// api && lib
import { readVAL } from '../../api/grpc'
import { dataNetMerge, dataNetPerformCalc, dataNetConvert2MultiSeries } from '../../api/datanet'
import * as gtag from '../../../lib/gtag'
// layouts
import Layout from '../../../src/layouts'
// components
import { Page, ErrorScreen, LoadingScreen } from '../../../src/components'
import DataTable from '../../../src/components/DataTable/DataTable'
import DataTableGroup from '../../../src/components/DataTable/DataTableGroup'
import SimpleAreaChart from '../../../src/components/Recharts/SimpleAreaChart'
import MultiLineSeriesChart from '../../../src/components/Recharts/MultiLineSeriesChart'
// sections
import { ItemHero } from '../../../src/sections/list'
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

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      // aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    // 'aria-controls': `simple-tabpanel-${index}`,
  }
}

// ----------------------------------------------------------------------

export default function PromotionItemPage() {
  const { user, error, isLoading } = useUser()
  const [userDomain, setUserDomain] = useState()
  const [value, setValue] = useState(0)
  const [item, setItem] = useState()
  const [dataRows, setDataRows] = useState([])
  const [conf, setConf] = useState({})
  const [entity, setEntity] = useState()
  const [chartData, setChartData] = useState([])
  const [multiSeriesChannelData, setMultiSeriesChannelData] = useState([])
  const [uniqueChannels, setUniqueChannels] = useState([])
  const [tab1, setTab1] = useState(false)
  const [tab2, setTab2] = useState(false)
  const [tab3, setTab3] = useState(false)
  const [overviewName, setOverviewName] = useState()
  const [tab1Name, setTab1Name] = useState()
  const [tab2Name, setTab2Name] = useState()
  const [tab3Name, setTab3Name] = useState()

  const selectedDomain = useDomainContext()

  const isDesktop = useResponsive('up', 'md')
  const router = useRouter()
  if (typeof window !== 'undefined') {
    const URL = window.location.href
  }

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

  //tab value changes
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  //get the config from the config file based on environment variable
  const getConfig = (code) => {
    let config2used = selectConfig(userDomain, code)
    setConf(config2used)

    return config2used
  }

  // get data from VAL
  const getDataFromVAL = async (qId, dom, contentType, dataType, cache) => {
    if (URL.includes('localhost')) {
      let localJsonData
      localJsonData = selectLocalDataSource(contentType, dataType, dom)
      return localJsonData
    }
    if (URL.includes('datanet')) {
      let valJobs = await readVAL({
        queryID: qId,
        domain: dom,
        contentType: contentType,
        dataType: dataType,
        cache: cache,
      })
      return valJobs.data
    }
  }

  useEffect(async () => {
    if (router.isReady) {
      let { id, entity } = router.query
      if (entity && userDomain) {
        if (user && URL.includes('datanet.thinkval.io')) {
          gtag.event({ action: 'screenview', category: entity, label: user.email, value: 1 })
        }
        setEntity(entity)
        let conf = await getConfig(entity)
        const { dataSources, variablesMetrics, listFields, detailFields } = conf
        const { staticSource, metricSource, trendSource } = dataSources
        const { overview, tab1, tab2 } = detailFields
        const staticKey = dataSources['staticSource'].key
        const metricKey = dataSources['metricSource'].key
        const trendKey = dataSources['trendSource'].key

        if (detailFields.overview) {
          setOverviewName(detailFields.overview.name)
        }

        if (detailFields.tab1) {
          setTab1(true)
          setTab1Name(detailFields.tab1.name)
        }

        if (detailFields.tab2) {
          setTab2(true)
          setTab2Name(detailFields.tab2.name)
        }

        if (detailFields.tab3) {
          setTab3(true)
          setTab3Name(detailFields.tab3.name)
        }

        // iterate thru all the datasources define, cache and extract to UI
        let allData = {}
        for (const dataSet of Object.keys(dataSources)) {
          console.log('Check', dataSet)
          let { domain, queryID, contentType, name } = dataSources[dataSet]
          let data = await getDataFromVAL(queryID, domain, contentType, entity, true)
          allData[name] = data
        }

        let mergeParams = {
          arr1: allData[`${entity}Static`],
          arr2: allData[`${entity}Metrics`],
          arr1Key: staticKey,
          arr2Key: metricKey,
          domain: userDomain,
          dataType: entity,
        }

        //merge static and metric
        let mergeStaticMetricData = await dataNetMerge(mergeParams)
        mergeStaticMetricData = mergeStaticMetricData.data
        allData['mergeStaticMetric'] = mergeStaticMetricData
        console.log('ID All Data:', allData)

        let performCalcRequiredData = {}
        performCalcRequiredData['mergeStaticMetric'] = mergeStaticMetricData
        performCalcRequiredData[trendSource.name] = allData[trendSource.name]

        let performCalcParams = {
          data: performCalcRequiredData,
          conf: conf,
          domain: userDomain,
          dataType: entity,
        }

        let performCalcData = await dataNetPerformCalc(performCalcParams)
        performCalcData = performCalcData.data
        console.log('Perform Calculation:', performCalcData)

        //filter the selected item from the newly merged data with trend
        let filtered = performCalcData.find((merge) => merge[staticKey] === id)
        console.log('Melvin Filtered:', filtered)

        // for item hero -----------------------------------------
        //fetch the fields to show from static and metric
        const fields2ShowList = Object.keys(listFields)
        let itemObj = {}
        fields2ShowList.forEach((field2Show) => {
          let variableMetric = conf['variablesMetrics'][listFields[field2Show].variablesMetrics]
          itemObj[field2Show] = filtered[variableMetric.sourceColumn]
        })
        setItem(itemObj)
        // for item hero -----------------------------------------

        //fetch the fields to show at the table level for overview aka landing page of each item   --------------------
        const fields2ShowDetail = Object.keys(overview['table'])
        let itemArray2 = []
        fields2ShowDetail.forEach((field2Show) => {
          let variableMetric =
            conf['variablesMetrics'][overview['table'][field2Show].variablesMetrics]
          itemArray2.push({
            name: variableMetric.headerName,
            value: filtered[variableMetric.sourceColumn],
          })
        })
        setDataRows(itemArray2)
        //fetch the fields to show at the table level for overview aka landing page of each item   --------------------

        //fetch the data for the chart for overview aka landing page    --------------------
        let filteredChart = []
        if (allData[dataSources[overview['chart']['dataSource']].name].length > 0) {
          filteredChart = selectObject(
            allData[dataSources[overview['chart']['dataSource']].name],
            trendKey,
            metricKey,
            id
          )
          setChartData(filteredChart)
        }
        //fetch the data for the chart  for overview aka landing page  --------------------

        //group by channel performance   --------------------
        if (detailFields.tab1) {
          const { tab1 } = detailFields
          const { chart } = tab1
          const { queryID, domain, key, groupKey, groupPeriodKey, valueKey, contentType } =
            dataSources[chart.dataSource]
          let cpd = allData[dataSources[chart.dataSource].name]

          // filter data specific to this id
          let cpdFiltered = cpd.filter((row) => row[key] == id)

          let convert2MultiSeriesParams = {
            data: cpdFiltered,
            conf: conf,
            domain: userDomain,
            dataType: entity,
            contentType: contentType,
            itemId: id,
          }

          // convert data into multiseries
          let multiSeriesData = await dataNetConvert2MultiSeries(convert2MultiSeriesParams)
          let arrayUniqueByKey = multiSeriesData.data.uniqueKey
          multiSeriesData = multiSeriesData.data.multiSeriesData
          setUniqueChannels(arrayUniqueByKey)
          setMultiSeriesChannelData(multiSeriesData)
          console.log('ID MultiSeries:', multiSeriesData)
        }

        //group by channel performance   --------------------
      }
    }
  }, [router.isReady, userDomain])

  if (!item) {
    return <LoadingScreen />
  } else {
    return (
      <Page title={entity + ' | ' + item.name}>
        <RootStyle>
          <ItemHero item={item} entity={entity} />
          <Container>
            <Grid container spacing={12}>
              {!isDesktop && (
                <Grid item xs={12} md={12} lg={12} sx={{ padding: '0px' }}>
                  <Box sx={{ width: '100%', padding: '0px' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '0px' }}>
                      <Tabs
                        value={value}
                        scrollButtons="auto"
                        variant="scrollable"
                        allowScrollButtonsMobile
                        onChange={handleChange}
                      >
                        <Tab label={overviewName} {...a11yProps(0)} />
                        {tab1 && <Tab label={tab1Name} {...a11yProps(1)} />}
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0} sx={{ padding: '0px' }}>
                      <br />
                      <SimpleAreaChart conf={conf} chartData={chartData} tab={'overview'} />
                      <DataTable job={dataRows} conf={conf} tabType={'overview'} />
                    </TabPanel>
                    {tab1 && (
                      <TabPanel value={value} index={1}>
                        <br />
                        <MultiLineSeriesChart
                          conf={conf}
                          chartData={multiSeriesChannelData}
                          uniqueChannels={uniqueChannels}
                          tab={'tab1'}
                        />
                        <Stack sx={{ marginTop: '10px' }} spacing={2}>
                          <DataTableGroup
                            job={multiSeriesChannelData}
                            conf={conf}
                            tabType={'tab1'}
                          />
                        </Stack>
                      </TabPanel>
                    )}
                  </Box>
                </Grid>
              )}

              {isDesktop && (
                <Grid item xs={12} md={12} lg={12}>
                  <Box sx={{ width: '100%', padding: '0px' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                        value={value}
                        scrollButtons="auto"
                        variant="scrollable"
                        allowScrollButtonsMobile
                        onChange={handleChange}
                      >
                        <Tab label={overviewName} {...a11yProps(0)} />
                        {tab1 && <Tab label={tab1Name} {...a11yProps(1)} />}
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <br />
                      <SimpleAreaChart conf={conf} chartData={chartData} tab={'overview'} />
                      <Stack sx={{ marginTop: '10px' }} direction="row" spacing={2}>
                        <DataTable job={dataRows.slice(0, 7)} conf={conf} tabType={'overview'} />
                        <DataTable job={dataRows.slice(7, 14)} conf={conf} tabType={'overview'} />
                      </Stack>
                    </TabPanel>
                    {tab1 && (
                      <TabPanel value={value} index={1}>
                        <br />
                        <MultiLineSeriesChart
                          conf={conf}
                          chartData={multiSeriesChannelData}
                          uniqueChannels={uniqueChannels}
                          tab={'tab1'}
                        />
                        <Stack sx={{ marginTop: '10px' }} spacing={2}>
                          <DataTableGroup
                            job={multiSeriesChannelData}
                            conf={conf}
                            tabType={'tab1'}
                          />
                        </Stack>
                      </TabPanel>
                    )}
                  </Box>
                </Grid>
              )}
            </Grid>
          </Container>
        </RootStyle>
      </Page>
    )
  }
}
