import { Stack, Typography } from '@mui/material'
import React from 'react'
import { Logo } from '../../components'

export default function FooterSimple() {
  return (
    <Stack direction="row" justifyContent="center" py={{ xs: 2, md: 4 }}>
      <Logo isSimple />
      <Typography color="text.secondary">© 2022. All rights reserved</Typography>
    </Stack>
  )
}
