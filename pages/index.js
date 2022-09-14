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
      const regex = /(?<=@)[^.]+/g;
      const result = user.email.match(regex);
      switch (result[0]) {
        case 'saladstop':
          setUserDomain('saladstop');
          break;
        case 'thinkval':
          setUserDomain('saladstop');
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
