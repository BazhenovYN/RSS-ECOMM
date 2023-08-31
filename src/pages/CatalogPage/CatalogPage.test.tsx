import { render, screen } from '@testing-library/react';
import CatalogPage from 'pages/CatalogPage';
import { CategoriesList } from 'types/types';
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
  });
});
