import { useRef } from 'react';
// icons
import launchIcon from '@iconify/icons-carbon/launch';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Button, Container, Typography, Grid } from '@mui/material';
// hooks
import { useBoundingClientRect } from '../../hooks';
// routes
import Routes from '../../routes';
// components
import { Image, Iconify } from '../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    height: '60vh',
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const containerRef = useRef(null);
  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container?.left;

  return (
    <RootStyle>
      <Container sx={{ height: 1 }}>
        <Grid container columnSpacing={3} alignItems="center" sx={{ height: 1 }}>
          <Grid item xs={12} md={5}>
            <Stack
              spacing={5}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              justifyContent="center"
              sx={{
                py: 15,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h1">Your Datanet Powered By</Typography>
              <Image
                src={`https://www.thinkval.com/logos/val.png`}
                sx={{ width: 143, height: 53 }}
              />

              <Typography sx={{ color: 'text.secondary' }}>
                Datanet is built on top of VAL, a powerful no-code data warehouse that provides a
                single source of truth across systems you used.
              </Typography>

              {/* <Stack direction="row" spacing={2.5}>
                {['figma', 'javascript', 'typescript', 'material', 'react'].map((icon) => (
                  <Image
                    key={icon}
                    alt={icon}
                    src={`https://zone-assets-api.vercel.app/assets/icons/platform/ic_platform_${icon}.svg`}
                    sx={{ width: 32, height: 32 }}
                  />
                ))}
              </Stack> */}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Image
              alt="home-hero"
              src="https://www.thinkval.com/_next/image/?url=%2Fhome%2Fmain.png&w=3840&q=75"
            />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
