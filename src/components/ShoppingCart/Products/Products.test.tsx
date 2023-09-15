import { render, screen } from '@testing-library/react';
import { useMediaQuery } from '@mui/material';
import Products from './Products';
import { cart } from '../mock';

const setProductQuantity = jest.fn();
const removeProduct = jest.fn();
const currency = 'EUR';
const language = 'en-US';

jest.mock('@mui/material', () => ({
  __esModule: true,
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}));

describe('Products', () => {
  test('table renders correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    render(
      <Products
        cart={cart}
        currency={currency}
        language={language}
        setProductQuantity={setProductQuantity}
        removeProduct={removeProduct}
      />
    );
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const cardList = screen.queryByTestId('product-card-list');
    expect(cardList).not.toBeInTheDocument();
  });

  test('cards renders correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    render(
      <Products
        cart={cart}
        currency={currency}
        language={language}
        setProductQuantity={setProductQuantity}
        removeProduct={removeProduct}
      />
    );
    const cardList = screen.getByTestId('product-card-list');
    expect(cardList).toBeInTheDocument();

    const table = screen.queryByRole('table');
    expect(table).not.toBeInTheDocument();
  });
});
