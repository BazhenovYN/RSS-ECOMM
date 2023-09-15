import { DEFAULT_LANGUAGE } from 'constants/const';
import { render, screen } from '@testing-library/react';
import AppContext from 'context';
import { cart } from './mock';
import ShoppingCart from './ShoppingCart';

describe('ShoppingCart', () => {
  test('renders correctly', async () => {
    render(
      <AppContext.Provider
        value={{
          cart,
          setCart: jest.fn,
          isAuth: false,
          setIsAuth: jest.fn,
          message: { text: null, severity: 'error' },
          setMessage: jest.fn,
          language: DEFAULT_LANGUAGE,
        }}>
        <ShoppingCart />
      </AppContext.Provider>
    );
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    const nameColumn = await screen.findByText('Name');
    expect(nameColumn).toBeInTheDocument();

    const imageColumn = await screen.findByText('Image');
    expect(imageColumn).toBeInTheDocument();

    const quantityColumn = await screen.findByText('Quantity');
    expect(quantityColumn).toBeInTheDocument();

    const priceColumn = await screen.findByText('Price, EUR');
    expect(priceColumn).toBeInTheDocument();

    const discountedColumn = await screen.findByText('Discounted, EUR');
    expect(discountedColumn).toBeInTheDocument();

    const totalColumn = await screen.findByText('Total, EUR');
    expect(totalColumn).toBeInTheDocument();

    const clearButton = await screen.findByRole('button', { name: 'Clear Shopping Cart' });
    expect(clearButton).toBeInTheDocument();

    const product = await screen.findByText('Orange');
    expect(product).toBeInTheDocument();
  });
});
