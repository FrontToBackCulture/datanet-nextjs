// import { Stack } from '@mui/material'
// import Head from 'next/head'
// import { forwardRef } from 'react'

// const Page = forwardRef(({ children, meta, title, ...other }, ref) => (
//   <>
//     <Head>
//       <title>{`${title} | VAL DATANET`}</title>
//       {meta}
//     </Head>

//     <Stack ref={ref} {...other} height={1}>
//       {children}
//     </Stack>
//   </>
// ))
import { Box, Stack } from '@mui/material'
import { Footer, FooterSimple } from '../layouts/footer'

const Page = ({ children, simpleFooter = false }) => (
  <>
    <Stack flexGrow={1}>{children}</Stack>
    {simpleFooter ? <FooterSimple /> : <Footer />}
  </>
)

export default Page
