import { render, screen } from '@testing-library/react';
import type { Product } from 'types/types';
import PriceField from './PriceField';

const productWithoutDiscount: Product = {
  id: 'test1',
  name: { 'en-US': 'Product1' },
  description: { 'en-US': 'Test product1' },
  price: 10,
  hasDiscount: false,
  salePrice: 10,
  currency: 'EUR',
  images: [],
  attributes: [],
};

const productWithDiscount: Product = {
  id: 'test2',
  name: { 'en-US': 'Product2' },
  description: { 'en-US': 'Test product2' },
  price: 10,
  hasDiscount: true,
  salePrice: 8,
  currency: 'EUR',
  images: [],
  attributes: [],
};

describe('PriceField', () => {
  test('renders correctly without discount', () => {
    render(<PriceField product={productWithoutDiscount} />);
    const price = screen.getByText(new RegExp(`${productWithoutDiscount.price.toFixed(2)}`));
    expect(price).toBeInTheDocument();
    const currency = screen.getByText(new RegExp(`${productWithoutDiscount.currency}`));
    expect(currency).toBeInTheDocument();
  });

  test('renders correctly with discount', () => {
    render(<PriceField product={productWithDiscount} />);
    const price = screen.getByText(new RegExp(`${productWithDiscount.price.toFixed(2)}`));
    expect(price).toBeInTheDocument();
    const salePrice = screen.getByText(new RegExp(`${productWithDiscount.salePrice.toFixed(2)}`));
    expect(salePrice).toBeInTheDocument();
    const currencyFields = screen.getAllByText(new RegExp(`${productWithDiscount.currency}`));
    expect(currencyFields[0]).toBeInTheDocument(); // price currency
    expect(currencyFields[1]).toBeInTheDocument(); // sale currency
  });
});
