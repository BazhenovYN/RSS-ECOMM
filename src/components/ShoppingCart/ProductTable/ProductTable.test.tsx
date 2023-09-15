import { render, screen } from '@testing-library/react';
import ProductTable from './ProductTable';
import { cart } from '../mock';

const setProductQuantity = jest.fn();
const removeProduct = jest.fn();
const currency = 'EUR';
const language = 'en-US';

describe('ProductTable', () => {
  test('renders correctly', async () => {
    render(
      <ProductTable
        cart={cart}
        currency={currency}
        language={language}
        setProductQuantity={setProductQuantity}
        removeProduct={removeProduct}
      />
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
  });
});
