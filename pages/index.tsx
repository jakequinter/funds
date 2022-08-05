import type { NextPage } from 'next';
import Head from 'next/head';

import { useAuth } from '@/hooks/useAuth';
import Container from '@/components/Container';

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Head>
        <title>funds</title>
      </Head>

      <h1>{user?.email || 'no user'}</h1>
    </Container>
  );
};

export default Home;
