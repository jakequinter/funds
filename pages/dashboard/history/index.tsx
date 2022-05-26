import type { NextPage } from 'next';
import Head from 'next/head';

import DashboardShell from '@/components/dashboard/DashboardShell';
import HistoryList from '@/components/dashboard/history/HistoryList';

const History: NextPage = () => {
  return (
    <DashboardShell>
      <h1 className="text-2xl font-semibold text-slate-900">History</h1>
      <HistoryList />
    </DashboardShell>
  );
};

export default History;
