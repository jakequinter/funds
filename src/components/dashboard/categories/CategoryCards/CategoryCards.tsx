import { useContext } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Edit } from 'iconoir-react';

import { Category } from '@/types/category';
import { InstanceContext } from '@/hooks/InstanceContext';
import fetcher from '@/lib/fetcher';
import formatMoney from '@/utils/formatMoney';
import handleCategoryColors from '@/utils/handleCategoryColors';
import LoadingState from '@/components/dashboard/shared/LoadingState';

type Props = {
  setModalOpen: (open: boolean) => void;
  setSelectedEditCategory: (category: Category | null) => void;
};

export default function CategoryList({
  setModalOpen,
  setSelectedEditCategory,
}: Props) {
  const { instance } = useContext(InstanceContext);

  const { data, error } = useSWR<Category[]>(
    `/api/categories/${instance?.id}`,
    fetcher
  );

  if (!data || !instance) return <LoadingState label="Gathering your budget" />;
  if (error) return <div>failed to load</div>;

  // const handleCategoryTotalSpend = (category: Category) => {
  //   if (category.expenses?.length === 0) return 0;

  //   return category.expenses.reduce((acc, expense) => {
  //     return acc + expense.spend;
  //   }, 0);
  // };

  const handleEditCategory = (category: Category) => {
    setModalOpen(true);
    setSelectedEditCategory(category);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {data.map(category => {
        const { bgColor, textColor, shadowColor } = handleCategoryColors(
          category.color
        );

        return (
          <div
            key={category.id}
            className={`${bgColor} ${shadowColor} rounded-[40px] p-8 shadow-lg`}
          >
            <h2 className={`${textColor} text-center text-2xl font-semibold`}>
              {category.name}
            </h2>

            <button
              type="button"
              className={`${bgColor} ${shadowColor} ${textColor} mt-8 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-0`}
              onClick={() => handleEditCategory(category)}
            >
              <span className="mr-4">Edit</span>
              <Edit fontSize="10" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
