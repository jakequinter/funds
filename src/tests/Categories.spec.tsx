import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import {
  authenticatedSession,
  unauthenticatdSession,
} from '@/test-utils/session';
import Categories from 'pages/dashboard/categories';

jest.mock('next-auth/react');

describe('Categories', () => {
  it('renders home page', () => {
    (useSession as jest.Mock).mockReturnValueOnce(authenticatedSession);

    render(<Categories />);

    expect(
      screen.getByRole('heading', { name: 'Categories' })
    ).toBeInTheDocument();
  });
});
