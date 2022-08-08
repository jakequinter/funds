import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { authenticatedSession } from '@/test-utils/session';
import { mockExpense } from '@/test-utils/expense';
import { SessionProvider } from 'next-auth/react';
import customRender from '@/test-utils/customRender';
import ExpenseModal from './ExpenseModal';

describe('ExpenseModal', () => {
  describe('adding a new expense', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <ExpenseModal
            expense={null}
            setExpense={jest.fn()}
            setOpen={jest.fn()}
            open={true}
            categories={[]}
            categoryIds={[]}
          />
        </SessionProvider>
      );
    });

    it('shows modal', async () => {
      expect(screen.getByText('Add Expense')).toBeInTheDocument();
    });

    it('defaults inputs to empty or zero', async () => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
      expect(screen.getByLabelText(/amount/i)).toHaveValue('0');
      expect(screen.getByLabelText(/category/i)).toHaveValue('');
    });

    it('shows add button', async () => {
      expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });
  });

  describe('editing an expense', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <ExpenseModal
            expense={mockExpense}
            setExpense={jest.fn()}
            setOpen={jest.fn()}
            open={true}
            categories={[]}
            categoryIds={[]}
          />
        </SessionProvider>
      );
    });

    it('defaults inputs related expense', async () => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('Posto');
      expect(screen.getByLabelText(/amount/i)).toHaveValue('300');
      // @TODO: figure out why this isn't working
      // expect(screen.getByLabelText(/category/i)).toHaveValue('Restaurants');
    });

    it('shows save button', async () => {
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });
  });
});
