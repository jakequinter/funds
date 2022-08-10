import { createContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import { useAuth } from '@/hooks/useAuth';
import { Expense } from '@/types/expense';
import fetcher from '@/lib/fetcher';
import useCategories from '@/hooks/useCategories';

type ExpensesContextType = {
  expenses: Expense[] | null;
  loading: boolean;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: null,
  loading: true,
});

type ExpensesProviderType = {
  children: React.ReactNode;
};

export const ExpensesProvider = ({ children }: ExpensesProviderType) => {
  const { user } = useAuth();
  const { categoryIds } = useCategories();
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [loading, setLoading] = useState(true);

  // @TODO: category ids are null here
  const { data, error } = useSWR<Expense[]>(
    `/api/expenses/${categoryIds}`,
    fetcher
  );

  useEffect(() => {
    if (data && categoryIds && categoryIds.length > 0 && data.length > 0) {
      setExpenses(data);
      setLoading(false);
    }
  }, [data, error, user, categoryIds]);

  return (
    <ExpensesContext.Provider value={{ expenses, loading }}>
      {children}
    </ExpensesContext.Provider>
  );
};
