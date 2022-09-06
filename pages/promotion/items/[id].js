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
// _data
// import _mock from '../../../_data/mock';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, ErrorScreen, LoadingScreen, SocialsButton } from '../../../src/components';
import ReactChartsLine from '../../../src/components/ReactCharts/ReactChartsLine';
import DataTable from '../../../src/components/DataTable';
// sections
import { PromotionItemHero } from '../../../src/sections/promotions';

import { readVAL } from '../../api/grpc';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const getJobs = async () => {
    let valJobs = await readVAL({ queryID: queryID, domain: domain });
    setJobs(valJobs.data);
    setErrors(valJobs.status);
  };

  // if (jobError) {
  //   return <ErrorScreen />;
  // }

  useEffect(() => {
    const { id, conf } = router.query;
    if (id && conf) {
      let configJson = JSON.parse(conf);
      setFullConfig(configJson);
      setItemId(id);
      setQueryID(configJson.source.queryID);
      setDomain(configJson.source.domain);
    }
  }, []);

  useEffect(() => {
    if (queryID && domain) {
      getJobs();
    }
  }, [queryID, domain]);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      const { detailFields } = fullConfig;
      const filtered = jobs.find((job) => job.ID === itemId);
      setOJob(filtered);
      const fields2Show = Object.keys(detailFields);
      let jobObj = {};
      let jobArray = [];
      fields2Show.forEach((field2Show) => {
        jobObj[field2Show] = filtered[detailFields[field2Show].sourceColumn];
        if (field2Show.includes('metric')) {
          jobArray.push({
            name: detailFields[field2Show].sourceColumn,
            value: filtered[detailFields[field2Show].sourceColumn].toFixed(2),
          });
        }
      });
      setJob(jobObj);
      setDataRows(jobArray);
    }
  }, [jobs]);

  if (!job) {
    return <LoadingScreen />;
  } else {
    return (
      <Page title={`Hello - Promotions`}>
        <RootStyle>
          <PromotionItemHero job={job} />

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
                    <TabPanel value={value} index={0}>
                      <ReactChartsLine widgetHeight={'20vh'} />
                      <DataTable job={dataRows} />
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
                      <Stack sx={{ marginTop: '10px' }} direction="row" spacing={2}>
                        <Grid item xs={5} md={5} lg={5}>
                          <ReactChartsLine widgetHeight={'40vh'} />
                        </Grid>
                        <Grid item xs={7} md={7} lg={7}>
                          <Stack sx={{ marginTop: '10px' }} direction="row" spacing={2}>
                            <DataTable job={dataRows.slice(0, 7)} />
                            <DataTable job={dataRows.slice(7, 14)} />
                          </Stack>
                        </Grid>
                      </Stack>
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
