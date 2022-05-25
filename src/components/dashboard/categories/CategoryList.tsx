import { useContext, useEffect } from 'react';
import useSWR from 'swr';

import { Instance } from '@/types/instance';
import { InstanceContext } from '@/hooks/InstanceContext';
import fetcher from '@/lib/fetcher';
import handleBoxStyles from '@/utils/handleBoxStyles';

export default function CategoryList() {
  const { instance } = useContext(InstanceContext);
  const { data, error } = useSWR<Instance>(
    `/api/instance/${instance?.id}`,
    fetcher
  );

  if (!data) return <p>Loading...</p>;
  if (error) return <div>failed to load</div>;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {data?.categories?.map(category => {
        const { bgColor, textColor, shadowColor } = handleBoxStyles(
          category.color
        );

        return (
          <div
            key={category.id}
            className={`${bgColor} ${shadowColor} h-60 rounded-[40px] p-8 shadow-lg`}
          >
            <h2 className={`${textColor} text-center text-2xl font-semibold`}>
              {category.name}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
