import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Plus } from 'iconoir-react';

import AddCategoryModal from '@/components/dashboard/modals/AddCategoryModal';
import CategoryList from '@/components/dashboard/categories/CategoryList';
import DashboardShell from '@/components/dashboard/DashboardShell';

const Categories: NextPage = () => {
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  return (
    <DashboardShell>
      <AddCategoryModal
        open={addCategoryModalOpen}
        setOpen={setAddCategoryModalOpen}
      />
      <div className="flex justify-between items-center mb-24">
        <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
        <button
          type="button"
          className="text-sm inline-flex items-center px-4 py-2 border border-slate-300 shadow font-medium rounded-md bg-white hover:border-slate-400 focus:outline-none focus:ring-0"
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
