import { render, screen } from '@testing-library/react';
import CatalogPage from 'pages/CatalogPage';
import { AttributesList, CategoriesList, SearchData } from 'types/types';
import { BrowserRouter } from 'react-router-dom';

jest.mock('services/sdk/category', () => ({
  __esModule: true,
  getCategories: () =>
    Promise.resolve<CategoriesList>({
      mains: [
        {
          name: { 'en-US': 'Category1' },
          id: 'test-id-1',
        },
      ],
      subs: [],
    }),
}));

jest.mock('services/sdk/product', () => ({
  __esModule: true,
  searchProducts: () =>
    Promise.resolve<SearchData>({
      products: [
        {
          id: 'test-product-id-1',
          name: { 'en-US': 'Product1' },
        },
      ],
      total: 1,
    }),
  getAttributes: (): AttributesList => ({}),
}));

describe('CatalogPage', () => {
  test('renders correctly', async () => {
    render(
      <BrowserRouter>
        <CatalogPage />
      </BrowserRouter>
    );

    const header = screen.getByRole('heading', { name: 'Catalog' });
    expect(header).toBeInTheDocument();

    const search = screen.getByLabelText('Search');
    expect(search).toBeInTheDocument();

    const categoryName = await screen.findByText('Category1');
    expect(categoryName).toBeInTheDocument();

    const productName = await screen.findByText('Product1');
    expect(productName).toBeInTheDocument();
  });
});
