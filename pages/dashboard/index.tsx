import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Plus } from 'iconoir-react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import { Instance } from '@/types/instance';
import { InstanceContext } from '@/hooks/InstanceContext';
import AddExpenseModal from '@/components/dashboard/modals/AddExpenseModal';
import DashboardShell from '@/components/dashboard/DashboardShell';
import EmptyState from '@/components/dashboard/index/EmptyState';
import ExpensesTable from '@/components/dashboard/index/ExpensesTable';
import fetcher from '@/lib/fetcher';
import Stats from '@/components/dashboard/index/Stats';

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const { setInstance } = useContext(InstanceContext);
  const { data, error } = useSWR<Instance[]>('/api/instance', fetcher);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);

  useEffect(() => {
    const currentInstance = data?.find(
      instance =>
        instance.month === new Date().getMonth() &&
        instance.year === new Date().getFullYear()
    );

    setInstance(currentInstance);
  }, [data, setInstance]);

  if (!data || !data.length) {
    return (
      <DashboardShell>
        <EmptyState />
      </DashboardShell>
    );
  }

  const hasCategories = data.some(instance => instance.categories.length > 0);

  return (
    <DashboardShell>
      <AddExpenseModal open={expenseModalOpen} setOpen={setExpenseModalOpen} />
      <div className="mb-12 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">
          Welcome, {session?.user?.name?.split(' ')[0]}!
        </h1>
        {hasCategories ? (
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow hover:border-slate-400 focus:outline-none focus:ring-0"
            onClick={() => setExpenseModalOpen(true)}
          >
            <Plus className="mr-2" /> Add expense
          </button>
        ) : null}
      </div>

      <Stats />

      <ExpensesTable />
    </DashboardShell>
  );
};

export default Dashboard;
