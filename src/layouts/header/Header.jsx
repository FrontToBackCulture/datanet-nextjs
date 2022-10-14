import React, { useContext } from 'react'
import { Box, Stack, AppBar } from '@mui/material'
import Routes from '../../routes'
import { useResponsive } from '../../hooks'
import { Logo, Label } from '../../components'
import { NavMobile, NavDesktop } from '../nav'
import { ToolbarStyle } from './HeaderToolbarStyle'
import { selectConfig } from '../../../config/selectConfig'
import { DomainContext } from '../../contexts/DomainProvider'

export default function Header() {
  const selectedDomain = useContext(DomainContext)

  const navConf = selectConfig(selectedDomain)?.navConfig ?? []

  const navConfig = navConf.map(({ title, code }) => ({
    title,
    path: Routes.list.domainCode(selectedDomain, code),
    code,
  }))

  const isDesktop = useResponsive('up', 'md')

  return (
    <AppBar position="relative" sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle>
        <Stack direction="row" justifyContent="space-between" flexGrow={1}>
          <Stack direction="row" spacing={2}>
            {!isDesktop && <NavMobile navConfig={navConfig} />}

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

          {isDesktop && <NavDesktop navConfig={navConfig} />}
        </Stack>
      </ToolbarStyle>
    </AppBar>
  )
}
