import { useEffect, useState } from 'react';
import { Category } from '@/types/category';
import useInstance from './useInstance';

const useCategoryIds = () => {
  const { categories } = useInstance();
  const [categoryIds, setCategoryIds] = useState<string>('');

  const handleCategoryIds = (categories: Category[]) => {
    const categoryIds = categories.map(category => category.id + '/').join('');

    setCategoryIds(categoryIds);
  };

  useEffect(() => {
    if (categories) {
      handleCategoryIds(categories);
    }
  }, [categories]);

  return { categoryIds };
};

export default useCategoryIds;
