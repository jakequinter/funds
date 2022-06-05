import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { authenticatedSession } from '@/test-utils/session';
import { mockCategory } from '@/test-utils/category';
import { SessionProvider } from 'next-auth/react';
import customRender from '@/test-utils/customRender';
import CategoryModal from './CategoryModal';
import DashboardShell from '@/components/dashboard/shared/DashboardShell/DashboardShell';

describe('ExpenseModal', () => {
  describe('adding a new expense', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <DashboardShell>
            <CategoryModal category={null} open={true} setOpen={jest.fn()} />
          </DashboardShell>
        </SessionProvider>
      );
    });

    it('display new title', async () => {
      expect(
        screen.getByRole('heading', { name: /add category/i })
      ).toBeInTheDocument();
    });

    it('defaults empty input values', async () => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
      expect(screen.getByTestId('selected-color')).toHaveTextContent('blue');
      expect(screen.getByLabelText(/target amount/i)).toHaveValue(0);
    });

    it('allows you to submit an expense', async () => {
      userEvent.type(screen.getByLabelText(/name/i), 'test category');
      userEvent.type(screen.getByLabelText(/target amount/i), '50');

      userEvent.click(screen.getByRole('button', { name: /add/i }));
    });
  });

  describe('editing an expense', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <CategoryModal
            category={mockCategory}
            open={true}
            setOpen={jest.fn()}
          />
        </SessionProvider>
      );
    });

    it('displays edit title', () => {
      expect(
        screen.getByRole('heading', { name: /edit groceries/i })
      ).toBeInTheDocument();
    });

    it('defaults inputs related expense', async () => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('Groceries');
      expect(screen.getByTestId('selected-color').textContent).toBe('green');
      expect(screen.getByLabelText(/target amount/i)).toHaveValue(600);
    });

    it('allows you to update an expense', async () => {
      userEvent.type(screen.getByLabelText(/name/i), 'groceries udpated');
      userEvent.type(screen.getByLabelText(/target amount/i), '500');

      userEvent.click(screen.getByRole('button', { name: /save/i }));
    });

    it('allows you to delete an expense', async () => {
      userEvent.click(screen.getByRole('button', { name: /delete/i }));
    });
  });
});
