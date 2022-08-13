import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  AppleLogo,
  GlobeHemisphereWest,
  Browsers,
  CaretRight,
  GlobeHemisphereEast,
} from 'phosphor-react';
import { motion } from 'framer-motion';

import Container from '@/components/Container';
import VideoPlayer from '@/components/VideoPlayer';

const iconVariants = {
  hover: {
    x: 2,
  },
};

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Head>
        <title>funds</title>
      </Head>
      <div className="space-y-24 lg:space-y-48">
        <div className="grid grid-cols-1 gap-4 text-center lg:max-w-none lg:grid-cols-2 lg:text-left">
          <div className="mx-auto max-w-lg">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-800">
              Available for iOS16 and web!
            </span>

            <h1 className="line mt-8 text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl">
              Craft your budget like a professional.
            </h1>

            <div className="mt-8 mb-16 flex justify-center space-x-8 lg:mb-0 lg:justify-start">
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

        <div className="space-y-8 rounded-3xl bg-slate-200 p-16">
          <h3 className="text-2xl">
            Tired of complicated budget-tracking software?
          </h3>
          <h2 className="line text-5xl font-semibold leading-tight text-slate-900">
            funds provides the easiest budgeting software making it the ultimate
            budgeting tool.
          </h2>

          <div className="flex space-x-12">
            <Link href="/" passHref>
              <motion.a
                whileHover="hover"
                className="inline-flex items-center text-lg font-semibold text-emerald-500 hover:text-emerald-600"
              >
                Check all features
                <motion.span variants={iconVariants}>
                  <CaretRight className="ml-1" />
                </motion.span>
              </motion.a>
            </Link>
            <Link href="/" passHref>
              <motion.a
                whileHover="hover"
                className="inline-flex items-center text-lg font-semibold text-emerald-500 hover:text-emerald-600"
              >
                See inspiration
                <motion.span variants={iconVariants}>
                  <CaretRight className="ml-1" />
                </motion.span>
              </motion.a>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-10">
          <div>
            <h2 className="mb-4 text-3xl font-semibold text-slate-900">
              On the go
            </h2>
            <p className="text-lg">
              Our web and iOS apps make instantly adding your expenses seamless.
              Wherever you are, whatever you&apos;re buying, track it in a
              matter of seconds.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-slate-200 p-2">
                  <Browsers className="text-slate-900" size="20" />
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  Budget on any browser
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-slate-200 p-2">
                  <AppleLogo className="text-slate-900" size="20" />
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  Budget on iOS
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-slate-200 p-2">
                  <GlobeHemisphereEast className="text-slate-900" size="20" />
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  Budget...anywhere
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg shadow">
            <img src="/images/expensesTable2.png" alt="Expenses table" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
