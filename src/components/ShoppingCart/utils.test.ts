import { EMPTY_DISCOUNT } from 'constants/const';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { getDiscountID, getDiscountedValue, getMoneyValue } from './utils';

describe('util getMoneyValue is correct', () => {
  const testData = [
    { price: { centAmount: 10, fractionDigits: 1 }, expected: '1.0' },
    { price: { centAmount: 15, fractionDigits: 1 }, expected: '1.5' },
    { price: { centAmount: 15, fractionDigits: 2 }, expected: '0.15' },
    { price: { centAmount: 105, fractionDigits: 2 }, expected: '1.05' },
    { price: { centAmount: 190, fractionDigits: 2 }, expected: '1.90' },
    { price: { centAmount: 123, fractionDigits: 2 }, expected: '1.23' },
    { price: { centAmount: 123, fractionDigits: 3 }, expected: '0.123' },
    { price: { centAmount: 12345, fractionDigits: 3 }, expected: '12.345' },
  ];
  testData.forEach((data) => {
    test(`test: ${data.expected}`, () => {
      expect(getMoneyValue(data.price)).toEqual(data.expected);
    });
  });
});

describe('util getDiscountID is correct', () => {
  const testData = [
    { cart: { discountCodes: [] }, expected: null },
    {
      cart: { discountCodes: [{ discountCode: { id: 'id1' } }] },
      expected: 'id1',
    },
    {
      cart: { discountCodes: [{ discountCode: { id: 'id123' } }] },
      expected: 'id123',
    },
  ];
  testData.forEach((data) => {
    test(`test: ${data.expected}`, () => {
      expect(getDiscountID(data.cart as Cart)).toEqual(data.expected);
    });
  });
});

type DiscountedItem = Pick<LineItem, 'discountedPricePerQuantity' | 'price'>;

describe('util getDiscountedValue is correct', () => {
  const testData: { item: DiscountedItem; expected: string }[] = [
    {
      item: {
        discountedPricePerQuantity: [],
        price: {
          id: 'price-id',
          value: {
            type: 'centPrecision',
            centAmount: 1000,
            currencyCode: 'EUR',
            fractionDigits: 2,
          },
        },
      },
      expected: EMPTY_DISCOUNT,
    },
    {
      item: {
        discountedPricePerQuantity: [],
        price: {
          id: 'price-id',
          value: {
            type: 'centPrecision',
            centAmount: 1000,
            currencyCode: 'EUR',
            fractionDigits: 2,
          },
          discounted: {
            value: {
              type: 'centPrecision',
              centAmount: 100,
              currencyCode: 'EUR',
              fractionDigits: 2,
            },
            discount: {
              typeId: 'product-discount',
              id: 'product-discount-id',
            },
          },
        },
      },
      expected: '1.00',
    },
    {
      item: {
        discountedPricePerQuantity: [
          {
            quantity: 1,
            discountedPrice: {
              value: {
                type: 'centPrecision',
                centAmount: 200,
                currencyCode: 'EUR',
                fractionDigits: 2,
              },
              includedDiscounts: [],
            },
          },
        ],
        price: {
          id: 'price-id',
          value: {
            type: 'centPrecision',
            centAmount: 1000,
            currencyCode: 'EUR',
            fractionDigits: 2,
          },
        },
      },
      expected: '2.00',
    },
  ];
  testData.forEach((data) => {
    test(`test: ${data.expected}`, () => {
      expect(getDiscountedValue(data.item)).toEqual(data.expected);
    });
  });
});
