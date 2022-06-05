import { screen, waitFor } from '@testing-library/react';

import { authenticatedSession } from '@/test-utils/session';
import { SessionProvider } from 'next-auth/react';
import customRender from '@/test-utils/customRender';
import EmptyState from '../EmptyState';

describe('EmptyState', () => {
  describe('with no instance', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <EmptyState hasInstance={false} />
        </SessionProvider>
      );
    });

    it('propmts users to start a month', async () => {
      expect(screen.getByText(/welcome to funds/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /you currently don't have a budget started for this month./i
        )
      ).toBeInTheDocument();
    });

    it('can create a new month (instance)', async () => {
      expect(
        screen.getByRole('button', { name: /start new month/i })
      ).toBeInTheDocument();
    });
  });

  describe('with no instance', () => {
    beforeEach(async () => {
      customRender(
        <SessionProvider session={authenticatedSession}>
          <EmptyState hasInstance />
        </SessionProvider>
      );
    });

    it('propmts users to add categories', async () => {
      expect(screen.getByText(/let's get started/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /to get started, navigate to the categories tab to add your first category./i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/go to categories/i)).toBeInTheDocument();
    });
  });
});
