// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './styles.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';
// next
import Head from 'next/head';
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// contexts
import { SettingsProvider } from '../src/contexts/SettingsContext';
// theme
import ThemeProvider from '../src/theme';
// components
// import Settings from '../src/components/settings';
import RtlLayout from '../src/components/RtlLayout';
import ProgressBar from '../src/components/ProgressBar';
import ThemeColorPresets from '../src/components/ThemeColorPresets';
import MotionLazyContainer from '../src/components/animate/MotionLazyContainer';

import { UserProvider } from '@auth0/nextjs-auth0';

import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps } = props;

  console.log('GTAG:', gtag.GA_TRACKING_ID);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
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
                  <RtlLayout>
                    {/* <Settings /> */}
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </RtlLayout>
                </MotionLazyContainer>
              </ThemeColorPresets>
            </ThemeProvider>
          </UserProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </>
  );
}
