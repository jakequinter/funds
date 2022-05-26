import Link from 'next/link';
import { ArrowRight } from 'iconoir-react';
import useSWR from 'swr';
import { format } from 'date-fns';

import { Instance } from '@/types/instance';
import fetcher from '@/lib/fetcher';

export default function HistoryList() {
  const { data, error } = useSWR<Instance[]>('/api/history', fetcher);

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="mt-8 overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-slate-200">
        {data.map(instance => (
          <li key={instance.id}>
            <Link href={`/dashboard/history/${instance.id}`} passHref>
              <a className="block hover:bg-slate-100">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="truncate text-sm font-medium text-slate-900">
                          {format(
                            new Date(instance.year, instance.month - 1),
                            'PP'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ArrowRight
                      className="h-5 w-5 text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
