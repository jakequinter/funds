import { createContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import { Instance } from '@/types/instance';
import fetcher from '@/lib/fetcher';

type Props = {
  children: React.ReactNode;
};

export const InstanceContext = createContext<any>(null);

export const InstanceContextProvider = ({ children }: Props) => {
  const { data, error } = useSWR<Instance[]>('/api/instance', fetcher);
  const [instance, setInstance] = useState<Instance | null>(null);

  useEffect(() => {
    if (!data?.hasOwnProperty('message')) {
      const currentInstance = data?.find(
        instance =>
          instance.month === new Date().getMonth() + 1 &&
          instance.year === new Date().getFullYear()
      );

      setInstance(currentInstance || null);
    }
  }, [data]);

  return (
    <InstanceContext.Provider value={{ instance }}>
      {children}
    </InstanceContext.Provider>
  );
};
