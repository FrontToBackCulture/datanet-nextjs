// react
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// next
import NextLink from 'next/link'
// @mui
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Stack,
  Button,
  AppBar,
  Divider,
  Container,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material'
// auth
import { useUser } from '@auth0/nextjs-auth0'
// routes
import Routes from '../../routes'
// hooks
import { useOffSetTop, useResponsive } from '../../hooks'
// config
import { HEADER_DESKTOP_HEIGHT } from '../../config'
// components
import { Logo, Label, Iconify } from '../../components'
import { IconButtonAnimate } from '../../components/animate'
// nav, header, footer
import { NavMobile, NavDesktop } from '../nav'
import { ToolbarStyle, ToolbarShadowStyle } from './HeaderToolbarStyle'
import { selectConfig, selectDomain } from '../../../src/utils/selectScript'
// icons
import contentDeliveryNetwork from '@iconify/icons-carbon/content-delivery-network'

// ----------------------------------------------------------------------

Header.propTypes = {
  transparent: PropTypes.bool,
}

export default function Header({ transparent, header2Layout }) {
  const { user, error, isLoading } = useUser()
  const [userDomain, setUserDomain] = useState()
  const [userEmailDomain, setUserEmailDomain] = useState()
  const [conf, setConf] = useState()
  const [navConfig, setNavConfig] = useState([])

  // TODO: get this dynamically
  // const selectedDomain = localStorage.getItem('selectedDomain')
  const selectedDomain = 'saladstop'
  // TODO: get this dynamically
  // const URL = window.location.href
  const URL = 'http://localhost:3002/'

  const theme = useTheme()

  const isDesktop = useResponsive('up', 'md')

  const isLight = theme.palette.mode === 'light'

  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT)

  const handleDomainChange = (event) => {
    setUserDomain(event.target.value)
    // localStorage.setItem('selectedDomain', event.target.value)
  }

  useEffect(() => {
    if (user) {
      let domain
      const regex = /@(\w+)/g
      let result = user.email.match(regex)[0]
      result = result.substring(1, result.length)
      setUserEmailDomain(result)
      if (!selectedDomain) {
        if (result != 'thinkval') {
          domain = selectDomain(result)
        } else {
          if (!userDomain) {
            domain = 'thinkval'
            setUserEmailDomain('thinkval')
          } else {
            domain = userDomain
          }
        }
      } else {
        domain = selectedDomain
      }
      setUserDomain(domain)
      header2Layout(domain)
      getConfig(domain)
    }
  }, [user, userDomain])

  const getConfig = (domain) => {
    let config2used = selectConfig(URL, domain, 'navConfig')
    setConf(config2used)
  }

  useEffect(() => {
    if (conf) {
      let configNavConfigArray = []
      conf.map((config) => {
        configNavConfigArray.push({
          title: config.title,
          path: Routes.list.jobs,
          code: config.code,
        })
      })
      setNavConfig(configNavConfigArray)
    }
  }, [conf])

  return (
    <AppBar position="relative" sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
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
              userDomain={userDomain}
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
            {user && userEmailDomain != 'thinkval' && (
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
            {user && userEmailDomain == 'thinkval' && (
              <>
                <NextLink
                  href={{
                    pathname: Routes.admin,
                  }}
                >
                  <IconButtonAnimate
                    color="inherit"
                    sx={{
                      ...(isScrolling && { color: 'text.primary' }),
                    }}
                  >
                    <Iconify icon={contentDeliveryNetwork} sx={{ width: 20, height: 20 }} />
                  </IconButtonAnimate>
                </NextLink>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Domain</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userDomain}
                      label="Domain"
                      onChange={handleDomainChange}
                    >
                      <MenuItem value="demo">Demo</MenuItem>
                      <MenuItem value="thinkval">ThinkVAL</MenuItem>
                      <MenuItem value="saladstop">Salad Stop!</MenuItem>
                      <MenuItem value="kctsoya">KCT Soya</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                &nbsp;&nbsp;
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
  )
}
