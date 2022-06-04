import { screen, waitForElementToBeRemoved } from '@testing-library/react';

import Categories from 'pages/dashboard/categories';
import customRender from '@/test-utils/customRender';

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

    it('allows you to open category modal', () => {
      expect(screen.getByText(/add category/i)).toBeInTheDocument();
    });
  });
});
