import { EMPTY_DISCOUNT } from 'constants/const';
import type { Cart, LineItem, TypedMoney } from '@commercetools/platform-sdk';

export const getMoneyValue = (price: Pick<TypedMoney, 'centAmount' | 'fractionDigits'>) => {
  return (price.centAmount / 10 ** price.fractionDigits).toFixed(price.fractionDigits);
};

export const getDiscountedValue = (item: Pick<LineItem, 'discountedPricePerQuantity' | 'price'>): string => {
  if (item.discountedPricePerQuantity && item.discountedPricePerQuantity.length > 0) {
    const price = item.discountedPricePerQuantity[0].discountedPrice.value;
    return getMoneyValue(price);
  }
  if (item.price.discounted) {
    const price = item.price.discounted.value;
    return getMoneyValue(price);
  }
  return EMPTY_DISCOUNT;
};

export const getDiscountID = (cart: Pick<Cart, 'discountCodes'>) => {
  if (cart.discountCodes.length > 0) {
    return cart.discountCodes[0].discountCode.id;
  }
  return null;
};

export const getTotalPriceWithoutDiscount = (cart: Pick<Cart, 'lineItems' | 'totalPrice'>) => {
  const fullPrice = cart.lineItems.reduce((acc, item) => {
    const price = item.price.value;
    return acc + (item.quantity * price.centAmount) / 10 ** price.fractionDigits;
  }, 0);
  if (fullPrice > 0) {
    return fullPrice.toFixed(cart.totalPrice.fractionDigits);
  }
  return null;
};
