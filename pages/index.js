// react
import React, { useState, useEffect } from 'react';
// auth
import { useUser } from '@auth0/nextjs-auth0';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections
import { HomeHero } from '../src/sections/home';

// ----------------------------------------------------------------------

export default function HomePage() {
  const { user, error, isLoading } = useUser();
  const [userDomain, setUserDomain] = useState();

  useEffect(() => {
    if (user) {
      const regex = /@(\w+)/g;
      let result = user.email.match(regex)[0];
      result = result.substring(1, result.length);
      switch (result) {
        case 'saladstop':
          setUserDomain('saladstop');
          break;
        case 'thinkval':
          setUserDomain('thinkval');
          break;
        case 'kctsoya':
          setUserDomain('kctsoya');
          break;
        default:
          break;
      }
    }
  }, [user]);

  return (
    <Page title="The starting point for your next project">
      <HomeHero userDomain={userDomain} />
    </Page>
  );
}

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout simpleFooter>{page}</Layout>;
};
