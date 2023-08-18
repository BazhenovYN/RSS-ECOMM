/* eslint-disable import/prefer-default-export */
import postalCodes from 'constants/postalCodes';

export const isPostCodeValid = (postcode: string, country: string): boolean => {
  const regExp = postalCodes[country];
  return regExp ? regExp.test(postcode) : true;
};
