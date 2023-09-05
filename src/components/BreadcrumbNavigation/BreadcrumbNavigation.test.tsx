import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { CategoriesList } from 'types/types';
import BreadcrumbNavigation from './BreadcrumbNavigation';

const categories: CategoriesList = {
  mains: [
    {
      id: 'main-1',
      name: { 'en-US': 'category1' },
    },
    {
      id: 'main-2',
      name: { 'en-US': 'category2' },
    },
  ],
  subs: [
    {
      id: 'sub-1-1',
      name: { 'en-US': 'subcategory-1-1' },
      parent: {
        typeId: 'category',
        id: 'main-1',
      },
    },
    {
      id: 'sub-1-2',
      name: { 'en-US': 'subcategory-1-2' },
      parent: {
        typeId: 'category',
        id: 'main-1',
      },
    },
  ],
};

describe('BreadcrumbNavigation', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <BreadcrumbNavigation categories={categories} categoryId="sub-1-1" language="en-US" />
      </MemoryRouter>
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  test('root link creates correctly', () => {
    render(
      <MemoryRouter>
        <BreadcrumbNavigation categories={categories} categoryId="sub-1-1" language="en-US" />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /all categories/i });
    expect(link).toBeInTheDocument();
  });

  test('parent link creates correctly', () => {
    render(
      <MemoryRouter>
        <BreadcrumbNavigation categories={categories} categoryId="sub-1-1" language="en-US" />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /category1/i });
    expect(link).toBeInTheDocument();
  });

  test('endpoint creates correctly', () => {
    render(
      <MemoryRouter>
        <BreadcrumbNavigation categories={categories} categoryId="sub-1-1" language="en-US" />
      </MemoryRouter>
    );
    const text = screen.getByText('subcategory-1-1');
    expect(text).toBeInTheDocument();
  });
});
