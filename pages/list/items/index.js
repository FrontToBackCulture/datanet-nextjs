import React, { useState, useEffect } from 'react';
// auth
import { useUser } from '@auth0/nextjs-auth0';
// next
import { useRouter } from 'next/router';
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
import { getAppMetaData } from '../../api/auth/auth0API';
import moment from 'moment';
import outletData from '../../../data/outlet';
import productData from '../../../data/product';

import * as gtag from '../../../lib/gtag';

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
  if (typeof window !== 'undefined') {
    const URL = window.location.href;
  }

  //get parameters from url query
  const { title, code } = router.query;

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.event('event', 'screenview', {
        event_category: code,
        event_label: user.email,
        value: 1,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  //whenever query change get the relevant config based on the code attribute in the query
  useEffect(() => {
    console.log('Code:', code);
    setRowData([]);
    getConfig();
  }, [router.query]);

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
      let localJsonData;
      let outletJsonData = outletData[contentType].getData();
      let productJsonData = productData[contentType].getData();
      switch (dataType) {
        case 'outlet':
          localJsonData = outletJsonData;
          break;
        case 'product':
          localJsonData = productJsonData;
          break;
        default:
          break;
      }
      return localJsonData;
    }
    if (URL.includes('screener')) {
      let valJobs = await readVAL({
        queryID: id,
        domain: dom,
        contentType: contentType,
        dataType: dataType,
        cache: cache,
      });
      return valJobs.data;
    }
  };

  //get the config from the config file based on environment variable
  //TODO: currently not working and need to fix properly, need to change the last if in each environment
  const getConfig = () => {
    if (URL.includes('localhost')) {
      let config = confFn.getConfig(code);
      setConf(config);
    }
    if (URL.includes('melvinapps')) {
      let config = confFnStage.getConfig(code);
      setConf(config);
    }
    if (URL.includes('screener')) {
      let config = confFnProd.getConfig(code);
      setConf(config);
    }
  };

  function getWeek(date) {
    !(date instanceof Date) && (date = new Date());
    var nDay = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() - nDay + 3);
    var n1stThursday = date.valueOf();
    date.setMonth(0, 1);
    date.getDay() !== 4 && date.setMonth(0, 1 + ((4 - date.getDay() + 7) % 7));
    return 1 + Math.ceil((n1stThursday - date) / 604800000);
  }

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
      const chartValueKey = conf.chartSource.valueKey;
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
      let tD = await getDataFromVAL(trendQueryID, trendDomain, 'trend', code, true);

      console.log('Static Data', sD);
      console.log('Metric Data', mD);
      console.log('Trend Data', tD);
      console.log('Merged:', merged);

      //filter each item separately from the trend data to calculate the latestMetrics, priorMetrics and changeMetrics by iterating thru the merged data

      const filteredItemTrendData = await merged.map((item) => {
        // let sparklineDataArray = [];
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
            // console.log('D Time: ', d.getTime(), ' Most Recent Time: ', mostRecentDate.getTime());
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
          let changeMetricPercent = ((latestMetric - priorMetric) / priorMetric) * 100;

          item['latestMetric'] = latestMetric;
          item['priorMetric'] = priorMetric;
          item['changeMetric'] = changeMetric;
          item['changeMetricPercent'] = changeMetricPercent;

          // -----  test to get weekly

          let sparklineObj = {};
          sparklineObj[chartValueKey] = 0;
          var groups = filteredChart.reduce(function (r, d) {
              var week = parseInt(getWeek(new Date(d[chartGroupKey])));
              r[week] = r[week] ? r[week].concat(d) : [d];
              return r;
            }, {}),
            groupResult = Object.keys(groups).map(
              (week) =>
                (groups[week] = groups[week].reduce(
                  (a, o) => (
                    (a[chartValueKey] += o[chartValueKey] / groups[week].length),
                    // (a.ConversionRate += o.ConversionRate / groups[week].length),
                    // (a.VisitRate += o.VisitRate / groups[week].length),
                    a
                  ),
                  // { Week: week, ROAS: 0, ConversionRate: 0, VisitRate: 0 }
                  // { Week: week, 'Net Sales': 0, 'sum Quantity': 0 }
                  { ...sparklineObj, Week: week }
                ))
            );

          // console.log('Group Result:', groupResult);
          // ----- test to get weekly

          // sparkline based on daily data
          // sparklineDataArray = filteredChart.map((x) => {
          //   return [new Date(x[chartGroupKey]), x[chartValueKey]];
          // });
          // sparkline based on daily data

          item['change'] = groupResult;
        }

        // return enrich items that contain the latestMetrics, priorMetrics and changeMetrics
        return item;
      });

      console.log('Combined: ', filteredItemTrendData);

      //setRowData for AG-Grid
      // console.log(merged);
      setRowData(merged);
    }
  }, [conf]);

  //  if (errors != 200) {
  //     return <ErrorScreen />;
  //   }
  if (user) {
    return (
      <Page title={title}>
        <RootStyle>
          <Container>
            <AgGrid
              type={'list'}
              fieldConf={listFields}
              fullConf={conf}
              entity={code}
              rowD={rowData}
              title={title}
            />
          </Container>
        </RootStyle>
      </Page>
    );
  } else {
    return (
      <Page title={title}>
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
}

// ----------------------------------------------------------------------

PromotionItemsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
