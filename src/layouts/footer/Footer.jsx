import React from 'react'
import { Link, Stack, Divider, Container, Typography } from '@mui/material'
import { Logo } from '../../components'

export default function Footer() {
  return (
    <>
      <Divider />

      <Container>
        <Stack alignItems="flex-start" spacing={3} py={8}>
          <Logo />
          <Typography color="text.secondary">
            The starting point for your data journey based on no-code aggregation of data across
            systems.
          </Typography>
        </Stack>
      </Container>

      <Divider />

      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2.5}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography color="text.secondary">© 2022. All rights reserved</Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Link color="text.secondary" href="/">
              Help Center
            </Link>
            <Link color="text.secondary" href="/">
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
