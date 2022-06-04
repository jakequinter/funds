import { screen, waitForElementToBeRemoved } from '@testing-library/react';

import customRender from '@/test-utils/customRender';
import Dashboard from 'pages/dashboard/';
import { authenticatedSession } from '@/test-utils/session';
import { SessionProvider } from 'next-auth/react';

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

    it('allows you to add an expense', async () => {
      expect(screen.getByText(/add expense/i)).toBeInTheDocument();
    });
  });
});
