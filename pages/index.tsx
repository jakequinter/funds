import type { NextPage } from 'next';
import Head from 'next/head';

import Container from '@/components/Container';

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>funds</title>
      </Head>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-800">
            Available for iOS16 and web!
          </span>

          <h1 className="mt-8 text-5xl font-semibold text-slate-900">
            Budget anywhere, instantly.
          </h1>

          <div className="mt-8 flex space-x-8">
            <button
              type="button"
              className="inline-flex items-center rounded-full bg-emerald-500 px-10 py-4 font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-0"
            >
              Sign in
            </button>

            <button
              type="button"
              className="inline-flex items-center rounded-full bg-slate-200 px-10 py-4 font-medium text-slate-900 hover:bg-slate-300 focus:outline-none focus:ring-0"
            >
              How it works
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
