import { useContext } from 'react';

import { CategoriesContext } from 'src/context/CategoriesContext';

const useCategories = () => {
  return useContext(CategoriesContext);
};

export default useCategories;
