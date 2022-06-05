import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockCategory } from '@/test-utils/category';
import customRender from '@/test-utils/customRender';
import CategoryColorSelect from '../CategoryColorSelect';
import categoriesSelectColors from '@/data/categoriesSelectColors';

const colors = [];

describe('CategoryColorSelect', () => {
  describe('with no category', () => {
    beforeEach(async () => {
      customRender(
        <CategoryColorSelect
          colors={categoriesSelectColors}
          onChange={jest.fn()}
          category={null}
        />
      );
    });

    it('renders select', async () => {
      expect(screen.getByText(/color/i)).toBeInTheDocument();
    });

    it('renders colors and defaults to blue', async () => {
      const colorSelect = screen.getByLabelText(/color/i);

      userEvent.click(colorSelect);

      await waitFor(() => {
        expect(screen.getAllByText(/blue/i)).toHaveLength(2);
        expect(screen.getByText(/cyan/i)).toBeInTheDocument();
        expect(screen.getByText(/green/i)).toBeInTheDocument();
        expect(screen.getByText(/orange/i)).toBeInTheDocument();
        expect(screen.getByText(/pink/i)).toBeInTheDocument();
        expect(screen.getByText(/purple/i)).toBeInTheDocument();
        expect(screen.getByText(/red/i)).toBeInTheDocument();
        expect(screen.getByText(/teal/i)).toBeInTheDocument();
      });

      userEvent.click(colorSelect);
      userEvent.click(screen.getByText(/cyan/i));

      await waitFor(() => {
        expect(screen.getByTestId('selected-color').textContent).toBe('cyan');
      });
    });
  });

  describe('with category', () => {
    beforeEach(async () => {
      customRender(
        <CategoryColorSelect
          colors={categoriesSelectColors}
          onChange={jest.fn()}
          category={mockCategory}
        />
      );
    });

    it('renders select', async () => {
      expect(screen.getByText(/color/i)).toBeInTheDocument();
    });

    it('renders colors and defaults to cagtegory value', async () => {
      expect(screen.getByTestId('selected-color').textContent).toBe('green');
    });
  });
});
