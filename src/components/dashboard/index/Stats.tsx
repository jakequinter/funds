import { ArrowDown, ArrowUp } from 'iconoir-react';

import classNames from '@/utils/classNames';
import useCategories from '@/hooks/useCategories';
import useExpenses from '@/hooks/useExpenses';

export default function Stats() {
  const { categories } = useCategories();
  const { expenses } = useExpenses();

  const handleCalculateExpensesByCategory = (categoryId: string) => {
    return (
      expenses
        ?.filter(expense => expense.categoryId === categoryId)
        .reduce((acc, expense) => acc + expense.spend, 0) || 0
    );
  };

  const handleCalculatePercentageSpentByCategory = (
    categoryId: string,
    categoryTarget: number
  ) => {
    const amountSpent = handleCalculateExpensesByCategory(categoryId);

    if (amountSpent <= categoryTarget) {
      return (
        <div className="flex items-center">
          <ArrowUp className="mr-1" fontSize="10" />{' '}
          {((amountSpent / categoryTarget) * 100).toFixed(2)}%
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <ArrowDown className="mr-1" fontSize="10" />{' '}
          {((amountSpent / categoryTarget) * 100).toFixed(2)}%
        </div>
      );
    }
  };

  return (
    <div>
      <dl className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {categories?.map(category => (
          <div
            key={category.name}
            className="rounded-lg bg-white p-4 shadow-lg"
          >
            <dt>{category.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-slate-900">
                $
                {handleCalculateExpensesByCategory(
                  category.id
                ).toLocaleString()}
                <span className="ml-2 text-sm font-medium text-slate-500">
                  / ${category.target.toLocaleString()}
                </span>
              </div>

              <div
                className={classNames(
                  handleCalculateExpensesByCategory(category.id) <=
                    category.target
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0 '
                )}
              >
                {handleCalculatePercentageSpentByCategory(
                  category.id,
                  category.target
                )}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
