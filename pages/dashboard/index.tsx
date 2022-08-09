import { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { DocumentData } from 'firebase/firestore';
import { Plus } from 'iconoir-react';
import useSWR from 'swr';

import { Category } from '@/types/category';
import { Expense } from '@/types/expense';
import { Instance } from '@/types/instance';
import { InstanceContext } from '@/hooks/InstanceContext';
import { useAuth } from '@/hooks/useAuth';
import db from '@/lib/firebase/firebaseAdmin';
import ExpenseModal from '@/components/dashboard/modals/ExpenseModal/ExpenseModal';
import DashboardShell from '@/components/dashboard/shared/DashboardShell/DashboardShell';
import EmptyState from '@/components/dashboard/index/EmptyState';
import ExpensesTable from '@/components/dashboard/index/ExpensesTable';
import fetcher from '@/lib/fetcher';
import LoadingState from '@/components/dashboard/shared/LoadingState';
import Stats from '@/components/dashboard/index/Stats';

type Props = {
  instances: [Instance];
};

const Dashboard: NextPage<Props> = ({ instances }) => {
  // const { user } = useAuth();
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

  return (
    <DashboardShell>
      {instances.map(instance => (
        <h1 key={instance.id}>{instance.month}</h1>
      ))}
    </DashboardShell>
  );
};

export default Dashboard;

export async function getServerSideProps() {
  let instances: DocumentData = [];

  const instancesRef = db.collection('instances');
  const snapshot = await instancesRef.get();

  if (snapshot.empty) {
    instances = [];
  } else {
    snapshot.forEach(doc => {
      instances.push({ id: doc.id, ...doc.data() });
    });
  }

  return {
    props: {
      instances,
    },
  };
}
