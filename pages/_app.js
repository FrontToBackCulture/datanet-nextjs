// scroll bar
import 'simplebar/src/simplebar.css'

// lightbox
import 'react-image-lightbox/style.css'

// slick-carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './styles.css'

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

// ----------------------------------------------------------------------

import PropTypes from 'prop-types'
// next
import Head from 'next/head'
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
// contexts
import { SettingsProvider } from '../src/contexts/SettingsContext'
// theme
import ThemeProvider from '../src/theme'
// components
// import Settings from '../src/components/settings';
import ProgressBar from '../src/components/ProgressBar'
import ThemeColorPresets from '../src/components/ThemeColorPresets'
import MotionLazyContainer from '../src/components/animate/MotionLazyContainer'

import { UserProvider } from '@auth0/nextjs-auth0'

import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import { LicenseManager } from 'ag-grid-enterprise'
import Layout from '../src/layouts'

LicenseManager.setLicenseKey(
  'CompanyName=Front To Back Culture,LicensedApplication=VAL,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-019429,ExpiryDate=16_November_2022_[v2]_MTY2ODU1NjgwMDAwMA==7bf705096e0805bcfac9a7a0023aa92e'
)
// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}

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
        <SettingsProvider>
          <UserProvider>
            <ThemeProvider>
              <ThemeColorPresets>
                <MotionLazyContainer>
                  {/* <Settings /> */}
                  <ProgressBar />
                  <Component {...pageProps} />
                </MotionLazyContainer>
              </ThemeColorPresets>
            </ThemeProvider>
          </UserProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </>
  )
}
