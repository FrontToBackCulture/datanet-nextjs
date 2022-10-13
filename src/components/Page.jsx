import { Container, Stack } from '@mui/material'
import React from 'react'
import { Footer, FooterSimple } from '../layouts/footer'

const Page = ({ children, complexFooter = false }) => (
  <Container maxWidth="xl" sx={{ flexGrow: 1, position: 'relative' }}>
    <Stack spacing={{ xs: 1, md: 3 }} height={1}>
      {children}
      {complexFooter ? <Footer /> : <FooterSimple />}
    </Stack>
  </Container>
)

export default Page
