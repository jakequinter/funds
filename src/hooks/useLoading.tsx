import { useContext, useEffect, useState } from 'react';

import { CategoriesContext } from 'src/context/CategoriesContext';
import { InstanceContext } from 'src/context/InstanceContext';
import { ExpensesContext } from 'src/context/ExpensesContext';

const useLoading = () => {
  const { loading: instanceLoading } = useContext(InstanceContext);
  const { loading: categoriesLoading } = useContext(CategoriesContext);
  const { loading: expensesLoading } = useContext(ExpensesContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (instanceLoading || categoriesLoading || expensesLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [instanceLoading, categoriesLoading, expensesLoading]);

  return loading;
};

export default useLoading;
