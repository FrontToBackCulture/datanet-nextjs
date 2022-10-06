import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'
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
import { useUser } from '@auth0/nextjs-auth0'
import Routes from '../../routes'
import { useResponsive } from '../../hooks'
import { Logo, Label, Iconify } from '../../components'
import { IconButtonAnimate } from '../../components/animate'
import { NavMobile, NavDesktop } from '../nav'
import { ToolbarStyle } from './HeaderToolbarStyle'
import { selectConfig, selectDomain } from '../../utils/selectScript'
import contentDeliveryNetwork from '@iconify/icons-carbon/content-delivery-network'
import { DomainContext } from '../../contexts/DomainProvider'

Header.propTypes = {
  transparent: PropTypes.bool,
}

export default function Header() {
  const { user } = useUser()
  const [userDomain, setUserDomain] = useState()
  const [userEmailDomain, setUserEmailDomain] = useState()
  const [conf, setConf] = useState()

  const selectedDomain = useContext(DomainContext)

  const navConfig = (conf ?? []).map(({ title, code }) => ({
    title,
    path: Routes.list.domainCode(selectedDomain, code),
    code,
  }))

  const isDesktop = useResponsive('up', 'md')

  const handleDomainChange = (event) => {
    setUserDomain(event.target.value)
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
      getConfig(domain)
    }
  }, [user, userDomain])

  const getConfig = (domain) => {
    let config2used = selectConfig(domain).getConfig('navConfig')
    setConf(config2used)
  }

  return (
    <AppBar position="relative" sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle disableGutters>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo onDark />

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

          {isDesktop && user && <NavDesktop navConfig={navConfig} />}

          <Box sx={{ flexGrow: 1 }} />

          <Stack spacing={2} direction="row" alignItems="center">
            {!user && (
              <NextLink href="/api/auth/login" prefetch={false} passHref>
                <Button color="inherit" variant="outlined">
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
                  <Button color="inherit" variant="outlined">
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
                  passHref
                >
                  <IconButtonAnimate color="inherit">
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
                  <Button color="inherit" variant="outlined">
                    Logout
                  </Button>
                </NextLink>
              </>
            )}
          </Stack>

          {!isDesktop && user && (
            <NavMobile navConfig={navConfig} sx={{ ml: 1 }} userDomain={userDomain} />
          )}
        </Container>
      </ToolbarStyle>
    </AppBar>
  )
}
