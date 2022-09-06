import React, { useState, useEffect, useRef } from 'react';

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
import { PromotionItemBarFilters } from '../../../src/sections/careers';

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
  // const { data: jobs = [], error } = useRequest({
  //   url: `/api/career/jobs`,
  // });
  const [errors, setErrors] = useState();
  const [rowData, setRowData] = useState([]);

  const getJobs = async () => {
    let valJobs = await readVAL({ queryID: '9', domain: 'dev' });
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
    <Page title="Jobs">
      <RootStyle>
        <Container>
          <PromotionItemBarFilters />
          <AgGrid rowD={rowData} type={'career'} />
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

PromotionItemsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
