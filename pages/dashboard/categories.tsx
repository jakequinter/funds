import { useEffect, useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Plus } from 'iconoir-react';

import { Category } from '@/types/category';
import CategoryModal from '@/components/dashboard/modals/CategoryModal/CategoryModal';
import CategoryCards from '@/components/dashboard/categories/CategoryCards/CategoryCards';
import DashboardShell from '@/components/dashboard/shared/DashboardShell/DashboardShell';
import LoadingState from '@/components/dashboard/shared/LoadingState';
import useInstance from '@/hooks/useInstance';

const Categories: NextPage = () => {
  const { instance, loading } = useInstance();
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (!addCategoryModalOpen) {
      setCategory(null);
    }
  }, [addCategoryModalOpen]);

  if (loading) {
    return (
      <DashboardShell>
        <Head>
          <title>Categories</title>
        </Head>
        <LoadingState label="Collecting your categories" />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Head>
        <title>Categories</title>
      </Head>
      <CategoryModal
        open={addCategoryModalOpen}
        setOpen={setAddCategoryModalOpen}
        category={category}
      />
      <div className="mb-12 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
        {instance ? (
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow hover:border-slate-400 focus:outline-none focus:ring-0"
            onClick={() => setAddCategoryModalOpen(true)}
          >
            <Plus className="mr-2" /> Add category
          </button>
        ) : null}
      </div>
      <CategoryCards
        setModalOpen={setAddCategoryModalOpen}
        setSelectedEditCategory={setCategory}
      />
    </DashboardShell>
  );
};

export default Categories;

export const getServerSideProps: GetServerSideProps = async context => {
  if (!context.req.cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
