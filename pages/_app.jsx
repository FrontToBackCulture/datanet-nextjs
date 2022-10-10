import 'simplebar/src/simplebar.css'
import 'react-image-lightbox/style.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './styles.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'
import Head from 'next/head'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { UserProvider } from '@auth0/nextjs-auth0'
import React, { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { LicenseManager } from 'ag-grid-enterprise'
import * as gtag from '../lib/gtag'
import MotionLazyContainer from '../src/components/animate/MotionLazyContainer'
import ProgressBar from '../src/components/ProgressBar'
import ThemeProvider from '../src/theme'

LicenseManager.setLicenseKey(
  'CompanyName=Front To Back Culture,LicensedApplication=VAL,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-019429,ExpiryDate=16_November_2022_[v2]_MTY2ODU1NjgwMDAwMA==7bf705096e0805bcfac9a7a0023aa92e'
)

export default function MyApp(props) {
  const { Component, pageProps } = props

  // console.log('GTAG:', gtag.GA_TRACKING_ID);

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtm-script2"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UserProvider>
          <ThemeProvider>
            <MotionLazyContainer>
              <ProgressBar />
              <Component {...pageProps} />
            </MotionLazyContainer>
          </ThemeProvider>
        </UserProvider>
      </LocalizationProvider>
    </>
  )
}
