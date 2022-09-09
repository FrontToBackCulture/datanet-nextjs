import PropTypes from 'prop-types';
import { useState } from 'react';
// icons
import viewIcon from '@iconify/icons-carbon/view';
import locationIcon from '@iconify/icons-carbon/location';
import baggageClaim from '@iconify/icons-carbon/baggage-claim';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Box, Link, Button, Container } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils
import { fDate } from '../../../utils/formatTime';
import cssStyles from '../../../utils/cssStyles';
// components
import { FavoriteButton, Breadcrumbs, TextIconLabel, Iconify } from '../../../components';
// utils
import { fCurrency, fShortenNumber, fPercent } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(0),
  // ...cssStyles(theme).bgImage(),
}));

// ----------------------------------------------------------------------

CareerJobHero.propTypes = {
  job: PropTypes.shape({
    category: PropTypes.string,
    deadline: PropTypes.string,
    favorited: PropTypes.bool,
    location: PropTypes.string,
    slug: PropTypes.string,
    views: PropTypes.number,
  }),
};

export default function CareerJobHero({ job, entity }) {
  // const { shortCode, name, metric1, metric1PercentChange } = job;
  const { shortCode, name, metric1, metric2 } = job;
  // console.log(job);
  // let metric1PercentChange = 0.5;

  return (
    <RootStyle>
      <Container>
        {/* <Breadcrumbs
          // onDark
          links={[
            { name: 'Home', href: '/' },
            { name: entity, href: Routes.promotion.jobs },
            { name: job.slug },
          ]}
        /> */}

        {/* <Stack
          spacing={1}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between' }}
        > */}
        <Stack spacing={{ xs: 3, md: 2 }} sx={{ color: 'common.black' }}>
          <Typography variant="p" component="p">
            {name} ({shortCode})
          </Typography>
          <Typography
            variant="caption"
            component="caption"
            sx={{ textAlign: 'left' }}
            style={{ marginTop: '0px', color: 'grey' }}
          >
            Data updated with yesterday transactions.
          </Typography>
          <Typography variant="h3" component="h3" style={{ marginTop: '0px' }}>
            <Stack spacing={2} direction="row" alignItems="flex-end" sx={{ mt: 0 }}>
              <>{fCurrency(metric1)}&nbsp;&nbsp;</>
              {metric2 > 0 ? (
                <Typography variant="h4" style={{ color: 'green' }}>
                  +{fPercent(metric2)}
                </Typography>
              ) : (
                <Typography variant="h4" style={{ color: 'red' }}>
                  {fPercent(metric2)}
                </Typography>
              )}
            </Stack>
          </Typography>
          <Typography variant="caption" style={{ marginTop: '0px', color: 'grey' }}>
            As of 09:00AM SGT.
          </Typography>
        </Stack>
        {/* </Stack> */}
      </Container>
    </RootStyle>
  );
}
