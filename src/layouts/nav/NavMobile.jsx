import React, { useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { alpha } from '@mui/material/styles'
import { Box, List, Link, Drawer, Collapse, ListItemText, ListItemButton } from '@mui/material'
import menuIcon from '@iconify/icons-carbon/menu'
import chevronRight from '@iconify/icons-carbon/chevron-right'
import chevronDown from '@iconify/icons-carbon/chevron-down'
import { DRAWER_WIDTH } from '../../config'
import { Logo, Scrollbar, Iconify, NavSection } from '../../components'
import { IconButtonAnimate } from '../../components/animate'

export default function NavMobile({ navConfig }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <IconButtonAnimate color="inherit" onClick={() => setDrawerOpen(true)}>
        <Iconify icon={menuIcon} />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: { width: DRAWER_WIDTH },
        }}
      >
        <Scrollbar>
          <Box sx={{ px: 2.5, py: 3, lineHeight: 0 }}>
            <Logo />
          </Box>

          <List sx={{ px: 0 }}>
            {navConfig.map((link) => (
              <NavItemMobile key={link.title} item={link} onClose={() => setDrawerOpen(false)} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  )
}

function NavItemMobile({ item, onClose }) {
  const { pathname, asPath } = useRouter()

  const { title, path, code, children } = item
  const rootPath = pathname.split('/')[1]
  const isActiveRoot = asPath.includes(code)
  const isActiveRootWithChild = pathname.includes(`/${rootPath}/`)

  const [open, setOpen] = useState(isActiveRootWithChild)

  const handleOpen = () => {
    setOpen(!open)
  }

  if (children) {
    return (
      <>
        <StyledListItem onClick={handleOpen} active={isActiveRootWithChild}>
          <ListItemText disableTypography primary={title} />
          <Iconify icon={open ? chevronDown : chevronRight} sx={{ width: 16, height: 16, ml: 1 }} />
        </StyledListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSection
              navConfig={children}
              sx={{
                // Root
                position: 'relative',
                '&:before': {
                  top: 0,
                  bottom: 0,
                  height: 0.96,
                  my: 'auto',
                  left: 20,
                  width: '1px',
                  content: "''",
                  bgcolor: 'divider',
                  position: 'absolute',
                },
                '& .MuiListSubheader-root': { mb: 1 },
                '& .MuiListItemButton-root': {
                  backgroundColor: 'transparent',
                  '&:before': { display: 'none' },
                },
                // Sub
                '& .MuiCollapse-root': {
                  '& .MuiList-root': {
                    '&:before': {
                      top: 0,
                      bottom: 0,
                      left: 40,
                      my: 'auto',
                      height: 0.82,
                      width: '1px',
                      content: "''",
                      bgcolor: 'divider',
                      position: 'absolute',
                    },
                  },
                  '& .MuiListItemButton-root': {
                    pl: 8,
                    '& .MuiListItemIcon-root, .MuiTouchRipple-root': {
                      display: 'none',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  },
                },
              }}
            />
          </Box>
        </Collapse>
      </>
    )
  }

  if (title === 'Documentation') {
    return (
      <Link href={path} underline="none" target="_blank" rel="noopener">
        <StyledListItem>
          <ListItemText disableTypography primary={title} />
        </StyledListItem>
      </Link>
    )
  }

  return (
    <NextLink key={title} href={path} passHref>
      <StyledListItem active={isActiveRoot} onClick={onClose}>
        <ListItemText disableTypography primary={title} />
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
