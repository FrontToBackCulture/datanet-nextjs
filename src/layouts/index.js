// react
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
// next
import dynamic from 'next/dynamic';
// nav,header,footer
const Header = dynamic(() => import('./header/Header'), { ssr: false });
const HeaderSimple = dynamic(() => import('./header/HeaderSimple'), { ssr: false });
const Footer = dynamic(() => import('./footer/Footer'), { ssr: false });
const FooterSimple = dynamic(() => import('./footer/FooterSimple'), { ssr: false });

import { DomainProvider } from '../contexts/DomainProvider';
// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node,
  disabledFooter: PropTypes.bool,
  disabledHeader: PropTypes.bool,
  simpleFooter: PropTypes.bool,
  simpleHeader: PropTypes.bool,
  transparentHeader: PropTypes.bool,
};

const DomainContext = createContext();

export default function Layout({
  children,
  transparentHeader,
  disabledHeader,
  disabledFooter,
  simpleHeader,
  simpleFooter,
}) {
  const [selectedDomain, setSelectedDomain] = useState();
  const header2Layout = (domain) => {
    setSelectedDomain(domain);
  };

  return (
    <>
      {disabledHeader ? null : (
        <>
          {simpleHeader ? (
            <HeaderSimple transparent={transparentHeader} />
          ) : (
            <Header transparent={transparentHeader} header2Layout={header2Layout} />
          )}
        </>
      )}
      <DomainProvider value={selectedDomain}>{children}</DomainProvider>

      {disabledFooter ? null : <>{simpleFooter ? <FooterSimple /> : <Footer />}</>}
    </>
  );
}

// Export useContext Hook.
export function useDomainContext() {
  return useContext(DomainContext);
}
