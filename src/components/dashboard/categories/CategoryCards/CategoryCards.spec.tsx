import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import { authenticatedSession } from '@/test-utils/session';
import customRender from '@/test-utils/customRender';
import CategoryCards from './CategoryCards';

describe('Categories', () => {
  describe('when user is authenticated', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <CategoryCards
            setModalOpen={() => null}
            setSelectedEditCategory={() => null}
          />
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
