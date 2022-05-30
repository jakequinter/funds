import React, { ReactNode } from 'react';
import { SWRConfig, Cache } from 'swr';
import { Fetcher, PublicConfiguration } from 'swr/dist/types';

import fetcher from './fetcher';

type Provider = { provider?: (cache: Readonly<Cache<any>>) => Cache<any> };

export function MySwrConfig({
  children,
  swrConfig,
}: {
  children?: ReactNode;
  // eslint-disable-next-line
  swrConfig?: Partial<PublicConfiguration<any, any, Fetcher<any>>> & Provider;
}) {
  return <SWRConfig value={{ fetcher, ...swrConfig }}>{children}</SWRConfig>;
}
