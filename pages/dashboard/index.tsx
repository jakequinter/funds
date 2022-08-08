import { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Plus } from 'iconoir-react';
import useSWR from 'swr';

import { Category } from '@/types/category';
import { Expense } from '@/types/expense';
import { InstanceContext } from '@/hooks/InstanceContext';
import { useAuth } from '@/hooks/useAuth';
import ExpenseModal from '@/components/dashboard/modals/ExpenseModal/ExpenseModal';
import DashboardShell from '@/components/dashboard/shared/DashboardShell/DashboardShell';
import EmptyState from '@/components/dashboard/index/EmptyState';
import ExpensesTable from '@/components/dashboard/index/ExpensesTable';
import fetcher from '@/lib/fetcher';
import LoadingState from '@/components/dashboard/shared/LoadingState';
import Stats from '@/components/dashboard/index/Stats';

const Dashboard: NextPage = () => {
  const { user } = useAuth();
  const { instance } = useContext(InstanceContext);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [expense, setExpense] = useState<Expense | null>(null);

  const { data, error } = useSWR<Category[]>(
    `/api/categories/${instance?.id}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <DashboardShell>
        <LoadingState label="Gathering your budget" />
      </DashboardShell>
    );

  const hasCategories = data.length > 0;

  if (!instance /*|| !hasCategories*/) {
    return (
      <DashboardShell>
        <EmptyState hasInstance={instance != null} />
      </DashboardShell>
    );
  }

  const handleCategories = () => {
    if (!data) return [];

    return data.map(category => category.id + '/');
  };

  return (
    <DashboardShell>
      <ExpenseModal
        expense={expense}
        setExpense={setExpense}
        open={expenseModalOpen}
        setOpen={setExpenseModalOpen}
        categories={data}
        categoryIds={handleCategories()}
      />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">
          Welcome, {user?.displayName}!
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

      <Stats categories={data} />
      <ExpensesTable
        categoryIds={handleCategories()}
        showExpenseDropdown
        setSelectedExpense={setExpense}
        setShowExpenseModal={setExpenseModalOpen}
      />
    </DashboardShell>
  );
};

export default Dashboard;
