import { render, screen } from '@testing-library/react';
import ShoppingCart from './ShoppingCart';

jest.mock('services/sdk/cart', () => ({
  __esModule: true,
  ...jest.requireActual('services/sdk/cart'),
  getActiveCart: () =>
    Promise.resolve({
      id: 'test-id',
      version: 1,
      lineItems: [
        {
          id: 'test-id-1',
          name: { 'en-US': 'product1' },
          variant: {
            quantity: '2',
          },
          price: {
            value: {
              centAmount: 500,
              fractionDigits: 2,
            },
            discounted: {
              value: {
                centAmount: 500,
                fractionDigits: 2,
              },
            },
          },
          totalPrice: {
            centAmount: 1000,
            fractionDigits: 2,
          },
        },
      ],
      totalPrice: {
        centAmount: 1000,
        currencyCode: 'EUR',
        fractionDigits: 2,
      },
    }),
}));

describe('ShoppingCart', () => {
  test('renders correctly', async () => {
    render(<ShoppingCart />);
    const totalColumn = await screen.findByRole('heading', { level: 6 });
    expect(totalColumn).toBeInTheDocument();

    const clearButton = await screen.findByRole('button', { name: 'Clear Shopping Cart' });
    expect(clearButton).toBeInTheDocument();
  });
});
