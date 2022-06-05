import { screen, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import { authenticatedSession } from '@/test-utils/session';
import customRender from '@/test-utils/customRender';
import DashboardShell from './DashboardShell';

describe('Categories', () => {
  describe('when user is authenticated', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <DashboardShell>
            <div>test</div>
          </DashboardShell>
        </SessionProvider>
      );
    });

    it('renders children', () => {
      expect(screen.getByText(/test/i)).toBeInTheDocument();
    });

    it('renders the sidebar', () => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      expect(screen.getByText(/categories/i)).toBeInTheDocument();
      expect(screen.getByText(/history/i)).toBeInTheDocument();
      expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    });
  });
});
