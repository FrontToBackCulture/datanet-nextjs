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
  if (user) {
    return (
      <Page title="Promotions">
        <RootStyle>
          <Container>AM I STILL ALIVE???</Container>
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
