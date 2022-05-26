/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import toast from 'react-hot-toast';

import { InstanceContext } from '@/hooks/InstanceContext';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type FormData = {
  name: string;
  color: string;
  target: number;
};

export default function AddCategoryModal({ open, setOpen }: Props) {
  const { instance } = useContext(InstanceContext);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (values: FormData) => {
    if (!instance) return;

    try {
      const res = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          target: Number(values.target),
          instanceId: instance.id,
        }),
      });

      if (res.ok) {
        setOpen(false);
        mutate(`/api/instance/${instance?.id}`);
        toast.success('Category added successfully.');
      } else {
        toast.error('There was an issue adding your category.');
      }
    } catch (error) {
      toast.error('There was an issue adding your category.');
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <h1 className="mb-8 text-center text-2xl font-semibold text-slate-900">
                Add Category
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-0 sm:text-sm"
                      placeholder="Groceries"
                      {...register('name', { required: true })}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="color" className="block text-sm font-medium">
                    Color
                  </label>
                  <div className="mt-1">
                    <select
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-0 sm:text-sm"
                      placeholder="Groceries"
                      {...register('color', { required: true })}
                    >
                      <option>blue</option>
                      <option>purple</option>
                      <option>pink</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="target" className="block text-sm font-medium">
                    Target amount
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-0 sm:text-sm"
                      placeholder="500"
                      {...register('target', { required: true })}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="focus:ring-0sm:text-sm inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none"
                  >
                    Save
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
