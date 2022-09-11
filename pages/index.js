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
  console.info('[INFO] baseAPI', axios.defaults.baseURL);
  console.log('NODE_ENV: ', process.env.NODE_ENV);
  console.log('DEPLOY_STAGE: ', process.env.DEPLOY_STAGE);
  console.log('MINIAPP_HOST: ', process.env.MINIAPP_HOST);
  console.log('MINIAPP_API: ', process.env.MINIAPP_API);
  console.log('AUTH0_BASE_URL: ', process.env.AUTH0_BASE_URL);
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
