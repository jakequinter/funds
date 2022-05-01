import type { NextPage } from 'next';
import Head from 'next/head';

import DashboardShell from '@/components/dashboard/DashboardShell';

const Home: NextPage = () => {
  return (
    <DashboardShell>
      <h1 className="text-2xl font-semibold text-slate-900">Welcome, Jake!</h1>
    </DashboardShell>
  );
};

export default Home;
