import Head from 'next/head';
import type { AppProps } from 'next/app';

import { AuthProvider } from 'src/context/AuthContext';
import { CategoriesProvider } from 'src/context/CategoriesContext';
import { ExpensesProvider } from 'src/context/ExpensesContext';
import { InstanceContextProvider } from 'src/context/InstanceContext';
import { ToastContextProvider } from 'src/context/ToastContext';
import { MySwrConfig } from '@/lib/SWRConfig';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
      </Head>
      <AuthProvider>
        <ToastContextProvider>
          <MySwrConfig>
            <InstanceContextProvider>
              <CategoriesProvider>
                <ExpensesProvider>
                  <Component {...pageProps} />
                </ExpensesProvider>
              </CategoriesProvider>
            </InstanceContextProvider>
          </MySwrConfig>
        </ToastContextProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
