import React from 'react'
import { Stack, Container, Typography } from '@mui/material'
import Image from 'next/image'

export default function HomeHero({ userDomain }) {
  return (
    <Container>
      <Stack spacing={5} alignItems={{ xs: 'center', md: 'flex-start' }} sx={{ py: 15 }}>
        {userDomain ? (
          <Image
            src="https://s3.ap-southeast-1.amazonaws.com/production.thinkval.static/logos/saladstopMain.png"
            width={399}
            height={80}
            alt="logo_saladstop"
          />
        ) : (
          <Image
            src="https://www.thinkval.com/logos/val.png"
            width={143}
            height={53}
            alt="logo_thinkval"
          />
        )}
        <Typography>
          Datanet is built on top of VAL, a powerful no-code data warehouse that provides a single
          source of truth across systems you used.
        </Typography>
      </Stack>
    </Container>
  )
}
