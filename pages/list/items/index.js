import React, { useState, useEffect, useRef } from 'react';
// auth
import { useUser } from '@auth0/nextjs-auth0';
// next
import { useRouter, withRouter } from 'next/router';
import Link from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
import confFn from '../../../config/development/conf';
import confFnStage from '../../../config/staging/conf';
import confFnProd from '../../../config/production/conf';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, ErrorScreen } from '../../../src/components';
import AgGrid from '../../../src/components/AgGrid';
// api
import { readVAL } from '../../api/grpc';
import moment from 'moment';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function PromotionItemsPage() {
  const { user, error, isLoading } = useUser();
  const [rowData, setRowData] = useState([]);
  const [conf, setConf] = useState();
  const [listFields, setListFields] = useState();

  const router = useRouter();
  //get parameters from url query
  const { title, code } = router.query;

  //whenever query change get the relevant config based on the code attribute in the query
  useEffect(() => {
    console.log('Code:', code);
    setRowData([]);
    getConfig();
  }, [router.query]);

  // get static and metric data from VAL
  const getDataFromVAL = async (id, dom, contentType, dataType, cache) => {
    let valJobs = await readVAL({
      queryID: id,
      domain: dom,
      contentType: contentType,
      dataType: dataType,
      cache: cache,
    });
    return valJobs.data;
  };

  // get chart aka trend data from VAL
  // TODO: can remove if getData work
  const getChartData = async (conf) => {
    let valChartData = await readVAL({
      queryID: conf.chartSource.queryID,
      domain: conf.chartSource.domain,
    });
    let data = valChartData.data;
    return data;
  };

  //get the config from the config file based on environment variable
  //TODO: currently not working and need to fix properly, need to change the last if in each environment
  const getConfig = () => {
    let config;
    // console.log('MINIAPP_VALHOST: ', process.env.MINIAPP_VALHOST);
    // if (process.env.MINIAPP_VALHOST == 'local') {
    //   config = confFn.getConfig(code);
    //   setConf(config);
    // }
    // if (process.env.MINIAPP_VALHOST == 'dev') {
    //   config = confFnStage.getConfig(code);
    //   setConf(config);
    // }
    // if (process.env.MINIAPP_VALHOST == 'prod') {
    //   config = confFnProd.getConfig(code);
    //   setConf(config);
    // }
    config = confFnProd.getConfig(code);
    setConf(config);
  };

  //once config have been extracted, process based on config instructions
  useEffect(async () => {
    if (conf) {
      setListFields(conf.listFields);
      const staticQueryID = conf.staticSource.queryID;
      const staticDomain = conf.staticSource.domain;
      const staticKey = conf.staticSource.key;
      //extract static data set
      let sD = await getDataFromVAL(staticQueryID, staticDomain, 'static', code, true);
      //extract metric data set
      const metricQueryID = conf.metricSource.queryID;
      const metricDomain = conf.metricSource.domain;
      const metricKey = conf.metricSource.key;
      let mD = await getDataFromVAL(metricQueryID, metricDomain, 'metric', code, true);
      //extract the metrics that will be used to calculate latestMetrics, priorMetrics and changeMetrics
      const changeKey = conf.change.valueKey;
      //extract the key for the trend data aka the chart data
      const trendQueryID = conf.chartSource.queryID;
      const trendDomain = conf.chartSource.domain;
      const chartGroupKey = conf.chartSource.groupKey;

      // start merging of static and metric data
      let merged = [];
      for (let i = 0; i < sD.length; i++) {
        // check if the attribute storing the key in metric is a value in the array or not as different processing required
        if (Array.isArray(mD[0][metricKey])) {
          merged.push({
            ...sD[i],
            ...mD.find((itmInner) => itmInner[metricKey][0] === sD[i][staticKey]),
          });
        } else {
          merged.push({
            ...sD[i],
            ...mD.find((itmInner) => itmInner[metricKey] === sD[i][staticKey]),
          });
        }
      }

      //extract trend data set
      const trendKey = conf.chartSource.key;
      // let tD = await getChartData(conf);
      let tD = await getDataFromVAL(trendQueryID, trendDomain, 'trend', code, true);

      console.log('Static Data', sD);
      console.log('Metric Data', mD);
      console.log('Trend Data', tD);
      console.log('Merged:', merged);

      //filter each item separately from the trend data to calculate the latestMetrics, priorMetrics and changeMetrics by iterating thru the merged data
      const filteredItemTrendData = await merged.map((item) => {
        let filteredChart;
        //filter by matching to the static data key
        // check if the attribute storing the key in metric is a value in the array or not as different processing required
        if (Array.isArray(tD[0][metricKey])) {
          filteredChart = tD.filter((trend) => trend[trendKey][0] === item[staticKey]);
        } else {
          filteredChart = tD.filter((trend) => trend[trendKey] === item[staticKey]);
        }

        // if data exists in the trend data for the item, start the calculating
        if (filteredChart.length > 0) {
          // get the the most recent date in the data set belonging to the selected item
          var mostRecentDate = new Date(
            Math.max.apply(
              null,
              filteredChart.map((e) => {
                // return moment(new Date(e[chartGroupKey])).format('YYYY-MM-DD');
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
            console.log('D Time: ', d.getTime(), ' Most Recent Time: ', mostRecentDate.getTime());
            return d.getTime() == mostRecentDate.getTime();
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

      console.log('Combined: ', filteredItemTrendData);

      //setRowData for AG-Grid
      setRowData(merged);
    }
  }, [conf]);

  //  if (errors != 200) {
  //     return <ErrorScreen />;
  //   }
  if (user) {
    return (
      <Page title="Promotions">
        <RootStyle>
          <Container>
            {title}
            <AgGrid
              type={'list'}
              fieldConf={listFields}
              fullConf={conf}
              entity={code}
              rowD={rowData}
            />
          </Container>
        </RootStyle>
      </Page>
    );
  }
  return (
    <Page title="Promotions">
      <RootStyle>
        <Container>
          Please login to see data
          <br />
          <br />
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

PromotionItemsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
