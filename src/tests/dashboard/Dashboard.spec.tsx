import { rest } from 'msw';
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { authenticatedSession } from '@/test-utils/session';
import { server } from '../../mocks/server';
import { SessionProvider } from 'next-auth/react';
import customRender from '@/test-utils/customRender';
import Dashboard from 'pages/dashboard/';

describe('Dashboard', () => {
  describe('when user is authenticated', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <Dashboard />
        </SessionProvider>
      );

      await waitForElementToBeRemoved(() =>
        screen.getByText(/gathering your budget/i)
      );
    });

    it('renders Dashboard page with user name', async () => {
      expect(screen.getByText(/welcome, jake!/i)).toBeInTheDocument();
    });

    it('allows you to open expense modal', async () => {
      const addExpenseButton = screen.getByText(/add expense/i);

      expect(addExpenseButton).toBeInTheDocument();
      userEvent.click(addExpenseButton);

      await waitFor(() => {
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
      });
    });
  });

  describe('returns error state on api call', () => {
    beforeEach(async () => {
      jest.spyOn(console, 'error');
      // @ts-ignore
      console.error.mockImplementation(() => {});

      server.use(
        rest.get('/api/category/:instanceId', (req, res, ctx) => {
          return res(ctx.delay(100), ctx.status(401));
        })
      );
      customRender(
        <SessionProvider session={authenticatedSession}>
          <Dashboard />
        </SessionProvider>
      );

      await waitForElementToBeRemoved(() =>
        screen.getByText(/gathering your budget/i)
      );
    });

    afterEach(() => {
      // @ts-ignore
      console.error.mockRestore();
    });

    it('renders error message', async () => {
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
    });
  });

  describe('renders table of expenses', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <Dashboard />
        </SessionProvider>
      );

      await waitForElementToBeRemoved(() =>
        screen.getByText(/gathering your budget/i)
      );
    });

    it('renders dropdown', () => {
      expect(screen.getAllByTestId('expense-dropdown-button')).toHaveLength(6);
    });

    it('shows all options', async () => {
      const buttons = screen.getAllByTestId('expense-dropdown-button');
      userEvent.click(buttons[0]);

      await waitFor(() => {
        expect(screen.getByText(/edit/i)).toBeInTheDocument();
        expect(screen.getByText(/delete/i)).toBeInTheDocument();
      });
    });

    it('shows correct expense title when editing', async () => {
      const buttons = screen.getAllByTestId('expense-dropdown-button');
      userEvent.click(buttons[0]);

      await waitFor(() => {
        expect(screen.getByText(/edit/i)).toBeInTheDocument();
        expect(screen.getByText(/delete/i)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText(/edit/i));

      await waitFor(() =>
        expect(screen.getByText(/edit amazon/i)).toBeInTheDocument()
      );
    });

    it('allows you to edit expense', async () => {
      const buttons = screen.getAllByTestId('expense-dropdown-button');
      userEvent.click(buttons[0]);

      await waitFor(() => {
        expect(screen.getByText(/edit/i)).toBeInTheDocument();
        expect(screen.getByText(/delete/i)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText(/edit/i));

      await waitFor(() => {
        expect(screen.getByText(/edit amazon/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      });

      userEvent.type(screen.getByLabelText(/name/i), 'new name');
      userEvent.click(screen.getByText(/save/i));

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
      });
    });

    it('allows you to delete expense', async () => {
      const buttons = screen.getAllByTestId('expense-dropdown-button');
      userEvent.click(buttons[0]);

      await waitFor(() => {
        expect(screen.getByText(/edit/i)).toBeInTheDocument();
        expect(screen.getByText(/delete/i)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText(/delete/i));

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
      });
    });
  });
});
