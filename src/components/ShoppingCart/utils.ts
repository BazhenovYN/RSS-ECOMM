import { Cart, LineItem, TypedMoney } from '@commercetools/platform-sdk';

export const getMoneyValue = (price: TypedMoney) => {
  return (price.centAmount / 10 ** price.fractionDigits).toFixed(price.fractionDigits);
};

export const getDiscountedValue = (item: LineItem): string => {
  if (item.discountedPricePerQuantity && item.discountedPricePerQuantity.length > 0) {
    const price = item.discountedPricePerQuantity[0].discountedPrice.value;
    return getMoneyValue(price);
  }
  if (item.price.discounted) {
    const price = item.price.discounted.value;
    return getMoneyValue(price);
  }
  return '--';
};

export const getDiscountID = (cart: Pick<Cart, 'discountCodes'>) => {
  if (cart.discountCodes.length > 0) {
    return cart.discountCodes[0].discountCode.id;
  }
  return null;
};
