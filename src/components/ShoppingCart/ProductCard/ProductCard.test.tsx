import { render, screen } from '@testing-library/react';
import { LineItem } from '@commercetools/platform-sdk';
import ProductCard from './ProductCard';

const currency = 'EUR';
const language = 'en-US';
const item: LineItem = {
  id: '33de13d2-adf3-4c5a-bce6-1c92a4b80b00',
  productId: '38323c95-5651-414e-a561-ff0b65f8166b',
  name: {
    'en-US': 'Orange',
  },
  productType: {
    typeId: 'product-type',
    id: 'eee6b34a-9592-4c9b-b74d-a599e63c16fc',
  },
  variant: {
    id: 1,
    prices: [
      {
        id: 'c3fe8fe6-ec71-4d02-a9f2-0488f8946249',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 700,
          fractionDigits: 2,
        },
      },
    ],
    images: [
      {
        url: 'https://example.com/1.jpg',
        dimensions: {
          w: 1500,
          h: 994,
        },
      },
      {
        url: 'https://example.com/2.jpg',
        dimensions: {
          w: 1500,
          h: 1001,
        },
      },
      {
        url: 'https://example.com/3.jpg',
        dimensions: {
          w: 1500,
          h: 1000,
        },
      },
    ],
  },
  price: {
    id: 'c3fe8fe6-ec71-4d02-a9f2-0488f8946249',
    value: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 700,
      fractionDigits: 2,
    },
  },
  quantity: 2,
  discountedPricePerQuantity: [],
  perMethodTaxRate: [],
  state: [
    {
      quantity: 2,
      state: {
        typeId: 'state',
        id: '2987ae3a-a454-430a-83af-2d989b63aa07',
      },
    },
  ],
  priceMode: 'Platform',
  lineItemMode: 'Standard',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 1400,
    fractionDigits: 2,
  },
  taxedPricePortions: [],
};
const setProductQuantity = jest.fn();
const removeProduct = jest.fn();

describe('ProductCard', () => {
  test('renders correctly', () => {
    render(
      <ProductCard
        item={item}
        currency={currency}
        language={language}
        setProductQuantity={setProductQuantity}
        removeProduct={removeProduct}
      />
    );
    const card = screen.getByTestId('product-card');
    expect(card).toBeInTheDocument();
  });
});
