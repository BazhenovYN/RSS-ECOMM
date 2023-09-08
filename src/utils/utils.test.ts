import { hasItemInCart, isPostCodeValid } from './utils';

describe('util isPostCodeValid is correct', () => {
  const testData = [
    { postalCode: '111111', expected: true },
    { postalCode: '123456', expected: true },
    { postalCode: '000000', expected: true },
    { postalCode: '1', expected: false },
    { postalCode: '123', expected: false },
    { postalCode: '12345678901234567890', expected: false },
    { postalCode: '12345q', expected: false },
    { postalCode: 'q12345', expected: false },
    { postalCode: 'qwerty', expected: false },
    { postalCode: '123#11', expected: false },
  ];
  testData.forEach((data) => {
    test(`test: ${data.postalCode}`, () => {
      expect(isPostCodeValid(data.postalCode, 'RU')).toEqual(data.expected);
    });
  });
});

describe('util hasItemInCart is correct', () => {
  const cartItems = [{ productId: 'test-product-id' }];

  test('correct if product in cart', () => {
    expect(hasItemInCart(cartItems, 'test-product-id')).toEqual(true);
  });

  test('correct if product not in cart', () => {
    expect(hasItemInCart(cartItems, 'test-product-id-02')).toEqual(false);
  });
});
