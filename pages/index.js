// _data
// import { _pricingHome } from '../_data/mock';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections

import { HomeHero } from '../src/sections/home';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="The starting point for your next project">
      <HomeHero />
    </Page>
  );
}

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout simpleFooter>{page}</Layout>;
};
