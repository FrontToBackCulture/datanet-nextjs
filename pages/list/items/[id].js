import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Stack, Divider, Container, Typography, Tabs, Tab, Box } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
import confFn from '../../../config/development/conf';
import confFnStage from '../../../config/staging/conf';
import confFnProd from '../../../config/production/conf';
// hooks
import { seRequest, useResponsive } from '../../../src/hooks';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, ErrorScreen, LoadingScreen, SocialsButton } from '../../../src/components';
import DataTable from '../../../src/components/DataTable';
import SimpleAreaChart from '../../../src/components/Recharts/SimpleAreaChart';
// sections
import { PromotionItemHero } from '../../../src/sections/promotions';
// api
import { readVAL } from '../../api/grpc';
// utils
import moment from 'moment';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// ----------------------------------------------------------------------

export default function PromotionItemPage() {
  const [value, setValue] = useState(0);
  const [job, setJob] = useState();
  const [dataRows, setDataRows] = useState([]);
  const [fullConfig, setFullConfig] = useState({});
  const [itemId, setItemId] = useState();
  const [entity, setEntity] = useState();
  const [chartData, setChartData] = useState([]);
  const [staticQueryID, setStaticQueryID] = useState();
  const [staticDomain, setStaticDomain] = useState();
  const [metricQueryID, setMetricQueryID] = useState();
  const [metricDomain, setMetricDomain] = useState();
  const [staticData, setStaticData] = useState();
  const [metricData, setMetriccData] = useState();
  const [allChartData, setAllChartData] = useState([]);

  const isDesktop = useResponsive('up', 'md');
  const router = useRouter();

  //tab value changes
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //get the config from the config file based on environment variable
  //TODO: currently not working and need to fix properly, need to change the last if in each environment
  const getConfig = (code) => {
    let config;
    if (process.env.DEPLOY_STAGE == 'development') {
      config = confFn.getConfig(code);
      setFullConfig(config);
    }
    if (process.env.DEPLOY_STAGE == 'staging') {
      config = confFnStage.getConfig(code);
      setFullConfig(config);
    }
    if (process.env.DEPLOY_STAGE == 'production') {
      config = confFnProd.getConfig(code);
      setFullConfig(config);
    }
    if (!process.env.DEPLOY_STAGE) {
      config = confFnProd.getConfig(code);
      setFullConfig(config);
    }
    return config;
  };

  // get data from VAL
  const getDataFromVAL = async (qId, dom, contentType, dataType, cache) => {
    let valJobs = await readVAL({
      queryID: qId,
      domain: dom,
      contentType: contentType,
      dataType: dataType,
      cache: cache,
    });
    return valJobs.data;
  };

  // get chart aka trend data from VAL
  const getChartData = async (conf) => {
    console.log('Full Config: ', conf.chartSource.queryID, conf.chartSource.domain);
    // console.log('ID: ', itemId);
    let valChartData = await readVAL({
      queryID: conf.chartSource.queryID,
      domain: conf.chartSource.domain,
      contentType: 'trend',
      dataType: entity,
      cache: true,
    });
    let data = valChartData.data;
    console.log('All Chart Datat: ', data);
    setAllChartData(data);
    // console.log('Chart: ', data);
    let filteredChart = [];
    if (data.length > 0) {
      if (Array.isArray(data[0][conf.metricSource.key])) {
        console.log('Chart Data Key is array:', data[0][conf.metricSource.key]);
        filteredChart = await data.filter((trend) => trend[conf.chartSource.key][0] === itemId);
      } else {
        console.log('Chart Data Key is not array:', data[conf.metricSource.key]);
        filteredChart = await data.filter((trend) => trend[conf.chartSource.key] === itemId);
      }
    }

    return filteredChart;
  };

  // if (jobError) {
  //   return <ErrorScreen />;
  // }

  useEffect(async () => {
    if (router.isReady) {
      // console.log(router.query);
      let { id, entity } = router.query;
      // console.log(entity);
      if (entity) {
        // console.log(entity);
        // let configJson = JSON.parse(conf);
        setEntity(entity);
        let conf = await getConfig(entity);
        setFullConfig(conf);
        setItemId(id);
        setStaticQueryID(conf.staticSource.queryID);
        setStaticDomain(conf.staticSource.domain);
        setMetricQueryID(conf.metricSource.queryID);
        setMetricDomain(conf.metricSource.domain);
      }
    }
  }, [router.isReady]);

  //once static query and domain available extract static and trend aka chart data
  useEffect(async () => {
    if (staticQueryID && staticDomain) {
      let sD = await getDataFromVAL(staticQueryID, staticDomain, 'static', entity, true);
      setStaticData(sD);
      let finalChartValue = await getChartData(fullConfig);
      console.log('FINAL CHART VALUE:', finalChartValue);
      setChartData(finalChartValue);
    }
  }, [staticQueryID, staticDomain]);

  //once metric query and domain available extract metric data
  useEffect(async () => {
    if (metricQueryID && metricDomain) {
      let mD = await getDataFromVAL(metricQueryID, metricDomain, 'metric', entity, true);
      setMetriccData(mD);
    }
  }, [metricQueryID, metricDomain]);

  //once all data available starts massaging the end result data
  useEffect(async () => {
    if (
      staticData &&
      metricData &&
      staticData.length > 0 &&
      metricData.length > 0 &&
      allChartData.length > 0
    ) {
      const staticKey = fullConfig.staticSource.key;
      const metricKey = fullConfig.metricSource.key;
      const changeKey = fullConfig.change.valueKey;
      const trendKey = fullConfig.chartSource.key;
      const chartGroupKey = fullConfig.chartSource.groupKey;

      // start merging of static and metric data
      let merged = [];
      for (let i = 0; i < staticData.length; i++) {
        // check if the attribute storing the key in metric is a value in the array or not as different processing required
        if (Array.isArray(metricData[0][metricKey])) {
          merged.push({
            ...staticData[i],
            ...metricData.find((itmInner) => itmInner[metricKey][0] === staticData[i][staticKey]),
          });
        } else {
          merged.push({
            ...staticData[i],
            ...metricData.find((itmInner) => itmInner[metricKey] === staticData[i][staticKey]),
          });
        }
      }

      console.log('Static Data', staticData);
      console.log('Metric Data', metricData);
      console.log('Trend Data', allChartData);
      console.log('Chart Specific Data', chartData);
      console.log('Merged:', merged);

      //filter each item separately from the trend data to calculate the latestMetrics, priorMetrics and changeMetrics by iterating thru the merged data
      const filteredItemTrendData = await merged.map((item) => {
        let filteredChart;
        //filter by matching to the static data key
        // check if the attribute storing the key in metric is a value in the array or not as different processing required
        if (Array.isArray(allChartData[0][metricKey])) {
          filteredChart = allChartData.filter((trend) => trend[trendKey][0] === item[staticKey]);
        } else {
          filteredChart = allChartData.filter((trend) => trend[trendKey] === item[staticKey]);
        }

        // if data exists in the trend data for the item, start the calculating
        if (filteredChart.length > 0) {
          // get the the most recent date in the data set belonging to the selected item
          var mostRecentDate = new Date(
            Math.max.apply(
              null,
              filteredChart.map((e) => {
                let mrd = new Date(moment(e[chartGroupKey]).format('YYYY-MM-DD'));
                // console.log(
                //   'Original:',
                //   e[chartGroupKey],
                //   ' Most Recent Object: ',
                //   new Date(e[chartGroupKey]),
                //   ' Suggested Most Recent Object: ',
                //   new Date(mrd)
                // );
                // return new Date(e[chartGroupKey]);
                return new Date(mrd);
              })
            )
          );

          let latestMetric = 0,
            priorMetric = 0;
          // get the the most recent date object in the trend data for the selected item
          var mostRecentObject = filteredChart.filter((e) => {
            // var d = new Date(e[chartGroupKey]);
            var d = new Date(moment(e[chartGroupKey]).format('YYYY-MM-DD'));
            // console.log('D Time: ', d.getTime());
            // console.log('Most Recent Time: ', mostRecentDate.getTime());
            console.log('D : ', d, ' Most Recent : ', mostRecentDate);
            // console.log('D Time: ', d.getTime(), ' Most Recent Time: ', mostRecentDate.getTime());
            // return d.getTime() == mostRecentDate.getTime();
            // return d == mostRecentDate;
          })[0];
          latestMetric = mostRecentObject[changeKey];

          // if more than 1 rows of data exists in the trend data for the item, start the calculating
          if (filteredChart.length > 1) {
            // get the the 2nd recent date object in the trend data for the selected item
            // get the the 2nd recent date object in the trend data for the selected item
            const secondLatestDate = filteredChart.sort(
              (a, b) => a[chartGroupKey] - b[chartGroupKey]
            )[filteredChart.length - 2];
            // console.log('Second Recent: ', secondLatestDate);
            priorMetric = secondLatestDate[changeKey];
          } else {
            priorMetric = 0;
          }

          // calculate change metrics
          let changeMetric = latestMetric - priorMetric;
          let changeMetricPercent = (latestMetric - priorMetric) / priorMetric;

          item['latestMetric'] = latestMetric;
          item['priorMetric'] = priorMetric;
          item['changeMetric'] = changeMetric;
          item['changeMetricPercent'] = changeMetricPercent;
        }

        // return enrich items that contain the latestMetrics, priorMetrics and changeMetrics
        return item;
      });

      merged = filteredItemTrendData;

      const { detailFields, listFields } = fullConfig;
      //filter the selected item from the newly merged data with trend
      let filtered = merged.find((merge) => merge[staticKey] === itemId);
      console.log('Selected Job: ', filtered);
      //fetch the fields to show from static and metric
      const fields2ShowList = Object.keys(listFields);
      let jobObj = {};
      fields2ShowList.forEach((field2Show) => {
        jobObj[field2Show] = filtered[listFields[field2Show].sourceColumn];
      });
      //fetch the fields to show at the table level
      const fields2ShowDetail = Object.keys(detailFields);
      let jobArray = [];
      fields2ShowDetail.forEach((field2Show) => {
        jobArray.push({
          name: detailFields[field2Show].sourceColumn,
          value: filtered[detailFields[field2Show].sourceColumn],
        });
      });
      setJob(jobObj);
      setDataRows(jobArray);
    }
  }, [staticData, metricData, allChartData, chartData]);

  if (!job) {
    return <LoadingScreen />;
  } else {
    return (
      <Page title={`Hello - Promotions`}>
        <RootStyle>
          <PromotionItemHero job={job} entity={entity} />
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
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      {/* <Stack sx={{ marginTop: '10px' }} direction="row" spacing={2}> */}
                      {/* <Grid item xs={12} md={12} lg={12}> */}
                      {/* <ReactChartsLine
                        widgetHeight={'40vh'}
                        conf={fullConfig}
                        chartData={chartData}
                      /> */}
                      <SimpleAreaChart conf={fullConfig} chartData={chartData} />
                      <br />
                      {/* </Grid> */}
                      {/* <Grid item xs={12} md={12} lg={12}> */}
                      <Stack sx={{ marginTop: '10px' }} direction="row" spacing={2}>
                        <DataTable job={dataRows.slice(0, 7)} conf={fullConfig} />
                        <DataTable job={dataRows.slice(7, 14)} conf={fullConfig} />
                      </Stack>
                      {/* </Grid> */}
                      {/* </Stack> */}
                    </TabPanel>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Container>
        </RootStyle>
      </Page>
    );
  }
}

// ----------------------------------------------------------------------

PromotionItemPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
