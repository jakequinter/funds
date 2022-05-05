import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Plus } from 'iconoir-react';
import { useSession } from 'next-auth/react';

import AddExpenseModal from '@/components/dashboard/modals/AddExpenseModal';
import DashboardShell from '@/components/dashboard/DashboardShell';

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);

  return (
    <DashboardShell>
      <AddExpenseModal open={expenseModalOpen} setOpen={setExpenseModalOpen} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">
          Welcome, {session?.user?.name?.split(' ')[0]}!
        </h1>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow hover:border-slate-400 focus:outline-none focus:ring-0"
          onClick={() => setExpenseModalOpen(true)}
        >
          <Plus className="mr-2" /> Add expense
        </button>
      </div>
    </DashboardShell>
  );
};

export default Dashboard;
