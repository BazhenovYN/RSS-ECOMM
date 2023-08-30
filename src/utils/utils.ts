import { DEFAULT_LANGUAGE } from 'constants/const';
import postalCodes from 'constants/postalCodes';
import type { Product } from 'types/types';

export const isPostCodeValid = (postcode: string, country: string): boolean => {
  const regExp = postalCodes[country];
  return regExp ? regExp.test(postcode) : true;
};

export const getProductName = (product?: Product, language = DEFAULT_LANGUAGE): string => {
  if (!product) {
    return '';
  }
  return product.name[language];
};

export const getProductDescription = (product?: Product, language = DEFAULT_LANGUAGE): string => {
  if (!product) {
    return '';
  }
  return product.description ? product.description[language] : '';
};
