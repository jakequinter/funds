import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import { authenticatedSession } from '@/test-utils/session';
import { InstanceContextProvider } from '@/hooks/InstanceContext';
import { MySwrConfig } from '@/lib/SWRConfig';
import CategoryCards from './CategoryCards';

describe('Categories', () => {
  describe('when user is authenticated', () => {
    beforeEach(async () => {
      render(
        <SessionProvider session={authenticatedSession}>
          <MySwrConfig>
            <InstanceContextProvider>
              <CategoryCards
                setModalOpen={() => null}
                setSelectedEditCategory={() => null}
              />
            </InstanceContextProvider>
          </MySwrConfig>
        </SessionProvider>
      );

      await waitForElementToBeRemoved(() =>
        screen.getByText(/gathering your budget/i)
      );
    });

    it('renders the list of categories', () => {
      expect(screen.getByText(/groceries/i)).toBeInTheDocument();
      expect(screen.getByText(/miscellaneous/i)).toBeInTheDocument();
      expect(screen.getByText(/restaurants/i)).toBeInTheDocument();
    });
  });
});
