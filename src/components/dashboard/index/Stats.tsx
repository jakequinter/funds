import { ArrowDown, ArrowUp } from 'iconoir-react';
import useSWR from 'swr';

import { Category } from '@/types/category';
import classNames from '@/utils/classNames';
import fetcher from '@/lib/fetcher';

export default function Stats() {
  const { data, error } = useSWR<Category[]>('/api/category', fetcher);

  if (!data) return null;
  if (error) return <div>failed to load</div>;

  const handleCalculateExpensesByCategory = (categoryName: string) => {
    const category = data?.find(category => category.name === categoryName);

    return (
      category?.Expense.reduce((acc, expense) => acc + expense.amount, 0) || 0
    );
  };

  const handleCalculatePercentageSpentByCategory = (
    categoryName: string,
    categoryTarget: number
  ) => {
    const amountSpent = handleCalculateExpensesByCategory(categoryName);

    return ((amountSpent / categoryTarget) * 100).toFixed(2);
  };

  return (
    <div>
      <dl className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {data &&
          data.map(category => (
            <div
              key={category.name}
              className="rounded-lg bg-white p-4 shadow-lg"
            >
              <dt>{category.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-slate-900">
                  $
                  {handleCalculateExpensesByCategory(
                    category.name
                  ).toLocaleString()}
                  <span className="ml-2 text-sm font-medium text-slate-500">
                    / ${category.target.toLocaleString()}
                  </span>
                </div>

                <div
                  className={classNames(
                    handleCalculateExpensesByCategory(category.name) <
                      category.target
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                    'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0 '
                  )}
                >
                  {handleCalculatePercentageSpentByCategory(
                    category.name,
                    category.target
                  )}
                  %
                </div>
              </dd>
            </div>
          ))}
      </dl>
    </div>
  );
}
