import { render, screen, waitFor } from '@testing-library/react';
import ProductPage from './ProductPage';

jest.mock('services/sdk/product', () => ({
  __esModule: true,
  fetchProductDetails: () =>
    Promise.resolve({
      id: '1',
      key: 'test1',
      name: 'Product1',
      description: 'Description',
      price: 10,
      hasDiscount: false,
      salePrice: 10,
      currency: 'EUR',
      images: [],
      attributes: [],
    }),
}));

jest.mock('react-router-dom', () => ({
  useParams: () => ({ productId: '1' }),
}));

describe('ProductPage', () => {
  test('render correctly', async () => {
    render(<ProductPage />);
    await waitFor(() => {
      const name = screen.getByText('Product1');
      expect(name).toBeInTheDocument();
    });
    await waitFor(() => {
      const description = screen.getByText('Description');
      expect(description).toBeInTheDocument();
    });
  });
});
