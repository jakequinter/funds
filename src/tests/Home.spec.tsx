import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import { authenticatedSession } from '@/test-utils/session';
import { InstanceContextProvider } from '@/hooks/InstanceContext';
import { MySwrConfig } from '@/lib/SWRConfig';
import Home from 'pages/index';

describe('Home', () => {
  describe('when user is authenticated', () => {
    beforeEach(async () => {
      render(
        <SessionProvider session={authenticatedSession}>
          <MySwrConfig>
            <InstanceContextProvider>
              <Home />
            </InstanceContextProvider>
          </MySwrConfig>
        </SessionProvider>
      );
    });

    it('renders home page', () => {
      expect(screen.getByText(/funds/i)).toBeInTheDocument();
    });

    it('shows authorized state', () => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
  });

  describe('when user is unauthenticated', () => {
    beforeEach(async () => {
      render(
        <SessionProvider session={null}>
          <MySwrConfig>
            <InstanceContextProvider>
              <Home />
            </InstanceContextProvider>
          </MySwrConfig>
        </SessionProvider>
      );
    });

    it('renders home page', () => {
      expect(screen.getByText(/funds/i)).toBeInTheDocument();
    });

    it('shows authorized state', () => {
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
      expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    });
  });
});
