import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

    it('allows you to open category modal', async () => {
      const addCategoryButton = screen.getByText(/add category/i);

      expect(addCategoryButton).toBeInTheDocument();
      userEvent.click(addCategoryButton);

      await waitFor(() => {
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/target/i)).toBeInTheDocument();
      });
    });
  });
});
