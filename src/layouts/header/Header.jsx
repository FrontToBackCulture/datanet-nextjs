import React, { useContext } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Stack,
  Button,
  AppBar,
  Divider,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from '@mui/material'
import { useUser } from '@auth0/nextjs-auth0'
import contentDeliveryNetwork from '@iconify/icons-carbon/content-delivery-network'
import { useRouter } from 'next/router'
import Routes from '../../routes'
import { useResponsive } from '../../hooks'
import { Logo, Label, Iconify } from '../../components'
import { IconButtonAnimate } from '../../components/animate'
import { NavMobile, NavDesktop } from '../nav'
import { ToolbarStyle } from './HeaderToolbarStyle'
import { selectConfig } from '../../utils/selectScript'
import { DomainContext, ROOT_DOMAIN, useUserDomain } from '../../contexts/DomainProvider'

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
    <AppBar position="relative" sx={{ boxShadow: 0, bgcolor: 'transparent', px: 4 }}>
      <ToolbarStyle disableGutters>
        <Stack direction="row" justifyContent="space-between" flexGrow={1}>
          <Stack direction="row" spacing={2}>
            {!isDesktop && user && <NavMobile navConfig={navConfig} userDomain={selectedDomain} />}

            <Box sx={{ lineHeight: 0, position: 'relative', py: 2 }}>
              <Logo onDark />

              <Label
                color="info"
                sx={{
                  px: 0.5,
                  top: 5,
                  left: 64,
                  height: 20,
                  fontSize: 11,
                  position: 'absolute',
                }}
              >
                DataNet Beta
              </Label>
            </Box>
          </Stack>

          {isDesktop && user && <NavDesktop navConfig={navConfig} />}

          <Stack spacing={2} direction="row" alignItems="center">
            {user && <DomainSelector />}

            {userDomain === ROOT_DOMAIN && (
              <NextLink href={`/admin/${selectedDomain}`} passHref>
                <IconButtonAnimate color="inherit">
                  <Iconify icon={contentDeliveryNetwork} sx={{ width: 20, height: 20 }} />
                </IconButtonAnimate>
              </NextLink>
            )}

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
        </Stack>
      </ToolbarStyle>
    </AppBar>
  )
}

function DomainSelector() {
  const userDomain = useUserDomain()
  const selectedDomain = useContext(DomainContext)

  const router = useRouter()

  return (
    <>
      <Box>
        {userDomain === ROOT_DOMAIN ? (
          <FormControl fullWidth size="small">
            <InputLabel>Domain</InputLabel>
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
      <Divider orientation="vertical" sx={{ height: 1 }} />
    </>
  )
}
