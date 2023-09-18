import { render, screen } from '@testing-library/react';
import CatalogProductItem from 'components/CatalogProductItem';
import logo from 'assets/img/logo.png';
import { Product } from 'types/types';
import { BrowserRouter } from 'react-router-dom';

const product: Product = {
  id: 'test-id',
  name: {
    'en-US': 'Product name',
    ru: 'Имя продукта',
  },
  description: {
    'en-US': 'Product description',
    ru: 'Описание продукта',
  },
  images: [
    {
      url: 'test-img-url',
      dimensions: { w: 1, h: 1 },
    },
  ],
};

describe('CatalogProductItem', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <CatalogProductItem product={product} setWaitForCartUpdate={jest.fn} />
      </BrowserRouter>
    );

    const productName = screen.getByText('Product name');
    expect(productName).toBeInTheDocument();

    const productDescription = screen.getByText('Product description');
    expect(productDescription).toBeInTheDocument();

    const productImg = screen.getByRole('img');
    expect(productImg).toHaveAttribute('src', 'test-img-url');
  });

  test('renders correctly without img', () => {
    render(
      <BrowserRouter>
        <CatalogProductItem
          product={{
            ...product,
            images: undefined,
          }}
          setWaitForCartUpdate={jest.fn}
        />
      </BrowserRouter>
    );

    const productImg = screen.getByRole('img');
    expect(productImg).toHaveAttribute('src', logo);
  });
});
