import React, { useContext } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Button, Divider, Link, Stack } from '@mui/material'
import { IconButtonAnimate, Iconify } from 'src/components'
import { DomainContext, ROOT_DOMAIN, useUserDomain } from 'src/contexts/DomainProvider'
import { useUser } from '@auth0/nextjs-auth0'
import contentDeliveryNetwork from '@iconify/icons-carbon/content-delivery-network'
import { DomainSelector } from '../header/DomainSelector'

export default function NavDesktop({ navConfig }) {
  const userDomain = useUserDomain()
  const selectedDomain = useContext(DomainContext)

  const { user } = useUser()

  return (
    <>
      <Stack direction="row" spacing={6} sx={{ ml: 6, color: 'text.secondary' }}>
        {navConfig.map((link) => (
          <NavItemDesktop key={link.code} item={link} />
        ))}
      </Stack>

      <Stack spacing={2} direction="row" alignItems="center">
        {user && (
          <>
            <DomainSelector />
            <Divider orientation="vertical" sx={{ height: 1 }} />
          </>
        )}

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
    </>
  )
}

function NavItemDesktop({ item }) {
  const { title, code, path } = item

  const { asPath } = useRouter()

  const isActiveRoot = path !== '/' && asPath.includes(code)

  if (title === 'Documentation') {
    return (
      <StyledListItem href={path} target="_blank" rel="noopener">
        {title}
      </StyledListItem>
    )
  }

  return (
    <NextLink href={path} passHref>
      <StyledListItem active={isActiveRoot}>{title}</StyledListItem>
    </NextLink>
  )
}

const StyledListItem = ({ active, ...props }) => (
  <Link
    {...props}
    sx={{
      fontWeight: (theme) => theme.typography.fontWeightMedium,
      display: 'flex',
      color: 'inherit',
      position: 'relative',
      alignItems: 'center',
      textDecoration: 'none',
      '&:hover': {
        opacity: 0.72,
      },
      ...(active && {
        color: (theme) => theme.palette.text.primary,
        '&:before': {
          top: 0,
          width: 6,
          height: 6,
          bottom: 0,
          left: -14,
          content: '""',
          margin: 'auto 0',
          borderRadius: '50%',
          position: 'absolute',
          backgroundColor: (theme) => theme.palette.primary.main,
        },
      }),
    }}
  />
)
