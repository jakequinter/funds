import { rest } from 'msw';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { authenticatedSession } from '@/test-utils/session';
import { mockExpense } from '@/test-utils/expense';
import { SessionProvider } from 'next-auth/react';
import customRender from '@/test-utils/customRender';
import ExpenseDropdown from '../ExpenseDropdown';

describe('ExpenseDropdown', () => {
  describe('', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <ExpenseDropdown
            expense={mockExpense}
            setSelectedExpense={jest.fn()}
            setShowExpenseModal={jest.fn()}
            categoryIds={[]}
          />
        </SessionProvider>
      );
    });

    it('renders dropdown', () => {
      expect(screen.getByTestId('expense-dropdown-button')).toBeInTheDocument();
    });

    it('shows all options', async () => {
      const button = screen.getByTestId('expense-dropdown-button');
      userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText(/edit/i)).toBeInTheDocument();
        expect(screen.getByText(/delete/i)).toBeInTheDocument();
      });
    });

    it('allows you to edit expense', async () => {
      const button = screen.getByTestId('expense-dropdown-button');
      userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText(/edit/i)).toBeInTheDocument();
        expect(screen.getByText(/delete/i)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText(/edit/i));
    });
  });
});
