import { Box } from '@mui/material'
import Head from 'next/head'
import { forwardRef } from 'react'

const Page = forwardRef(({ children, meta, title, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | VAL DATANET`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
))

export default Page
