import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import {
  authenticatedSession,
  unauthenticatdSession,
} from '@/test-utils/session';
import Home from 'pages/index';

jest.mock('next-auth/react');

describe('Home', () => {
  it('renders home page', () => {
    (useSession as jest.Mock).mockReturnValueOnce(unauthenticatdSession);

    render(<Home />);

    expect(screen.getByText(/tin/i)).toBeInTheDocument();
  });

  it('shows unauthorized state', () => {
    (useSession as jest.Mock).mockReturnValueOnce(unauthenticatdSession);

    render(<Home />);

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('shows authorized state', () => {
    (useSession as jest.Mock).mockReturnValueOnce(authenticatedSession);

    render(<Home />);

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
