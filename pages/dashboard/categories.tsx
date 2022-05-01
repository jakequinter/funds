import type { NextPage } from 'next';
import Head from 'next/head';
import { Plus } from 'iconoir-react';

import DashboardShell from '@/components/dashboard/DashboardShell';

const Categories: NextPage = () => {
  return (
    <DashboardShell>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
        <button
          type="button"
          className="text-sm inline-flex items-center px-4 py-2 border border-slate-300 shadow font-medium rounded-md bg-white hover:border-slate-400 focus:outline-none focus:ring-0"
        >
          <Plus className="mr-2" /> Add category
        </button>
      </div>
    </DashboardShell>
  );
};

export default Categories;
