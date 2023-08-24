import { LOCALE } from 'constants/const';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getAppApiRoot, projectKey } from 'services/sdk/client';
import type { Product } from 'types/types';

const getCost = (product: ProductProjection) => {
  if (product.masterVariant.prices?.length) {
    return (
      product.masterVariant.prices[0].value.centAmount / 10 ** product.masterVariant.prices[0].value.fractionDigits
    );
  }
  return 0;
};

const getCurrency = (product: ProductProjection) => {
  if (product.masterVariant.prices?.length) {
    return product.masterVariant.prices[0].value.currencyCode;
  }
  return '';
};

const adapt = (product: ProductProjection): Product => {
  return {
    id: product.id,
    key: product.key ?? '',
    name: product.name[LOCALE],
    description: product.description ? product.description[LOCALE] : '',
    cost: getCost(product),
    currency: getCurrency(product),
    images: product.masterVariant.images ?? [],
    attributes: product.masterVariant.attributes ?? [],
  };
};

export const getProductDetails = async (ID: string): Promise<Product> => {
  const response = await getAppApiRoot()
    .withProjectKey({ projectKey })
    .productProjections()
    .withId({ ID })
    .get()
    .execute();
  return adapt(response.body);
};

export default getProductDetails;
