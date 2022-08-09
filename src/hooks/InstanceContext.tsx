import { createContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import { useAuth } from '@/hooks/useAuth';
import { Instance } from '@/types/instance';
import fetcher from '@/lib/fetcher';

type Props = {
  children: React.ReactNode;
};

export const InstanceContext = createContext<any>(null);

export const InstanceContextProvider = ({ children }: Props) => {
  const { user } = useAuth();

  const { data } = useSWR<Instance[]>('/api/instances/', fetcher);
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
  }, [data, user]);

  return (
    <InstanceContext.Provider value={{ instance }}>
      {children}
    </InstanceContext.Provider>
  );
};
