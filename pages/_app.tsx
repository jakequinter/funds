import type { AppProps } from 'next/app';
import { useMemo, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

import { Instance } from '@/types/instance';
import { InstanceContextProvider } from '@/hooks/InstanceContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <InstanceContextProvider>
        <Component {...pageProps} />
      </InstanceContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
