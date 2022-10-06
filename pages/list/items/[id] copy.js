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
import * as gtag from '../../../lib/gtag'
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
  const [job, setJob] = useState()
  const [dataRows, setDataRows] = useState([])
  const [fullConfig, setFullConfig] = useState({})
  const [itemId, setItemId] = useState()
  const [entity, setEntity] = useState()
  const [chartData, setChartData] = useState([])
  const [staticQueryID, setStaticQueryID] = useState()
  const [staticDomain, setStaticDomain] = useState()
  const [metricQueryID, setMetricQueryID] = useState()
  const [metricDomain, setMetricDomain] = useState()
  const [staticData, setStaticData] = useState()
  const [metricData, setMetriccData] = useState()
  const [allChartData, setAllChartData] = useState([])
  const [multiSeriesChannelData, setMultiSeriesChannelData] = useState([])
  const [uniqueChannels, setUniqueChannels] = useState([])
  const [channelPerformanceTab, setChannelPerformanceTab] = useState(false)

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
  //TODO: currently not working and need to fix properly, need to change the last if in each environment
  const getConfig = (code) => {
    let config2used = selectConfig(userDomain, code)
    setFullConfig(config2used)

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

  // get chart aka trend data from VAL
  const getChartData = async (conf) => {
    let contentType = 'trend'
    let dataType = entity
    let data
    if (URL.includes('localhost')) {
      let localJsonData
      localJsonData = selectLocalDataSource(contentType, dataType, conf.chartSource.domain)
      data = localJsonData
    }
    if (URL.includes('datanet')) {
      let valChartData = await readVAL({
        queryID: conf.chartSource.queryID,
        domain: conf.chartSource.domain,
        contentType: 'trend',
        dataType: entity,
        cache: true,
      })
      data = valChartData.data
    }

    console.log('All Chart Datat: ', data)
    setAllChartData(data)
    // console.log('Chart: ', data);
    let filteredChart = []
    if (data.length > 0) {
      filteredChart = selectObject(data, conf.chartSource.key, conf.metricSource.key, itemId)
    }

    return filteredChart
  }

  // if (jobError) {
  //   return <ErrorScreen />;
  // }

  useEffect(async () => {
    if (router.isReady) {
      // console.log(router.query);
      let { id, entity } = router.query
      // console.log(entity);
      if (entity && userDomain) {
        // let configJson = JSON.parse(conf);
        setEntity(entity)
        let conf = await getConfig(entity)
        setFullConfig(conf)
        setItemId(id)
        setStaticQueryID(conf.staticSource.queryID)
        setStaticDomain(conf.staticSource.domain)
        setMetricQueryID(conf.metricSource.queryID)
        setMetricDomain(conf.metricSource.domain)
        if (user && URL.includes('datanet.thinkval.io')) {
          gtag.event({ action: 'screenview', category: entity, label: user.email, value: 1 })
        }
      }
    }
  }, [router.isReady, userDomain])

  //once static query and domain available extract static and trend aka chart data
  useEffect(async () => {
    if (staticQueryID && staticDomain) {
      let sD = await getDataFromVAL(staticQueryID, staticDomain, 'static', entity, true)
      setStaticData(sD)
      let finalChartValue = await getChartData(fullConfig)
      setChartData(finalChartValue)
    }
  }, [staticQueryID, staticDomain])

  //once metric query and domain available extract metric data
  useEffect(async () => {
    if (metricQueryID && metricDomain) {
      let mD = await getDataFromVAL(metricQueryID, metricDomain, 'metric', entity, true)
      setMetriccData(mD)
    }
  }, [metricQueryID, metricDomain])

  //once all data available starts massaging the end result data
  useEffect(async () => {
    if (
      staticData &&
      metricData &&
      staticData.length > 0 &&
      metricData.length > 0 &&
      allChartData.length > 0
    ) {
      const staticKey = fullConfig.staticSource.key
      const metricKey = fullConfig.metricSource.key
      const changeKey = fullConfig.change.valueKey
      const trendKey = fullConfig.chartSource.key
      const chartGroupKey = fullConfig.chartSource.groupKey

      // start merging of static and metric data
      let merged = merge.merge(staticData, metricData, staticKey, metricKey)

      console.log('Static Data', staticData)
      console.log('Metric Data', metricData)
      console.log('Trend Data', allChartData)
      console.log('Chart Specific Data', chartData)
      console.log('Merged:', merged)

      //filter each item separately from the trend data to calculate the latestMetrics, priorMetrics and changeMetrics by iterating thru the merged data
      const filteredItemTrendData = await merged.map((item) => {
        let filteredChart
        //filter by matching to the static data key
        // check if the attribute storing the key in metric is a value in the array or not as different processing required
        filteredChart = selectObject(allChartData, metricKey, trendKey, item[staticKey])

        // if data exists in the trend data for the item, start the calculating
        if (filteredChart.length > 0) {
          let latestMetric = 0,
            priorMetric = 0
          // get the the most recent date in the data set belonging to the selected item
          let latestObject = array.mostRecentObject(filteredChart, chartGroupKey)
          latestMetric = latestObject[changeKey]

          // if more than 1 rows of data exists in the trend data for the item, start the calculating
          if (filteredChart.length > 1) {
            // get the the 2nd recent date object in the trend data for the selected item
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
        }

        // return enrich items that contain the latestMetrics, priorMetrics and changeMetrics
        return item
      })

      merged = filteredItemTrendData

      const { detailFields, listFields } = fullConfig
      //filter the selected item from the newly merged data with trend
      let filtered = merged.find((merge) => merge[staticKey] === itemId)
      //fetch the fields to show from static and metric
      const fields2ShowList = Object.keys(listFields)
      let jobObj = {}
      fields2ShowList.forEach((field2Show) => {
        jobObj[field2Show] = filtered[listFields[field2Show].sourceColumn]
      })
      //fetch the fields to show at the table level
      const fields2ShowDetail = Object.keys(detailFields)
      let jobArray = []
      fields2ShowDetail.forEach((field2Show) => {
        jobArray.push({
          name: detailFields[field2Show].sourceColumn,
          value: filtered[detailFields[field2Show].sourceColumn],
        })
      })
      setJob(jobObj)
      setDataRows(jobArray)

      //!--------- group by channel performance
      if (fullConfig.channelPerformanceSource) {
        setChannelPerformanceTab(true)
        const channelGroupKey = fullConfig.channelPerformanceSource.groupKey
        const channelGroupPeriodKey = fullConfig.channelPerformanceSource.groupPeriodKey
        const channelValueKey = fullConfig.channelPerformanceSource.valueKey
        const { queryID, domain, key } = fullConfig.channelPerformanceSource

        let cpd = await getDataFromVAL(queryID, domain, 'channel', entity, true)
        console.log('Channel Data', cpd)

        let cpdFiltered = cpd.filter((row) => row[key] == itemId)
        console.log('Channel Data Filtered', cpdFiltered)

        let groupByChannel = await groupBy.groupBySum(cpdFiltered, {
          groupKeys: [channelGroupPeriodKey, channelGroupKey],
          sumKeys: [channelValueKey],
          excludeBlank: false,
        })

        let groupByChannelNew = []
        groupByChannel.forEach(function (item, index) {
          let properDate = new Date(item[channelGroupPeriodKey])
          item.DateNumber = moment(properDate).valueOf()
          groupByChannelNew.push(item)
        })

        const arrayUniqueByKey = groupByChannelNew
          .map((item) => item[channelGroupKey])
          .filter((value, index, self) => self.indexOf(value) === index)
        setUniqueChannels(arrayUniqueByKey)
        console.log('Unique Channels', arrayUniqueByKey)

        let multiSeriesData = []

        arrayUniqueByKey.forEach(function (item, index) {
          let seriesObject = groupByChannelNew.filter((row) => row[channelGroupKey] == item)
          multiSeriesData.push({ name: item, data: seriesObject })
        })

        console.log('ID MultiSeries:', multiSeriesData)
        setMultiSeriesChannelData(multiSeriesData)
      }

      //!--------- group by channel performance
    }
  }, [staticData, metricData, allChartData, chartData])

  if (!job) {
    return <LoadingScreen />
  } else {
    return (
      <Page title={entity + ' | ' + job.name}>
        <RootStyle>
          <ItemHero job={job} entity={entity} />
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
                        <Tab label="Summary" {...a11yProps(0)} />
                        {channelPerformanceTab && (
                          <Tab label="Channel Performance" {...a11yProps(1)} />
                        )}
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0} sx={{ padding: '0px' }}>
                      {/* <ReactChartsLine
                        widgetHeight={'40vh'}
                        conf={fullConfig}
                        chartData={chartData}
                      /> */}
                      <br />
                      <SimpleAreaChart conf={fullConfig} chartData={chartData} />
                      <DataTable job={dataRows} conf={fullConfig} />
                    </TabPanel>
                    {channelPerformanceTab && (
                      <TabPanel value={value} index={1}>
                        <MultiLineSeriesChart
                          conf={fullConfig}
                          chartData={multiSeriesChannelData}
                          uniqueChannels={uniqueChannels}
                        />
                        <br />
                        <Stack sx={{ marginTop: '10px' }} spacing={2}>
                          <DataTableGroup
                            job={multiSeriesChannelData}
                            conf={fullConfig}
                            // uniqueChannels={uniqueChannels}
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
                        <Tab label="Summary" {...a11yProps(0)} />
                        {channelPerformanceTab && (
                          <Tab label="Channel Performance" {...a11yProps(1)} />
                        )}
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <SimpleAreaChart conf={fullConfig} chartData={chartData} />
                      <br />
                      <Stack sx={{ marginTop: '10px' }} direction="row" spacing={2}>
                        <DataTable job={dataRows.slice(0, 7)} conf={fullConfig} />
                        <DataTable job={dataRows.slice(7, 14)} conf={fullConfig} />
                      </Stack>
                    </TabPanel>
                    {channelPerformanceTab && (
                      <TabPanel value={value} index={1}>
                        <MultiLineSeriesChart
                          conf={fullConfig}
                          chartData={multiSeriesChannelData}
                          uniqueChannels={uniqueChannels}
                        />
                        <br />
                        <Stack sx={{ marginTop: '10px' }} spacing={2}>
                          <DataTableGroup
                            job={multiSeriesChannelData}
                            conf={fullConfig}
                            // uniqueChannels={uniqueChannels}
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
