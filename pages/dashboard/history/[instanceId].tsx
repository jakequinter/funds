import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';
import { format, getDaysInMonth } from 'date-fns';
import useSWR from 'swr';

import { Category } from '@/types/category';
import { Instance } from '@/types/instance';
import DashboardShell from '@/components/dashboard/DashboardShell';
import ExpensesTable from '@/components/dashboard/index/ExpensesTable';
import fetcher from '@/lib/fetcher';
import Stats from '@/components/dashboard/index/Stats';
import LoadingState from '@/components/dashboard/shared/LoadingState';

const HistoryInstance: NextPage = () => {
  const { query } = useRouter();

  const { data, error } = useSWR<Instance>(
    `/api/instance/${query.instanceId}`,
    fetcher
  );

  const { data: categoryData, error: categoryError } = useSWR<Category[]>(
    `/api/category/${query.instanceId}`,
    fetcher
  );

  if (!data || !categoryData) {
    return (
      <DashboardShell>
        <LoadingState label="Loading your budget" />
      </DashboardShell>
    );
  }

  if (error | categoryError) return <p>Error</p>;

  return (
    <DashboardShell>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">
          {format(new Date(data.year, data.month - 1), 'PP')} —{' '}
          {format(
            new Date(
              data.year,
              data.month - 1,
              getDaysInMonth(new Date(data.year, data.month - 1))
            ),
            'PP'
          )}
        </h1>
      </div>

      <Stats categories={categoryData} />

      <ExpensesTable categories={categoryData} showExpenseDropdown={false} />
    </DashboardShell>
  );
};

export default HistoryInstance;
