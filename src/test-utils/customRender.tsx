import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { InstanceContextProvider } from '@/hooks/InstanceContext';
import { MySwrConfig } from '@/lib/SWRConfig';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MySwrConfig swrConfig={{ dedupingInterval: 0, provider: () => new Map() }}>
      <InstanceContextProvider>{children}</InstanceContextProvider>
    </MySwrConfig>
  );
};

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export default customRender;
