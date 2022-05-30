import { useContext } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Edit } from 'iconoir-react';
import { toast } from 'react-hot-toast';

import { Category } from '@/types/category';
import { InstanceContext } from '@/hooks/InstanceContext';
import fetcher from '@/lib/fetcher';
import formatMoney from '@/utils/formatMoney';
import handleCategoryColors from '@/utils/handleCategoryColors';

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
    `/api/category/${instance?.id}`,
    fetcher
  );

  if (!data) return <p>Loading...</p>;
  if (error) return <div>failed to load</div>;

  const handleCategoryTotalSpend = (category: Category) => {
    if (category.expenses?.length === 0) return 0;

    return category.expenses.reduce((acc, expense) => {
      return acc + expense.amount;
    }, 0);
  };

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
            className={`${bgColor} ${shadowColor} relative rounded-[40px] p-8 shadow-lg`}
          >
            <div className="absolute top-4 right-4">
              <Edit
                onClick={() => handleEditCategory(category)}
                fontSize="10"
                className={`${textColor} cursor-pointer hover:opacity-70`}
              />
            </div>

            <h2 className={`${textColor} text-center text-2xl font-semibold`}>
              {category.name}
            </h2>

            <p className={`${textColor} mt-4 text-2xl`}>
              ${formatMoney(handleCategoryTotalSpend(category), 2)} /{' '}
              <span className="text-sm">{formatMoney(category.target, 2)}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
