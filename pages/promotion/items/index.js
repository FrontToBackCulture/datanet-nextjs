import React, { useState, useEffect, useRef } from 'react';
// next
import { useRouter, withRouter } from 'next/router';
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
import conf from '../../../config/promotions.json';

import { readVAL } from '../../api/grpc';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function PromotionItemsPage() {
  const [errors, setErrors] = useState();
  const [rowData, setRowData] = useState([]);

  const { listFields } = conf;
  console.log('Promotion ListFields:', listFields);

  // const router = useRouter();
  // console.log('Promotion Query: ', router.query);

  const getJobs = async () => {
    let valJobs = await readVAL({ queryID: '10', domain: 'dev' });
    setRowData(valJobs.data);
    setErrors(valJobs.status);
    console.log(valJobs.status);
  };

  useEffect(() => {
    getJobs();
  }, []);

  //  if (errors != 200) {
  //     return <ErrorScreen />;
  //   }

  return (
    <Page title="Promotions">
      <RootStyle>
        <Container>
          <PromotionItemBarFilters />
          <AgGrid rowD={rowData} type={'promotion'} fieldConf={listFields} fullConf={conf} />
          {/* <AgGrid rowD={rowData} type={'promotion'} /> */}
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

PromotionItemsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
