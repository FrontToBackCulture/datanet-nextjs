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

console.log(process.env.DEPLOY_STAGE);
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
        <Box sx={{ p: 3 }}>
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
  const [chartData, setChartData] = useState();
  const [staticQueryID, setStaticQueryID] = useState();
  const [staticDomain, setStaticDomain] = useState();
  const [metricQueryID, setMetricQueryID] = useState();
  const [metricDomain, setMetricDomain] = useState();
  const [staticData, setStaticData] = useState();
  const [metricData, setMetriccData] = useState();

  const getConfig = (code) => {
    if (process.env.DEPLOY_STAGE == 'development') {
      let config = confFn.getConfig(code);
      setConf(config);
    }
    if (process.env.DEPLOY_STAGE == 'staging') {
      let config = confFnStage.getConfig(code);
      setConf(config);
    }
    if (process.env.DEPLOY_STAGE == 'production') {
      let config = confFnProd.getConfig(code);
      setConf(config);
    }
    console.log(config);
    return config;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const getJobs = async (qId, dom) => {
    console.log(qId, dom);
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
    console.log('Chart: ', data);
    const filteredChart = await data.filter((trend) => trend[conf.chartSource.key] === itemId);
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
      console.log(router.query);
      let { id, entity } = router.query;
      console.log(entity);
      if (entity) {
        console.log(entity);
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
      console.log(finalChartValue);
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
    if (staticData && metricData && staticData.length > 0 && metricData.length > 0) {
      const staticKey = fullConfig.staticSource.key;
      const metricKey = fullConfig.metricSource.key;
      let merged = [];

      // console.log(staticKey, metricKey);
      // console.log(staticData, metricData);

      for (let i = 0; i < staticData.length; i++) {
        merged.push({
          ...staticData[i],
          ...metricData.find((itmInner) => itmInner[metricKey] === staticData[i][staticKey]),
        });
      }

      // console.log(merged);

      const { detailFields, listFields } = fullConfig;
      const filtered = merged.find((merge) => merge[metricKey] === itemId);
      setOJob(filtered);
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
    }
  }, [staticData, metricData]);

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
                <Grid item xs={12} md={12} lg={12}>
                  <Box sx={{ width: '100%' }}>
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
                    <TabPanel value={value} index={0} style={{ padding: 0 }}>
                      <ReactChartsLine
                        widgetHeight={'40vh'}
                        conf={fullConfig}
                        chartData={chartData}
                      />
                      <br />
                      <DataTable job={dataRows} conf={fullConfig} />
                    </TabPanel>
                  </Box>
                </Grid>
              )}

              {isDesktop && (
                <Grid item xs={12} md={12} lg={12}>
                  <Box sx={{ width: '100%' }}>
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
                      <ReactChartsLine
                        widgetHeight={'40vh'}
                        conf={fullConfig}
                        chartData={chartData}
                      />
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
