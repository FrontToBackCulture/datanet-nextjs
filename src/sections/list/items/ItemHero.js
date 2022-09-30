// react
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Box, Link, Button, Container } from '@mui/material';
// utils
import { fCurrency, fShortenNumber, fPercent, fNumber } from '../../../utils/formatNumber';

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

export default function CareerJobHero({ item, entity }) {
  // const { shortCode, name, metric1, metric1PercentChange } = job;
  const { name, latestMetric, percentChangeMetric } = item;
  // console.log(job);
  // let metric1PercentChange = 0.5;

  return (
    <RootStyle>
      <Container>
        <Stack spacing={{ xs: 3, md: 2 }} sx={{ color: 'common.black' }}>
          <Typography variant="p" component="p">
            {name}
          </Typography>
          <Typography sx={{ textAlign: 'left' }} style={{ marginTop: '0px', color: 'grey' }}>
            Data updated with yesterday transactions.
          </Typography>
          <Typography variant="h3" component="h3" style={{ marginTop: '0px' }}>
            <Stack spacing={2} direction="row" alignItems="flex-end" sx={{ mt: 0 }}>
              <>{fNumber(latestMetric)}&nbsp;&nbsp;</>
              {latestMetric > 0 ? (
                <Typography variant="h4" style={{ color: 'green' }}>
                  +{fPercent(percentChangeMetric)}
                </Typography>
              ) : (
                <Typography variant="h4" style={{ color: 'red' }}>
                  {fPercent(percentChangeMetric)}
                </Typography>
              )}
            </Stack>
          </Typography>
          <Typography style={{ marginTop: '0px', color: 'grey' }}>As of 09:00AM SGT.</Typography>
        </Stack>
        {/* </Stack> */}
      </Container>
    </RootStyle>
  );
}
