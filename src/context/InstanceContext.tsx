import { createContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import { Instance } from '@/types/instance';
import fetcher from '@/lib/fetcher';
import useAuth from '@/hooks/useAuth';

type InstancesContextType = {
  instance: Instance | null;
  loading: boolean;
  refetchInstance: () => void;
};

export const InstanceContext = createContext<InstancesContextType>({
  instance: null,
  loading: true,
  refetchInstance: () => null,
});

type InstanceProviderType = {
  children: React.ReactNode;
};

export const InstanceContextProvider = ({ children }: InstanceProviderType) => {
  const { user } = useAuth();
  const [instance, setInstance] = useState<Instance | null>(null);
  const [loading, setLoading] = useState(true);

  const { data } = useSWR<Instance[]>(user ? '/api/instances/' : null, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      const currentInstance = data?.find(
        instance =>
          instance.month === new Date().getMonth() + 1 &&
          instance.year === new Date().getFullYear() &&
          instance.userId === user?.uid
      );

      setInstance(currentInstance || null);
    }

    setLoading(false);
  }, [data, user]);

  const refetchInstance = async () => {
    try {
      const res = await fetch('/api/instances');
      const data = await res.json();

      const currentInstance = data?.find(
        (instance: Instance) =>
          instance.month === new Date().getMonth() + 1 &&
          instance.year === new Date().getFullYear() &&
          instance.userId === user?.uid
      );

      setInstance(currentInstance || null);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <InstanceContext.Provider value={{ instance, loading, refetchInstance }}>
      {children}
    </InstanceContext.Provider>
  );
};
