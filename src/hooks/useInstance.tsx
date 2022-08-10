import { useContext } from 'react';

import { InstanceContext } from 'src/context/InstanceContext';

const useInstance = () => {
  return useContext(InstanceContext);
};

export default useInstance;
