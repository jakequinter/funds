import type { AppProps } from 'next/app';
import { useMemo, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

import { Instance } from '@/types/instance';
import { InstanceContext } from '@/hooks/InstanceContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [instance, setInstance] = useState<Instance | null>(null);

  const value = useMemo(
    () => ({ instance, setInstance }),
    [instance, setInstance]
  );

  return (
    <SessionProvider session={pageProps.session}>
      <InstanceContext.Provider value={value}>
        <Component {...pageProps} />
      </InstanceContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
