import useSWR from 'swr';

import { Category } from '@/types/category';
import fetcher from '@/lib/fetcher';
import handleBoxStyles from './handleBoxStyles';

export default function CategoryList() {
  const { data, error } = useSWR<Category[]>('/api/category', fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {data?.map(category => {
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
