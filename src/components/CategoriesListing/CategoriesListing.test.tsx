import { DEFAULT_LANGUAGE } from 'constants/const';
import { render, screen } from '@testing-library/react';
import CategoriesListing from 'components/CategoriesListing';
import { CategoriesList } from 'types/types';
import { BrowserRouter } from 'react-router-dom';

const categories: CategoriesList = {
  mains: [
    {
      name: { [DEFAULT_LANGUAGE]: 'category-1' },
      id: 'test-id-1',
    },
  ],
  subs: [
    {
      name: { [DEFAULT_LANGUAGE]: 'category-2' },
      id: 'test-id-2',
      parent: {
        id: 'test-id-1',
        typeId: 'category',
      },
    },
  ],
};

describe('CategoriesSorting', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <CategoriesListing language={DEFAULT_LANGUAGE} categories={categories} />
      </BrowserRouter>
    );

    const header = screen.getByText('Categories:');
    expect(header).toBeInTheDocument();

    const category = screen.getByText('category-1');
    expect(category).toBeInTheDocument();

    const subCategory = screen.getByText('category-2');
    expect(subCategory).toBeInTheDocument();
  });
});
