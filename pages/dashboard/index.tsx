import { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { DocumentData } from 'firebase/firestore';
import { Plus } from 'iconoir-react';
import useSWR from 'swr';

import { getTokenCookie } from '@/lib/auth/tokenCookies';
import { Category } from '@/types/category';
import { Expense } from '@/types/expense';
import { Instance } from '@/types/instance';
import { InstanceContext } from '@/hooks/InstanceContext';
import { db } from '@/lib/firebase/firebaseAdmin';
import ExpenseModal from '@/components/dashboard/modals/ExpenseModal/ExpenseModal';
import DashboardShell from '@/components/dashboard/shared/DashboardShell/DashboardShell';
import EmptyState from '@/components/dashboard/index/EmptyState';
import ExpensesTable from '@/components/dashboard/index/ExpensesTable';
import fetcher from '@/lib/fetcher';
import LoadingState from '@/components/dashboard/shared/LoadingState';
import Stats from '@/components/dashboard/index/Stats';

const Dashboard: NextPage = () => {
  const { data, error } = useSWR<[Instance]>('/api/instances', fetcher);

  if (error) return <div>Error</div>;

  // const { instance } = useContext(InstanceContext);
  // const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  // const [expense, setExpense] = useState<Expense | null>(null);

  // const { data, error } = useSWR<Category[]>(
  //   `/api/categories/${instance?.id}`,
  //   fetcher
  // );

  // if (error) return <div>failed to load</div>;
  // if (!data)
  //   return (
  //     <DashboardShell>
  //       <LoadingState label="Gathering your budget" />
  //     </DashboardShell>
  //   );

  // const hasCategories = data.length > 0;

  // if (!instance /*|| !hasCategories*/) {
  //   return (
  //     <DashboardShell>
  //       <EmptyState hasInstance={instance != null} />
  //     </DashboardShell>
  //   );
  // }

  // const handleCategories = () => {
  //   if (!data) return [];

  //   return data.map(category => category.id + '/');
  // };

  console.log(getTokenCookie());
  if (!data) return <LoadingState label="Gathering your budget" />;

  return (
    <DashboardShell>
      {data.map(instance => (
        <h1 key={instance.id}>{instance.month}</h1>
      ))}
    </DashboardShell>
  );
};

export default Dashboard;
