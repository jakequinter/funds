import { screen, waitForElementToBeRemoved } from '@testing-library/react';

import Categories from 'pages/dashboard/categories';
import customRender from '@/test-utils/customRender';

jest.mock('next-auth/react');

describe('Categories', () => {
  describe('when user is authenticated', () => {
    beforeEach(async () => {
      customRender(<Categories />);

      await waitForElementToBeRemoved(
        screen.getByText(/gathering your budget/i)
      );
    });

    it('renders categories page', () => {
      expect(
        screen.getByRole('heading', { name: 'Categories' })
      ).toBeInTheDocument();
    });
  });
});
