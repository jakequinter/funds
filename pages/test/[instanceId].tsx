import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { getInstance } from '@/lib/firebaseFunctions/getInstances';
import { Instance } from '@/types/instance';

type Props = {
  instanceId: string;
  instance: Instance;
};

export default function SSRPage({ instanceId, instance }: Props) {
  console.log('instance', instanceId);
  return (
    <div className="container">
      <Head>
        <title>Next.js w/ Firebase Client-Side</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Next.js w/ Firebase Server-Side</h1>
        <h1>{instanceId}</h1>
        <h2>{instance.month}</h2>
        <p>{instance.year}</p>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const instanceId = context.params?.instanceId as string;

  const instance = await getInstance(instanceId);
  if (!instance) {
    return { notFound: true };
  }
  return {
    props: {
      instanceId,
      instance,
    },
  };
};
