import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// next
import { useRouter, withRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Stack, Divider, Container, Typography, Tabs, Tab, Box } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// hooks
import { useRequest, useResponsive } from '../../../src/hooks';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, ErrorScreen, LoadingScreen, SocialsButton } from '../../../src/components';
import ReactChartsLine from '../../../src/components/ReactCharts/ReactChartsLine';
import DataTable from '../../../src/components/DataTable';
import SimpleAreaChart from '../../../src/components/Recharts/SimpleAreaChart';
// sections
import { PromotionItemHero } from '../../../src/sections/promotions';
// _data
// import _mock from '../../../_data/mock';
import confFn from '../../../config/development/conf';
import confFnStage from '../../../config/staging/conf';
import confFnProd from '../../../config/production/conf';

import { readVAL } from '../../api/grpc';
// utils
import { fCurrency, fShortenNumber } from '../../../src/utils/formatNumber';
import { DragControls } from 'framer-motion';

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
  const [errors, setErrors] = useState();
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState();
  const [oJob, setOJob] = useState();
  const [dataRows, setDataRows] = useState([]);
  const [fullConfig, setFullConfig] = useState({});
  const [queryID, setQueryID] = useState();
  const [domain, setDomain] = useState();
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const getJobs = async (qId, dom) => {
    let valJobs = await readVAL({ queryID: qId, domain: dom });
    // setJobs(valJobs.data);
    return valJobs.data;
    // setErrors(valJobs.status);
  };

  const getChartData = async (conf) => {
    // console.log('Full Config: ', fullConfig);
    // console.log('ID: ', itemId);
    let valChartData = await readVAL({
      queryID: conf.chartSource.queryID,
      domain: conf.chartSource.domain,
    });
    let data = valChartData.data;
    // console.log(data);
    setAllChartData(data);
    // console.log('Chart: ', data);
    let filteredChart;

    if (Array.isArray(chartData[0][conf.metricSource.key])) {
      console.log('Chart Data Key is array:', chartData[0][conf.metricSource.key]);
      filteredChart = await data.filter((trend) => trend[conf.chartSource.key][0] === itemId);
    } else {
      console.log('Chart Data Key is not array:', chartData[conf.metricSource.key]);
      filteredChart = await data.filter((trend) => trend[conf.chartSource.key] === itemId);
    }

    return filteredChart;
  };

  // if (jobError) {
  //   return <ErrorScreen />;
  // }

  // useEffect(async () => {
  //   let { id, entity } = router.query;
  //   console.log(router.query);
  //   console.log(entity);
  //   if (entity) {
  //     console.log(entity);
  //     // let configJson = JSON.parse(conf);
  //     setEntity(entity);
  //     let conf = await getConfig(entity);
  //     // setFullConfig(configJson);
  //     setItemId(id);
  //     setStaticQueryID(conf.staticSource.queryID);
  //     setStaticDomain(conf.staticSource.domain);
  //     setMetricQueryID(conf.metricSource.queryID);
  //     setMetricDomain(conf.metricSource.domain);
  //   }
  // }, []);

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

  useEffect(async () => {
    if (staticQueryID && staticDomain) {
      let sD = await getJobs(staticQueryID, staticDomain);
      setStaticData(sD);
      let finalChartValue = await getChartData(fullConfig);
      // console.log(finalChartValue);
      setChartData(finalChartValue);
    }
  }, [staticQueryID, staticDomain]);

  useEffect(async () => {
    if (metricQueryID && metricDomain) {
      let mD = await getJobs(metricQueryID, metricDomain);
      setMetriccData(mD);
    }
  }, [metricQueryID, metricDomain]);

  // useEffect(async () => {
  //   if (fullConfig.chartSource) {
  //     let finalChartValue = await getChartData(fullConfig);
  //     console.log(finalChartValue);
  //     setChartData(finalChartValue);
  //   }
  // }, [fullConfig]);

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
      const chartGroupKey = fullConfig.chartSource.groupKey;
      let merged = [];

      for (let i = 0; i < staticData.length; i++) {
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

      const trendKey = fullConfig.chartSource.key;
      console.log('Static Data', staticData);
      console.log('Metric Data', metricData);
      console.log('Trend Data', allChartData);
      console.log('Merged:', merged);
      // console.log('Merged:', merged);
      // console.log('All Chart Data', allChartData);

      const filteredItemTrendData = await merged.map((item) => {
        let filteredChart;
        if (Array.isArray(allChartData[0][metricKey])) {
          filteredChart = allChartData.filter((trend) => trend[trendKey][0] === item[staticKey]);
          // console.log(item[staticKey] + ': ', filteredChart);
        } else {
          filteredChart = allChartData.filter((trend) => trend[trendKey] === item[staticKey]);
          // console.log(item[staticKey] + ': ', filteredChart);
        }

        if (filteredChart.length > 0) {
          var mostRecentDate = new Date(
            Math.max.apply(
              null,
              filteredChart.map((e) => {
                return new Date(e[chartGroupKey]);
              })
            )
          );

          let latestMetric = 0,
            priorMetric = 0;
          var mostRecentObject = filteredChart.filter((e) => {
            // console.log(e);
            var d = new Date(e[chartGroupKey]);
            return d.getTime() == mostRecentDate.getTime();
          })[0];
          // console.log('Most Recent: ', mostRecentObject);
          latestMetric = mostRecentObject[changeKey];

          if (filteredChart.length > 1) {
            const secondLatestDate = filteredChart.sort(
              (a, b) => a[chartGroupKey] - b[chartGroupKey]
            )[filteredChart.length - 2];
            // console.log('Second Recent: ', secondLatestDate);
            priorMetric = secondLatestDate[changeKey];
          } else {
            priorMetric = 0;
          }

          let changeMetric = latestMetric - priorMetric;
          let changeMetricPercent = (latestMetric - priorMetric) / priorMetric;

          item['latestMetric'] = latestMetric;
          item['priorMetric'] = priorMetric;
          item['changeMetric'] = changeMetric;
          item['changeMetricPercent'] = changeMetricPercent;
        }

        // console.log(item);

        return item;
      });

      // console.log('Combined: ', filteredItemTrendData);

      merged = filteredItemTrendData;

      console.log('[ID] 2nd Merged:', merged);

      const { detailFields, listFields } = fullConfig;
      let filtered;
      filtered = merged.find((merge) => merge[staticKey] === itemId);

      setOJob(filtered);
      console.log('Selected Job: ', filtered);
      const fields2ShowList = Object.keys(listFields);
      let jobObj = {};
      fields2ShowList.forEach((field2Show) => {
        jobObj[field2Show] = filtered[listFields[field2Show].sourceColumn];
      });
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
      // console.log(jobObj);
      // console.log(jobArray);
    }
  }, [staticData, metricData, allChartData]);

  // useEffect(() => {
  //   if (jobs && jobs.length > 0) {
  //     const { detailFields, listFields } = fullConfig;
  //     const filtered = jobs.find((job) => job.ID === itemId);
  //     setOJob(filtered);
  //     const fields2ShowList = Object.keys(listFields);
  //     let jobObj = {};
  //     fields2ShowList.forEach((field2Show) => {
  //       jobObj[field2Show] = filtered[listFields[field2Show].sourceColumn];
  //     });
  //     const fields2ShowDetail = Object.keys(detailFields);
  //     let jobArray = [];
  //     fields2ShowDetail.forEach((field2Show) => {
  //       jobArray.push({
  //         name: detailFields[field2Show].sourceColumn,
  //         value: filtered[detailFields[field2Show].sourceColumn],
  //       });
  //     });
  //     setJob(jobObj);
  //     setDataRows(jobArray);
  //   }
  // }, [jobs]);

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
