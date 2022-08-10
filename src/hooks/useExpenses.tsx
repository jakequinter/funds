import { useContext } from 'react';

import { ExpensesContext } from 'src/context/ExpensesContext';

const useExpenses = () => {
  return useContext(ExpensesContext);
};

export default useExpenses;
