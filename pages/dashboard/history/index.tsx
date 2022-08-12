import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';

import DashboardShell from '@/components/dashboard/shared/DashboardShell/DashboardShell';
import HistoryList from '@/components/dashboard/history/HistoryList';

const History: NextPage = () => {
  return (
    <DashboardShell>
      <Head>
        <title>History</title>
      </Head>
      <h1 className="text-2xl font-semibold text-slate-900">History</h1>
      <HistoryList />
    </DashboardShell>
  );
};

export default History;

export const getServerSideProps: GetServerSideProps = async context => {
  if (!context.req.cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
