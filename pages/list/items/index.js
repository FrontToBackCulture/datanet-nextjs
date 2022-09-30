//react
import React, { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// auth
import { useUser } from '@auth0/nextjs-auth0';
// other lbrary
import moment from 'moment';
import { array, merge, aggregate } from 'cuttle';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// api && lib
import { readVAL } from '../../api/grpc';
import { getAppMetaData } from '../../api/auth/auth0API';
import * as gtag from '../../../lib/gtag';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, ErrorScreen } from '../../../src/components';
import AgGrid from '../../../src/components/AgGrid/AgGrid';
// utils
import {
  selectConfig,
  selectObject,
  selectLocalDataSource,
  selectDomain,
} from '../../../src/utils/selectScript';
import { performCalc } from '../../../src/utils/metricCalc';

import { useDomainContext } from '../../../src/contexts/DomainProvider';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function ListPage() {
  const { user, error, isLoading } = useUser();
  const [userDomain, setUserDomain] = useState();
  const [rowData, setRowData] = useState([]);
  const [conf, setConf] = useState();

  // set domain to the selected domain in the header
  const selectedDomain = useDomainContext();

  // extract URL information
  const router = useRouter();
  if (typeof window !== 'undefined') {
    const URL = window.location.href;
  }

  //get parameters from url query
  const { title, code } = router.query;

  // if user login perform checks on email to determine domain
  useEffect(() => {
    if (user) {
      const regex = /@(\w+)/g;
      let result = user.email.match(regex)[0];
      result = result.substring(1, result.length);
      if (selectedDomain) {
        setUserDomain(selectDomain(selectedDomain));
      } else {
        setUserDomain(selectDomain(result));
      }
    }
  }, [user]);

  //whenever query or userDomain change
  //- get the relevant config
  //- reset row data to blank
  // - push event to GA4
  useEffect(() => {
    setRowData([]);
    getConfig();
    if (user && URL.includes('screener.thinkval.io')) {
      gtag.event({ action: 'screenview', category: code, label: user.email, value: 1 });
    }
  }, [router.query, userDomain]);

  //get config from the config file based on environment variable
  const getConfig = () => {
    let config2used = selectConfig(URL, userDomain, code);
    setConf(config2used);
  };

  //once config have been extracted, process based on config instructions
  useEffect(async () => {
    if (conf) {
      const { dataSources, variablesMetrics, listFields, detailFields } = conf;
      const { staticSource, metricSource, trendSource } = dataSources;
      const staticKey = dataSources['staticSource'].key;
      const metricKey = dataSources['metricSource'].key;
      const trendKey = dataSources['trendSource'].key;
      // iterate thru all the datasources define, cache and extract to UI
      let allData = {};
      await Object.keys(dataSources).map(async (dataSet, index) => {
        let { domain, queryID, contentType, name } = dataSources[dataSet];
        let data = await getDataFromVAL(queryID, domain, contentType, code, true);
        allData[name] = data;
      });

      console.log(allData);
      console.log(`${code}Static`, staticKey);
      console.log(`${code}Metrics`, metricKey);

      let mergeStaticMetricData;
      if (allData) {
        mergeStaticMetricData = await merge.merge(
          allData[`${code}Static`],
          allData[`${code}Metrics`],
          staticKey,
          metricKey
        );
        allData['mergeStaticMetric'] = mergeStaticMetricData;
      }

      console.log(allData);
      let performCalcData = await performCalc(allData, conf);
      console.log('Perform Calculation:', performCalcData);

      setRowData(performCalcData);
    }
  }, [conf]);

  // get static and metric data from VAL
  const getDataFromVAL = async (id, dom, contentType, dataType, cache) => {
    if (URL.includes('localhost')) {
      let localJsonData;
      localJsonData = selectLocalDataSource(contentType, dataType, dom);
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

  //  if (errors != 200) {
  //     return <ErrorScreen />;
  //   }
  if (user) {
    return (
      <Page title={title}>
        <RootStyle>
          <Container>
            <AgGrid type={'list'} conf={conf} entity={code} rowD={rowData} title={title} />
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

ListPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
