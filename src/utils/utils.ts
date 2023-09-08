import { DEFAULT_LANGUAGE } from 'constants/const';
import postalCodes from 'constants/postalCodes';
import type { Product } from 'types/types';
import { LineItem } from '@commercetools/platform-sdk';

export const isPostCodeValid = (postcode: string, country: string): boolean => {
  const regExp = postalCodes[country];
  return regExp ? regExp.test(postcode) : true;
};

export const getProductName = (product?: Product, language = DEFAULT_LANGUAGE): string => {
  if (!product) {
    return '';
  }
  return product.name[language] || product.name[DEFAULT_LANGUAGE];
};

export const getProductDescription = (product?: Product, language = DEFAULT_LANGUAGE): string => {
  if (!product) {
    return '';
  }
  return product.description?.[language] ? product.description[language] : '';
};

export const hasItemInCart = (cartItems: Pick<LineItem, 'productId'>[], productId: string) => {
  return cartItems.some((currentCartItem) => currentCartItem.productId === productId);
};
