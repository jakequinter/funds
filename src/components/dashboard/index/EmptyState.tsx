import { useSWRConfig } from 'swr';
import Link from 'next/link';

import useToast from '@/hooks/useToast';

type Props = {
  hasInstance: boolean;
};

export default function EmptyState({ hasInstance }: Props) {
  const { mutate } = useSWRConfig();
  const toast = useToast();

  const handleAddInstance = async () => {
    try {
      const res = await fetch('/api/instance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        }),
      });

      if (res.ok) {
        mutate('/api/instance');
        toast('success', 'Your monthly budget has been created.');
      } else {
        toast('error', 'There was an issue creating your monthly budget.');
      }
    } catch (error) {
      toast('error', 'There was an issue creating your monthly budget.');
    }
  };

  if (!hasInstance) {
    return (
      <div className="mt-12 rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="text-2xl font-semibold text-slate-900">
          Welcome to funds
        </h1>

        <p className="mt-4 mb-8">
          You currently don&apos;t have a budget started for this month.
        </p>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow hover:border-slate-400 focus:outline-none focus:ring-0"
          onClick={handleAddInstance}
        >
          Start new month
        </button>
      </div>
    );
  }
  return (
    <div className="mt-12 rounded-lg bg-white p-8 text-center shadow-lg">
      <h1 className="text-2xl font-semibold text-slate-900">
        Let&apos;s get started
      </h1>

      <p className="mt-4 mb-8">
        To get started, navigate to the Categories tab to add your first
        category.
      </p>

      <Link href="/dashboard/categories" passHref>
        <a className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow hover:border-slate-400 focus:outline-none focus:ring-0">
          Go to categories
        </a>
      </Link>
    </div>
  );
}
