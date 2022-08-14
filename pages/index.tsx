import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { CaretRight } from 'phosphor-react';
import { motion } from 'framer-motion';

import { onTheGo, trackWhatYouWant, viewYourHistory } from '@/data/infoIcons';
import Container from '@/components/Container';
import InfoSection from '@/components/InfoSection';
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
          <h3 className="text-lg md:text-2xl">
            Tired of complicated budget-tracking software?
          </h3>
          <h2 className="line text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
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
        <InfoSection
          order="first"
          heading="Track what you want"
          description="Want to track groceries? Don't want to track groceries? It's totally up to you. Create the budget you want and track it with funds."
          imageSrc="/images/categories.png"
          imageAlt="Categories displaying groceries, restaurants, miscellaneous, and recurring."
          imageWidth="970"
          imageHeight="778"
          // @ts-ignore
          items={trackWhatYouWant}
        />
        <InfoSection
          order="second"
          heading="On the go"
          description="Our web and iOS apps make instantly adding your expenses seamless. Wherever you are, whatever you're buying, track it in a matter of seconds."
          imageSrc="/images/iPhoneMac.png"
          imageAlt="funds application on an iPhone overlayed on a Mac."
          imageWidth="648"
          imageHeight="435"
          // @ts-ignore
          items={onTheGo}
        />
        <InfoSection
          order="first"
          heading="View your history"
          description="Need to revisit your past expenses? Maybe you want to calculate your yearly spending or see how many months you were over budget? We got you covered."
          imageSrc="/images/history.png"
          imageAlt="Categories displaying groceries, restaurants, miscellaneous, and recurring."
          imageWidth="984"
          imageHeight="822"
          // @ts-ignore
          items={viewYourHistory}
        />
      </div>
    </Container>
  );
};

export default Home;
