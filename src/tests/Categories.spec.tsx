import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { useSession } from 'next-auth/react';

import { authenticatedSession } from '@/test-utils/session';
import { InstanceContextProvider } from '@/hooks/InstanceContext';
import { MySwrConfig } from '@/lib/SWRConfig';
import Categories from 'pages/dashboard/categories';

jest.mock('next-auth/react');

describe('Categories', () => {
  describe('when user is authenticated', () => {
    beforeEach(async () => {
      render(
        <MySwrConfig>
          <InstanceContextProvider>
            <Categories />
          </InstanceContextProvider>
        </MySwrConfig>
      );

      await waitForElementToBeRemoved(
        screen.getByText(/gathering your budget/i)
      );
    });

    it('renders categories page', () => {
      expect(
        screen.getByRole('heading', { name: 'Categories' })
      ).toBeInTheDocument();
    });
  });
});
