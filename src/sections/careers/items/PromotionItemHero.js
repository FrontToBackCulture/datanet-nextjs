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

export default function CareerJobHero({ job }) {
  const { slug, category, views, location, deadline, favorited } = job;

  const [favorite, setFavorite] = useState(favorited);

  const handleChangeFavorite = (event) => {
    setFavorite(event.target.checked);
  };

  return (
    <RootStyle>
      <Container>
        <Breadcrumbs
          // onDark
          links={[
            { name: 'Home', href: '/' },
            { name: 'Jobs', href: Routes.promotion.jobs },
            { name: job.slug },
          ]}
        />

        <Stack
          spacing={1}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between' }}
        >
          <Stack spacing={{ xs: 3, md: 2 }} sx={{ color: 'common.black' }}>
            <Typography variant="h3" component="h1">
              {slug}
            </Typography>
            As of 05:27AM UTC. Market open.
          </Stack>
        </Stack>
      </Container>
    </RootStyle>
  );
}
