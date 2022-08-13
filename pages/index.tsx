import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PlayOutline } from 'iconoir-react';

import Container from '@/components/Container';
import VideoPlayer from '@/components/VideoPlayer';

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Head>
        <title>funds</title>
      </Head>
      <div className="space-y-48">
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
                className="inline-flex items-center rounded-full bg-emerald-500 px-10 py-3 font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-0"
              >
                Sign in
              </button>

              <button
                type="button"
                className="inline-flex items-center rounded-full bg-slate-200 px-10 py-3 font-medium text-slate-900 hover:bg-slate-300 focus:outline-none focus:ring-0"
                onClick={() => setOpen(true)}
              >
                How it works
              </button>
            </div>
          </div>

          <VideoPlayer open={open} setOpen={setOpen} />
        </div>

        <div className="grid grid-cols-3 items-center gap-10">
          <div>
            <h2 className="mb-4 text-3xl font-semibold text-slate-900">
              Simle setup, easy to use.
            </h2>
            <p className="text-lg">
              No syncing accounts, signing in, or bank authorization. Sign in to
              funds and you’re ready to go.{' '}
            </p>
          </div>

          <div className="col-span-2 rounded-lg bg-red-500 shadow">
            <img src="/images/expensesTable.png" alt="Expenses table" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
