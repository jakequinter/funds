import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import userEvent from '@testing-library/user-event';

import { authenticatedSession } from '@/test-utils/session';
import customRender from '@/test-utils/customRender';
import CategoryCards from './CategoryCards';

describe('Categories', () => {
  describe('when user is authenticated', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <CategoryCards
            setModalOpen={jest.fn()}
            setSelectedEditCategory={jest.fn()}
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

    it('renders Categorycards and their current total spend', () => {
      expect(screen.getByText(/groceries/i)).toBeInTheDocument();
      expect(screen.getByText(/181.36/i)).toBeInTheDocument();
      expect(screen.getByText(/miscellaneou/i)).toBeInTheDocument();
      expect(screen.getByText(/324.72/i)).toBeInTheDocument();
      expect(screen.getByText(/restaurants/i)).toBeInTheDocument();
      expect(screen.getByText(/1,599.99/i)).toBeInTheDocument();
    });
  });
});
