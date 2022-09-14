import React, { useState, useEffect } from 'react';
// auth
import { useUser } from '@auth0/nextjs-auth0';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections
import Image from 'next/image';
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
      <Image
        alt="home-hero"
        src="https://s3.ap-southeast-1.amazonaws.com/production.thinkval.static/datanet/Screener_Explain.png"
        width={1509}
        height={1800}
      />
    </Page>
  );
}

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout simpleFooter>{page}</Layout>;
};
