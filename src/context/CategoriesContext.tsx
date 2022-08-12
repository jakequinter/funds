import { createContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import { Category } from '@/types/category';
import fetcher from '@/lib/fetcher';
import useAuth from '@/hooks/useAuth';
import useInstance from '@/hooks/useInstance';

type CategoriesContextType = {
  categories: Category[] | null;
  loading: boolean;
};

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: null,
  loading: true,
});

type ContextProviderType = {
  children: React.ReactNode;
};

export const CategoriesProvider = ({ children }: ContextProviderType) => {
  const { user } = useAuth();
  const { instance } = useInstance();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoryIds, setCategoryIds] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR<Category[]>(
    `/api/categories/${instance?.id}`,
    fetcher
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setCategories(data);
    } else {
      setCategories([]);
    }

    setLoading(false);
  }, [data, error, user]);

  return (
    <CategoriesContext.Provider value={{ categories, loading }}>
      {children}
    </CategoriesContext.Provider>
  );
};
