import { Fragment, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MoreVert } from 'iconoir-react';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';

import { Expense } from '@/types/expense';
import { InstanceContext } from '@/hooks/InstanceContext';
import classNames from '@/utils/classNames';

type Props = {
  expense: Expense;
  setSelectedExpense: (expense: Expense) => void;
  setShowExpenseModal: (open: boolean) => void;
};

export default function ExpenseDropdown({
  expense,
  setSelectedExpense,
  setShowExpenseModal,
}: Props) {
  const { instance } = useContext(InstanceContext);
  const { mutate } = useSWRConfig();

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowExpenseModal(true);
  };

  const handleDeleteExpense = async () => {
    try {
      const res = await fetch('/api/expense/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: expense.id }),
      });

      if (res.status === 200) {
        mutate(`/api/category/${instance?.id}`);
        toast.success('Expense deleted successfully.');
      } else {
        toast.error('There was an issue deleting your expense.');
      }
    } catch (error) {
      toast.error('There was an issue deleting your expense.');
    }
  };
  return (
    <Menu as="div" className="inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center  bg-white px-4 py-2 text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-0">
          <MoreVert />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-0 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleEditExpense(expense)}
                  className={classNames(
                    active ? 'bg-slate-100 text-slate-900' : '',
                    'block w-full px-4 py-2 text-left text-sm'
                  )}
                >
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDeleteExpense}
                  className={classNames(
                    active ? 'bg-slate-100 text-slate-900' : '',
                    'block w-full px-4 py-2 text-left text-sm'
                  )}
                >
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
