import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { useSession } from 'next-auth/react';

import { authenticatedSession } from '@/test-utils/session';
import { InstanceContextProvider } from '@/hooks/InstanceContext';
import { MySwrConfig } from '@/lib/SWRConfig';
import CategoryCards from './CategoryCards';

jest.mock('next-auth/react');

describe('Categories', () => {
  describe('when user is authenticated', () => {
    beforeEach(async () => {
      (useSession as jest.Mock).mockReturnValueOnce(authenticatedSession);

      render(
        <MySwrConfig>
          <InstanceContextProvider>
            <CategoryCards
              setModalOpen={() => null}
              setSelectedEditCategory={() => null}
            />
          </InstanceContextProvider>
        </MySwrConfig>
      );

      await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
    });

    it('renders the list of categories', () => {
      expect(screen.getByText(/groceries/i)).toBeInTheDocument();
      expect(screen.getByText(/miscellaneous/i)).toBeInTheDocument();
      expect(screen.getByText(/restaurants/i)).toBeInTheDocument();
    });
  });
});
