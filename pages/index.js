// _data
// import { _pricingHome } from '../_data/mock';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections

import {
  HomeHero,
  // HomeFAQs,
  HomeNewStart,
  // HomeDemoPages,
  HomeForDesigner,
  HomeCombination,
  HomeAdvertisement,
  HomeFeatureHighlights,
  HomeFlexibleComponents,
} from '../src/sections/home';

// ----------------------------------------------------------------------

export default function HomePage() {
  // console.log('MINIAPP_VALHOST: ', process.env.MINIAPP_VALHOST);
  // console.log('MINIAPP_HOST: ', process.env.MINIAPP_HOST);
  // console.log('MINIAPP_API: ', process.env.MINIAPP_API);
  return (
    <Page title="The starting point for your next project">
      <HomeHero />

      {/* <HomeNewStart />

      <HomeFlexibleComponents />

      <HomeFeatureHighlights />

      <HomeForDesigner />

      <HomeCombination />

      <HomeAdvertisement /> */}
    </Page>
  );
}

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout simpleFooter>{page}</Layout>;
};
