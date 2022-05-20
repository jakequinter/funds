import React from 'react';
import { format } from 'date-fns';
import useSWR from 'swr';

import { Category } from '@/types/category';
import fetcher from '@/lib/fetcher';
import handleBoxStyles from '@/utils/handleBoxStyles';

export default function ExpensesTable() {
  const { data, error } = useSWR<Category[]>('/api/category', fetcher);

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-slate-300">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 sm:block"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
                  >
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {data &&
                  data.map(category => {
                    const { bgColor, textColor, shadowColor } = handleBoxStyles(
                      category.color
                    );
                    return category.Expense.map(expense => (
                      <tr key={expense.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
                          {expense.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                          ${expense.amount.toFixed(2)}
                        </td>
                        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-slate-500 sm:block">
                          {format(new Date(expense.createdAt), 'PP')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                          <span
                            className={`inline-flex items-center justify-center rounded-full ${bgColor} ${shadowColor} ${textColor} px-3 py-0.5 text-sm font-medium shadow`}
                          >
                            {category.name}
                          </span>
                        </td>
                      </tr>
                    ));
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
