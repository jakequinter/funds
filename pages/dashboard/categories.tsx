import { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Plus } from 'iconoir-react';
import useSWR from 'swr';

import { Instance } from '@/types/instance';
import { InstanceContext } from '@/hooks/InstanceContext';
import AddCategoryModal from '@/components/dashboard/modals/AddCategoryModal';
import CategoryList from '@/components/dashboard/categories/CategoryList';
import DashboardShell from '@/components/dashboard/DashboardShell';
import fetcher from '@/lib/fetcher';

const Categories: NextPage = () => {
  const msg = useContext(InstanceContext);
  const { data, error } = useSWR<Instance[]>('/api/instance', fetcher);
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  return (
    <DashboardShell>
      <AddCategoryModal
        open={addCategoryModalOpen}
        setOpen={setAddCategoryModalOpen}
      />
      <div className="mb-12 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow hover:border-slate-400 focus:outline-none focus:ring-0"
          onClick={() => setAddCategoryModalOpen(true)}
        >
          <Plus className="mr-2" /> Add category
        </button>
      </div>
      <CategoryList />
    </DashboardShell>
  );
};

export default Categories;
