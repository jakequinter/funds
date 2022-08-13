import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Plus } from 'iconoir-react';

import { Expense } from '@/types/expense';
import ExpenseModal from '@/components/dashboard/modals/ExpenseModal/ExpenseModal';
import DashboardShell from '@/components/dashboard/shared/DashboardShell/DashboardShell';
import EmptyState from '@/components/dashboard/index/EmptyState';
import ExpensesTable from '@/components/dashboard/index/ExpensesTable';
import LoadingState from '@/components/dashboard/shared/LoadingState';
import Stats from '@/components/dashboard/index/Stats';
import useAuth from '@/hooks/useAuth';
import useInstance from '@/hooks/useInstance';

const Dashboard: NextPage = () => {
  const { user } = useAuth();
  const { instance, categories, loading } = useInstance();
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [expense, setExpense] = useState<Expense | null>(null);

  if (loading) {
    return (
      <DashboardShell>
        <Head>
          <title>Dashboard</title>
        </Head>
        <LoadingState label="Gathering your budget" />
      </DashboardShell>
    );
  }

  if (!instance || categories?.length === 0) {
    return (
      <DashboardShell>
        <Head>
          <title>Dashboard</title>
        </Head>
        <EmptyState hasInstance={instance != null} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Head>
        <title>Dashboard</title>
      </Head>
      <ExpenseModal
        expense={expense}
        setExpense={setExpense}
        open={expenseModalOpen}
        setOpen={setExpenseModalOpen}
      />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">
          Welcome, {user?.displayName}!
        </h1>
        {categories && categories.length > 0 ? (
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-medium shadow hover:border-slate-400 focus:outline-none focus:ring-0"
            onClick={() => setExpenseModalOpen(true)}
          >
            <Plus className="mr-2" /> Add expense
          </button>
        ) : null}
      </div>

      <Stats />
      <ExpensesTable
        showExpenseDropdown
        setSelectedExpense={setExpense}
        setShowExpenseModal={setExpenseModalOpen}
      />
    </DashboardShell>
  );
};

export default Dashboard;

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
