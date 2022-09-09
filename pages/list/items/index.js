import React, { useState, useEffect, useRef } from 'react';
// next
import { useRouter, withRouter } from 'next/router';
import Link from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// hooks
import { useRequest } from '../../../src/hooks';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, ErrorScreen } from '../../../src/components';
import AgGrid from '../../../src/components/AgGrid';
// sections
import { PromotionItemBarFilters } from '../../../src/sections/promotions';
// _data
// import confFn from '../../../config/conf';
import confFn from '../../../config/development/conf';
import confFnStage from '../../../config/staging/conf';
import confFnProd from '../../../config/production/conf';

import { readVAL } from '../../api/grpc';
import { useUser } from '@auth0/nextjs-auth0';

// ----------------------------------------------------------------------

// console.log(process.env.DEPLOY_STAGE);

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function PromotionItemsPage() {
  const { user, error, isLoading } = useUser();

  const [errors, setErrors] = useState();
  const [rowData, setRowData] = useState([]);
  const [conf, setConf] = useState();
  const [listFields, setListFields] = useState();
  const [staticData, setStaticData] = useState();
  const [metricData, setMetriccData] = useState();

  const router = useRouter();
  const { title, code } = router.query;

  const getConfig = () => {
    // console.log('Deploy Stage:', process.env.DEPLOY_STAGE);
    // console.log('Process Env:', process.env);
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
    if (!process.env.DEPLOY_STAGE) {
      let config = confFnProd.getConfig(code);
      setConf(config);
    }
  };

  useEffect(() => {
    // console.log('Code:', code);
    getConfig();
  }, [router.query]);

  useEffect(async () => {
    if (conf) {
      // console.log(conf);
      setListFields(conf.listFields);
      const staticQueryID = conf.staticSource.queryID;
      const staticDomain = conf.staticSource.domain;
      const staticKey = conf.staticSource.key;
      let sD = await getJobs(staticQueryID, staticDomain);
      setStaticData(sD);
      const metricQueryID = conf.metricSource.queryID;
      const metricDomain = conf.metricSource.domain;
      const metricKey = conf.metricSource.key;
      let mD = await getJobs(metricQueryID, metricDomain);
      setMetriccData(mD);
      const changeKey = conf.change.valueKey;
      const chartGroupKey = conf.chartSource.chartGroupKey;

      let merged = [];

      for (let i = 0; i < sD.length; i++) {
        merged.push({
          ...sD[i],
          ...mD.find((itmInner) => itmInner[metricKey] === sD[i][staticKey]),
        });
      }

      const trendKey = conf.chartSource.key;
      let tD = await getChartData(conf);
      console.log('Trend Data', tD);
      console.log('Merged:', merged);

      const filteredItemTrendData = await merged.map((item) => {
        const filteredChart = tD.filter((trend) => trend[trendKey] === item[staticKey]);
        console.log(item[staticKey] + ': ', filteredChart);

        var mostRecentDate = new Date(
          Math.max.apply(
            null,
            filteredChart.map((e) => {
              return new Date(e[chartGroupKey]);
            })
          )
        );

        var mostRecentObject = filteredChart.filter((e) => {
          console.log(e);
          var d = new Date(e[chartGroupKey]);
          return d.getTime() == mostRecentDate.getTime();
        })[0];

        const secondLatestDate = filteredChart.sort((a, b) => a[chartGroupKey] - b[chartGroupKey])[
          filteredChart.length - 2
        ];

        console.log('Most Recent: ', mostRecentObject);
        // console.log('Second Recent: ', secondLatestDate);

        let latestMetric = mostRecentObject[changeKey];
        let priorMetric = secondLatestDate[changeKey];
        let changeMetric = latestMetric - priorMetric;
        let changeMetricPercent = (latestMetric - priorMetric) / priorMetric;

        item['latestMetric'] = latestMetric;
        item['priorMetric'] = priorMetric;
        item['changeMetric'] = changeMetric;
        item['changeMetricPercent'] = changeMetricPercent;

        console.log(item);

        return item;
      });

      console.log('Combined: ', filteredItemTrendData);

      setRowData(merged);
    }
  }, [conf]);

  const getJobs = async (id, dom) => {
    // console.log(`List Get ${code}`, id, dom);
    // console.log('Trying to readVAL');
    let valJobs = await readVAL({ queryID: id, domain: dom });
    // console.log(`List Get Jobs Data ${code}`, valJobs.data);
    // setRowData(valJobs.data);
    // setErrors(valJobs.status);
    return valJobs.data;
  };

  const getChartData = async (conf) => {
    // console.log('Full Config: ', fullConfig);
    // console.log('ID: ', itemId);
    let valChartData = await readVAL({
      queryID: conf.chartSource.queryID,
      domain: conf.chartSource.domain,
    });
    let data = valChartData.data;
    // console.log('Chart: ', data);
    // const filteredChart = await data.filter((trend) => trend[conf.chartSource.key] === itemId);
    return data;
  };

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
          <Link href="../api/auth/login">Login</Link>
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
