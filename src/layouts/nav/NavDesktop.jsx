import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import { Link, Stack } from '@mui/material'

const RootLinkStyle = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'open',
})(({ active, open, theme }) => {
  const dotActiveStyle = {
    '&:before': {
      top: 0,
      width: 6,
      height: 6,
      bottom: 0,
      left: -14,
      content: '""',
      display: 'block',
      margin: 'auto 0',
      borderRadius: '50%',
      position: 'absolute',
      backgroundColor: theme.palette.primary.main,
    },
  }
  return {
    ...theme.typography.subtitle2,
    fontWeight: theme.typography.fontWeightMedium,
    display: 'flex',
    color: 'inherit',
    position: 'relative',
    alignItems: 'center',
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
    }),
    textDecoration: 'none',
    '&:hover': {
      opacity: 0.72,
      textDecoration: 'none',
    },
    ...(active && {
      ...dotActiveStyle,
      color: theme.palette.text.primary,
    }),
    ...(open && {
      color: theme.palette.primary.main,
    }),
  }
})

export default function NavDesktop({ navConfig }) {
  return (
    <Stack
      direction="row"
      spacing={6}
      sx={{
        ml: 6,
        color: 'text.secondary',
      }}
    >
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
      <RootLinkStyle href={path} target="_blank" rel="noopener">
        {title}
      </RootLinkStyle>
    )
  }

  return (
    <NextLink key={title} href={{ pathname: path }} passHref>
      <RootLinkStyle active={isActiveRoot}>
        <div>{title}</div>
      </RootLinkStyle>
    </NextLink>
  )
}
