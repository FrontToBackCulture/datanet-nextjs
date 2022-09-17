// react
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Divider, Container } from '@mui/material';
// auth
import { useUser } from '@auth0/nextjs-auth0';
// routes
import Routes from '../../routes';
// hooks
import { useOffSetTop, useResponsive } from '../../hooks';
// config
import { HEADER_DESKTOP_HEIGHT } from '../../config';
// components
import { Logo, Label } from '../../components';
// nav, header, footer
import { NavMobile, NavDesktop } from '../nav';
import { ToolbarStyle, ToolbarShadowStyle } from './HeaderToolbarStyle';
// data
import confFn from '../../../config/development';
import confFnProd from '../../../config/production';
import confFnProdTest from '../../../config/productionTest';

// ----------------------------------------------------------------------

Header.propTypes = {
  transparent: PropTypes.bool,
};

export default function Header({ transparent }) {
  const { user, error, isLoading } = useUser();
  const [userDomain, setUserDomain] = useState();
  const [conf, setConf] = useState();
  const [navConfig, setNavConfig] = useState([]);

  const URL = window.location.href;

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isLight = theme.palette.mode === 'light';

  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT);

  useEffect(() => {
    if (user) {
      const regex = /@(\w+)/g;
      let result = user.email.match(regex)[0];
      result = result.substring(1, result.length);
      let domain;
      switch (result) {
        case 'saladstop':
          setUserDomain('saladstop');
          domain = 'saladstop';
          break;
        case 'thinkval':
          setUserDomain('saladstop');
          domain = 'saladstop';
          break;
        default:
          break;
      }
      getConfig(domain);
    }
  }, [user]);

  const getConfig = (domain) => {
    console.log(URL, domain, confFn[domain]);
    if (URL.includes('localhost') && domain) {
      let config = confFn[domain].conf.getConfig('navConfig');
      setConf(config);
    }
    if (URL.includes('screener.thinkval.io') && domain) {
      let config = confFnProd[domain].conf.getConfig('navConfig');
      setConf(config);
    }
    if (URL.includes('screenertest.thinkval.io') && domain) {
      let config = confFnProdTest[domain].conf.getConfig('navConfig');
      setConf(config);
    }
  };

  useEffect(() => {
    if (conf) {
      let configNavConfigArray = [];
      conf.map((config) => {
        configNavConfigArray.push({
          title: config.title,
          path: Routes.list.jobs,
          code: config.code,
        });
      });
      console.log('configArray', configNavConfigArray);
      setNavConfig(configNavConfigArray);
    }
  }, [conf]);

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle disableGutters transparent={transparent} scrolling={isScrolling}>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo onDark={transparent && !isScrolling} />

            <Label
              color="info"
              sx={{
                ml: 0.5,
                px: 0.5,
                top: -14,
                left: 64,
                height: 20,
                fontSize: 11,
                position: 'absolute',
              }}
            >
              DataNet Beta
            </Label>
          </Box>

          {isDesktop && user && (
            <NavDesktop
              isScrolling={isScrolling}
              isTransparent={transparent}
              navConfig={navConfig}
            />
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Stack spacing={2} direction="row" alignItems="center">
            {!user && (
              <NextLink href="/api/auth/login" prefetch={false} passHref>
                <Button
                  color="inherit"
                  variant="outlined"
                  sx={{
                    ...(transparent && {
                      color: 'common.white',
                    }),
                    ...(isScrolling && isLight && { color: 'text.primary' }),
                  }}
                >
                  Login
                </Button>
              </NextLink>
            )}
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            {user && (
              <>
                {userDomain} &nbsp;&nbsp;
                <Divider orientation="vertical" sx={{ height: 24 }} />
                <NextLink href="/api/auth/logout" prefetch={false} passHref>
                  <Button
                    color="inherit"
                    variant="outlined"
                    sx={{
                      ...(transparent && {
                        color: 'common.white',
                      }),
                      ...(isScrolling && isLight && { color: 'text.primary' }),
                    }}
                  >
                    Logout
                  </Button>
                </NextLink>
              </>
            )}
          </Stack>

          {/* <Stack spacing={2} direction="row" alignItems="center">
            <Searchbar
              sx={{
                ...(isScrolling && { color: 'text.primary' }),
              }}
            />

            <Divider orientation="vertical" sx={{ height: 24 }} />

            {isDesktop && (
              <Stack direction="row" spacing={1}>
                <NextLink href={Routes.registerIllustration} prefetch={false} passHref>
                  <Button
                    color="inherit"
                    variant="outlined"
                    sx={{
                      ...(transparent && {
                        color: 'common.white',
                      }),
                      ...(isScrolling && isLight && { color: 'text.primary' }),
                    }}
                  >
                    Join Us
                  </Button>
                </NextLink>

                <Button variant="contained" href={Routes.buyNow} target="_blank" rel="noopener">
                  Buy Now
                </Button>
              </Stack>
            )}
          </Stack> */}

          {!isDesktop && user && (
            <NavMobile
              navConfig={navConfig}
              sx={{
                ml: 1,
                ...(isScrolling && { color: 'text.primary' }),
              }}
              userDomain={userDomain}
            />
          )}
        </Container>
      </ToolbarStyle>

      {isScrolling && <ToolbarShadowStyle />}
    </AppBar>
  );
}
