import { Stack } from '@mui/material'
import React from 'react'
import { Footer, FooterSimple } from '../layouts/footer'

const Page = ({ children, complexFooter = false }) => (
  <>
    <Stack flexGrow={1}>{children}</Stack>
    {complexFooter ? <Footer /> : <FooterSimple />}
  </>
)

export default Page
