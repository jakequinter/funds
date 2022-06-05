import { Fragment, useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import toast from 'react-hot-toast';

import { Category } from '@/types/category';
import { Expense } from '@/types/expense';
import { InstanceContext } from '@/hooks/InstanceContext';
import { ToastContext } from '@/hooks/ToastContext';

type Props = {
  expense: Expense | null;
  setExpense: (expense: Expense | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

type FormData = {
  name: string;
  amount: number;
  categoryId: string;
};

export default function ExpenseModal({
  expense,
  setExpense,
  open,
  setOpen,
}: Props) {
  const { instance } = useContext(InstanceContext);
  const { setShowToast, setToastMessage } = useContext(ToastContext);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: expense?.name || '',
      amount: expense?.amount || 0,
      categoryId: expense?.categoryId || '',
    },
  });

  useEffect(() => {
    reset({
      name: expense?.name || '',
      amount: expense?.amount || 0,
      categoryId: expense?.categoryId || '',
    });
  }, [expense, open, reset]);

  const onSubmit = async (values: FormData) => {
    if (!instance) return;

    if (expense) {
      handleEditExpense(values);
    } else {
      handleAddExpense(values);
    }
  };

  const handleEditExpense = async (values: FormData) => {
    try {
      const res = await fetch('/api/expense', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          id: expense?.id,
          amount: Number(values.amount),
        }),
      });

      if (res.status === 200) {
        mutate(`/api/category/${instance?.id}`);
        setOpen(false);
        setToastMessage('Expense updated successfully.');
        setShowToast(true);
      } else {
        toast.error('There was an issue udpating your expense.');
      }
    } catch (error) {
      toast.error('There was an issue updating your expenes.');
    }
  };

  const handleAddExpense = async (values: FormData) => {
    try {
      const res = await fetch('/api/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          amount: Number(values.amount),
        }),
      });

      if (res.ok) {
        setOpen(false);
        mutate(`/api/category/${instance?.id}`);
        toast.success('Expense added successfully.');
      } else {
        toast.error('There was an issue adding your expense.');
      }
    } catch (error) {
      toast.error('There was an issue adding your expense.');
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setExpense(null);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleCloseModal}
      >
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              data-testid="expense-modal"
              className="relative inline-block w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"
            >
              <h1 className="mb-8 text-center text-2xl font-semibold text-slate-900">
                {expense ? `Edit ${expense.name}` : 'Add Expense'}
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-0 sm:text-sm"
                      placeholder="Amazon"
                      {...register('name', { required: true })}
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium">
                    Amount
                    <input
                      type="text"
                      id="amount"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-0 sm:text-sm"
                      placeholder="24.50"
                      {...register('amount', { required: true })}
                    />
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="categoryId"
                    className="block text-sm font-medium"
                  >
                    Category
                    <select
                      id="categoryId"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-0 sm:text-sm"
                      {...register('categoryId', { required: true })}
                    >
                      <option value="">Select a category</option>
                      {instance?.categories?.map((category: Category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="focus:ring-0sm:text-sm inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none"
                  >
                    {expense ? 'Save' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
