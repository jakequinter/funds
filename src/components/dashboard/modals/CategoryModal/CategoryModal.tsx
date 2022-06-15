import { Fragment, useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Controller, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

import { Category } from '@/types/category';
import { InstanceContext } from '@/hooks/InstanceContext';
import categoriesSelectColors from '@/data/categoriesSelectColors';
import Color from '../../categories/types/color';
import CategoryColorSelect from '../../categories/CategoryColorSelect';
import useToast from '@/hooks/useToast';

type Props = {
  category: Category | null;
  open: boolean;
  setOpen: (open: boolean) => void;
};

type FormData = {
  name: string;
  color: Color;
  target: number;
};

export default function AddCategoryModal({ open, setOpen, category }: Props) {
  const { instance } = useContext(InstanceContext);
  const toast = useToast();
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: category?.name || '',
      color: category
        ? categoriesSelectColors.find(c => c.name === category.color)
        : categoriesSelectColors[0],
      target: category ? category.target : 0,
    },
  });

  useEffect(() => {
    reset({
      name: category?.name || '',
      color: category
        ? categoriesSelectColors.find(c => c.name === category.color)
        : categoriesSelectColors[0],
      target: category ? category.target : 0,
    });
  }, [category, open, reset]);

  const onSubmit = async (values: FormData) => {
    if (!instance) return;

    if (category) {
      handleEditCategory(values);
    } else {
      handleAddCategory(values);
    }
  };

  const handleEditCategory = async (values: FormData) => {
    try {
      const res = await fetch('/api/category', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          id: category?.id,
          color: values.color.name,
          target: Number(values.target),
        }),
      });

      if (res.status === 200) {
        mutate(`/api/category/${instance?.id}`);
        setOpen(false);
        toast('success', 'Category updated successfully.');
      } else {
        toast('error', 'There was an issue udpating your category.');
      }
    } catch (error) {
      toast('error', 'There was an issue updating your category.');
    }
  };

  const handleAddCategory = async (values: FormData) => {
    try {
      const res = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          color: values.color.name,
          target: Number(values.target),
          instanceId: instance.id,
        }),
      });

      if (res.status === 200) {
        mutate(`/api/category/${instance?.id}`);
        setOpen(false);
        toast('success', 'Category added successfully.');
      } else {
        toast('error', 'There was an issue adding your category.');
      }
    } catch (error) {
      toast('error', 'There was an issue adding your category.');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch('/api/category/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (res.status === 200) {
        mutate(`/api/category/${instance?.id}`);
        setOpen(false);
        toast('success', 'Category deleted successfully.');
      } else {
        toast('error', 'There was an issue deleting your category.');
      }
    } catch (error) {
      toast('error', 'There was an issue deleting your category.');
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
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
            <div className="relative inline-block w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <h1 className="mb-8 text-center text-2xl font-semibold text-slate-900">
                {category ? `Edit ${category.name}` : 'Add Category'}
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-0 sm:text-sm"
                      placeholder="Groceries"
                      {...register('name', { required: true })}
                    />
                  </label>
                </div>
                <Controller
                  control={control}
                  name="color"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <CategoryColorSelect
                      category={category}
                      colors={categoriesSelectColors}
                      onChange={onChange}
                    />
                  )}
                />
                <div className="mb-4">
                  <label htmlFor="target" className="block text-sm font-medium">
                    Target amount
                    <input
                      type="number"
                      id="target"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-0 sm:text-sm"
                      placeholder="500"
                      defaultValue={category?.target}
                      {...register('target', { required: true })}
                    />
                  </label>
                </div>
                <div className="mt-5 sm:mt-6">
                  {category && (
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="focus:ring-0sm:text-sm inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="focus:ring-0sm:text-sm inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {!category && (
                    <button
                      type="submit"
                      className="focus:ring-0sm:text-sm inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none"
                    >
                      Add
                    </button>
                  )}
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
