import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Link, Stack } from '@mui/material'

export default function NavDesktop({ navConfig }) {
  return (
    <Stack direction="row" spacing={6} sx={{ ml: 6, color: 'text.secondary' }}>
      {navConfig.map((link) => (
        <NavItemDesktop key={link.title} item={link} />
      ))}
    </Stack>
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
    <NextLink key={title} href={path} passHref>
      <StyledListItem active={isActiveRoot}>
        <div>{title}</div>
      </StyledListItem>
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
