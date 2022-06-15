import { useContext } from 'react';
import { format } from 'date-fns';
import useSWR from 'swr';

import { Expense } from '@/types/expense';
import { InstanceContext } from '@/hooks/InstanceContext';
import ExpenseDropdown from './ExpenseDropdown';
import fetcher from '@/lib/fetcher';
import handleCategoryColors from '@/utils/handleCategoryColors';
import Spinner from '../shared/Spinner';

interface AllowExpensesDropdownType {
  showExpenseDropdown: true;
  setSelectedExpense: (expense: Expense) => void;
  setShowExpenseModal: (open: boolean) => void;
}

interface DisallowExpensesDropdownType {
  showExpenseDropdown: false;
  setSelectedExpense?: (expense: Expense) => void;
  setShowExpenseModal?: (open: boolean) => void;
}

type Props = AllowExpensesDropdownType | DisallowExpensesDropdownType;

export default function ExpensesTable({
  showExpenseDropdown,
  setSelectedExpense,
  setShowExpenseModal,
}: Props) {
  const { instance } = useContext(InstanceContext);

  const { data, error } = useSWR<Expense[]>(
    `/api/expense/${instance?.id}`,
    fetcher
  );

  if (error) {
    return (
      <div className="mt-8 flex h-96 items-center justify-center rounded-lg border border-slate-200 shadow">
        There was a problem loading your expenses
      </div>
    );
  }

  if (!data || !instance) {
    return (
      <div className="mt-8 flex h-96 items-center justify-center rounded-lg border border-slate-200 shadow">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative mt-8 flex flex-col">
      <div className="inline-block min-w-full py-2 align-middle">
        <div className="overflow-x-auto rounded-lg shadow ring-1 ring-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
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
                {showExpenseDropdown ? (
                  <th scope="col" className="relative py-3.5" />
                ) : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {data &&
                data.map(expense => {
                  const { bgColor, textColor, shadowColor } =
                    handleCategoryColors(expense.category.color);
                  return (
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
                          className={`inline-flex items-center justify-center rounded-full ${bgColor} ${shadowColor} ${textColor} px-3 py-0.5 text-sm font-medium`}
                        >
                          {expense.category.name}
                        </span>
                      </td>
                      {showExpenseDropdown ? (
                        <td className="whitespace-nowrap py-4 pr-2 text-right text-sm font-medium">
                          <ExpenseDropdown
                            expense={expense}
                            setShowExpenseModal={setShowExpenseModal}
                            setSelectedExpense={setSelectedExpense}
                          />
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
