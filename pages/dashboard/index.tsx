import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Plus } from 'iconoir-react';

import { Expense } from '@/types/expense';
import { useAuth } from '@/hooks/useAuth';
import ExpenseModal from '@/components/dashboard/modals/ExpenseModal/ExpenseModal';
import DashboardShell from '@/components/dashboard/shared/DashboardShell/DashboardShell';
import EmptyState from '@/components/dashboard/index/EmptyState';
import ExpensesTable from '@/components/dashboard/index/ExpensesTable';
import LoadingState from '@/components/dashboard/shared/LoadingState';
import Stats from '@/components/dashboard/index/Stats';
import useCategories from '@/hooks/useCategories';
import useInstance from '@/hooks/useInstance';
import useLoading from '@/hooks/useLoading';

const Dashboard: NextPage = () => {
  const { user } = useAuth();
  const { instance } = useInstance();
  const { categories } = useCategories();
  const loading = useLoading();
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [expense, setExpense] = useState<Expense | null>(null);

  if (loading || !instance) {
    return (
      <DashboardShell>
        <LoadingState label="Gathering your budget" />
      </DashboardShell>
    );
  }

  if (!instance || categories?.length === 0) {
    return (
      <DashboardShell>
        <EmptyState hasInstance={instance != null} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
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
        {/* {hasCategories ? ( */}
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow hover:border-slate-400 focus:outline-none focus:ring-0"
          onClick={() => setExpenseModalOpen(true)}
        >
          <Plus className="mr-2" /> Add expense
        </button>
        {/* ) : null} */}
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
