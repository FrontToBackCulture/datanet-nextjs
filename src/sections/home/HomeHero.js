// react
import React, { useState, useEffect, useRef } from 'react'
// @mui
import { styled } from '@mui/material/styles'
import { Stack, Container, Typography, Grid } from '@mui/material'
// hooks
import { useBoundingClientRect } from '../../hooks'
// components
import Image from 'next/image'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    height: '30vh',
  },
}))

// ----------------------------------------------------------------------

export default function HomeHero({ userDomain }) {
  const containerRef = useRef(null)
  const container = useBoundingClientRect(containerRef)
  const [domain, setDomain] = useState()

  const offsetLeft = container?.left

  useEffect(() => {
    if (userDomain) {
      const toTitleCase = (str) =>
        str.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())
      // setDomain(toTitleCase(userDomain));
      setDomain(userDomain)
    }
  }, [userDomain])

  return (
    <RootStyle>
      <Container>
        <Grid container columnSpacing={3} alignItems="center" sx={{ height: 1 }}>
          <Grid item xs={12} md={12}>
            <Stack
              spacing={5}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              justifyContent="center"
              sx={{
                py: 15,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              {domain && (
                <div
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src="https://s3.ap-southeast-1.amazonaws.com/production.thinkval.static/logos/saladstopMain.png"
                    width={399}
                    height={80}
                  />
                </div>
              )}
              {!domain && (
                <Image src="https://www.thinkval.com/logos/val.png" width={143} height={53} />
              )}
              Datanet is built on top of VAL, a powerful no-code data warehouse that provides a
              single source of truth across systems you used.
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  )
}
