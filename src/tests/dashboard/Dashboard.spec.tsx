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
});
