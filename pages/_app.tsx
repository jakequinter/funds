import type { AppProps } from 'next/app';
import { useMemo, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

import { Instance } from '@/types/instance';
import { InstanceContextProvider } from '@/hooks/InstanceContext';
import '../styles/globals.css';

import { MySwrConfig } from '@/lib/SWRConfig';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MySwrConfig>
        <InstanceContextProvider>
          <Component {...pageProps} />
        </InstanceContextProvider>
      </MySwrConfig>
    </SessionProvider>
  );
}

export default MyApp;
