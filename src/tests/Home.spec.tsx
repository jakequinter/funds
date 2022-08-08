import { screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import customRender from '@/test-utils/customRender';
import Home from 'pages/index';

jest.mock('firebase/app', () => {
  return {
    auth: jest.fn(),
  };
});

describe('Home', () => {
  describe('when user is authenticated', () => {
    beforeEach(async () => {
      customRender(<Home />);
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
      customRender(<Home />);
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
