import { render, screen } from '@testing-library/react';
import ShoppingCart from './ShoppingCart';

jest.mock('services/sdk/cart', () => ({
  __esModule: true,
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

    const product = await screen.findByText('product1');
    expect(product).toBeInTheDocument();
  });
});
