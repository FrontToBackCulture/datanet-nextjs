import React, { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { alpha } from '@mui/material/styles'
import { Box, List, Link, Drawer, ListItemText, ListItemButton, Stack } from '@mui/material'
import menuIcon from '@iconify/icons-carbon/menu'
import { DomainContext, ROOT_DOMAIN, useUserDomain } from 'src/contexts/DomainProvider'
import { useUser } from '@auth0/nextjs-auth0'
import { DRAWER_WIDTH } from '../../config'
import { Logo, Iconify } from '../../components'
import { IconButtonAnimate } from '../../components/animate'
import { DomainSelector } from '../header/DomainSelector'

export default function NavMobile({ navConfig }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { asPath } = useRouter()
  const { user } = useUser()

  const userDomain = useUserDomain()
  const selectedDomain = useContext(DomainContext)

  return (
    <>
      <IconButtonAnimate color="inherit" onClick={() => setDrawerOpen(true)}>
        <Iconify icon={menuIcon} />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: DRAWER_WIDTH, justifyContent: 'space-between', py: 2 },
        }}
      >
        <Stack spacing={2}>
          <Box alignSelf="center">
            <Logo />
          </Box>

          <Box px={2}>
            <DomainSelector />
          </Box>

          <List disablePadding>
            {navConfig.map((link) => (
              <NavItem
                key={link.code}
                href={link.path}
                label={link.title}
                onClick={() => setDrawerOpen(false)}
                active={asPath.includes(link.code)}
              />
            ))}
          </List>
        </Stack>

        <List disablePadding sx={{ justifySelf: 'flex-end' }}>
          {userDomain === ROOT_DOMAIN && (
            <NavItem
              href={`/admin/${selectedDomain}`}
              label="Settings"
              onClick={() => setDrawerOpen(false)}
            />
          )}
          <NavItem
            href={`/api/auth/${user ? 'logout' : 'login'}`}
            label={user ? 'Logout' : 'Login'}
            onClick={() => setDrawerOpen(false)}
          />
        </List>
      </Drawer>
    </>
  )
}

function NavItem({ href, label, onClick, active }) {
  if (label === 'Documentation') {
    return (
      <Link href={href} onClick={onClick} underline="none" target="_blank" rel="noopener">
        <StyledListItem>
          <ListItemText primary={label} />
        </StyledListItem>
      </Link>
    )
  }

  return (
    <NextLink href={href} passHref>
      <StyledListItem active={active} onClick={onClick}>
        <ListItemText primary={label} />
      </StyledListItem>
    </NextLink>
  )
}

const StyledListItem = ({ active, ...props }) => (
  <ListItemButton
    {...props}
    sx={{
      color: (theme) => theme.palette.text.secondary,
      ...(active && {
        color: (theme) => theme.palette.primary.main,
        fontWeight: 'bold',
        backgroundColor: (theme) =>
          alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      }),
    }}
  />
)
