import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import { authenticatedSession } from '@/test-utils/session';
import { InstanceContextProvider } from '@/hooks/InstanceContext';
import { MySwrConfig } from '@/lib/SWRConfig';
import Dashboard from 'pages/dashboard/';

describe('Dashboard', () => {
  describe('when user is authenticated', () => {
    beforeEach(async () => {
      render(
        <SessionProvider session={authenticatedSession}>
          <MySwrConfig>
            <InstanceContextProvider>
              <Dashboard />
            </InstanceContextProvider>
          </MySwrConfig>
        </SessionProvider>
      );

      await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
    });

    describe('with an instance that has categories', () => {
      it('renders Dashboard page with user name', () => {
        expect(screen.getByText(/welcome, jake!/i)).toBeInTheDocument();
      });

      it('shows add expense button', () => {
        expect(screen.getByText(/add expense/i)).toBeInTheDocument();
      });
    });
  });
});
