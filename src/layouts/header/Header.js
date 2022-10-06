import React, { useContext } from 'react'
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
import { selectConfig } from '../../utils/selectScript'
import contentDeliveryNetwork from '@iconify/icons-carbon/content-delivery-network'
import { DomainContext, ROOT_DOMAIN, useUserDomain } from '../../contexts/DomainProvider'
import { useRouter } from 'next/router'
import Typography from '../../theme/overrides/Typography'

export default function Header() {
  const { user } = useUser()

  const selectedDomain = useContext(DomainContext)

  const userDomain = useUserDomain()

  const navConf = selectConfig(selectedDomain)?.getConfig('navConfig') ?? []

  const navConfig = navConf.map(({ title, code }) => ({
    title,
    path: Routes.list.domainCode(selectedDomain, code),
    code,
  }))

  const isDesktop = useResponsive('up', 'md')

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
            {userDomain === ROOT_DOMAIN && (
              <NextLink href={{ pathname: Routes.admin }} passHref>
                <IconButtonAnimate color="inherit">
                  <Iconify icon={contentDeliveryNetwork} sx={{ width: 20, height: 20 }} />
                </IconButtonAnimate>
              </NextLink>
            )}

            {user && <DomainSelector />}

            {user ? (
              <NextLink href="/api/auth/logout" prefetch={false} passHref>
                <Button color="inherit" variant="outlined">
                  Logout
                </Button>
              </NextLink>
            ) : (
              <NextLink href="/api/auth/login" prefetch={false} passHref>
                <Button color="inherit" variant="outlined">
                  Login
                </Button>
              </NextLink>
            )}
          </Stack>

          {!isDesktop && user && (
            <NavMobile navConfig={navConfig} sx={{ ml: 1 }} userDomain={selectedDomain} />
          )}
        </Container>
      </ToolbarStyle>
    </AppBar>
  )
}

const DomainSelector = () => {
  const userDomain = useUserDomain()
  const selectedDomain = useContext(DomainContext)

  const router = useRouter()

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        {userDomain === ROOT_DOMAIN ? (
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Domain</InputLabel>
            <Select
              label="Domain"
              value={selectedDomain}
              onChange={(e) => router.push(`/${e.target.value}`)}
            >
              <MenuItem value="demo">Demo</MenuItem>
              <MenuItem value="thinkval">ThinkVAL</MenuItem>
              <MenuItem value="saladstop">Salad Stop!</MenuItem>
              <MenuItem value="kctsoya">KCT Soya</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <Typography>{userDomain}</Typography>
        )}
      </Box>
      <Divider orientation="vertical" sx={{ height: 24 }} />
    </>
  )
}
