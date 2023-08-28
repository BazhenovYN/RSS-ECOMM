import { getAppApiRoot } from 'services/sdk/client';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Product } from 'types/types';

const getCost = (product: ProductProjection): number | undefined => {
  return product.masterVariant.prices?.length
    ? product.masterVariant.prices[0].value.centAmount / 10 ** product.masterVariant.prices[0].value.fractionDigits
    : undefined;
};

const getCurrency = (product: ProductProjection): string | undefined => {
  return product.masterVariant.prices?.length ? product.masterVariant.prices[0].value.currencyCode : undefined;
};

const adapt = (product: ProductProjection): Product => {
  return {
    id: product.id,
    key: product.key,
    name: product.name,
    description: product.description,
    cost: getCost(product),
    currency: getCurrency(product),
    images: product.masterVariant.images,
    attributes: product.masterVariant.attributes,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const getProducts = async (): Promise<Product[]> => {
  const response = await getAppApiRoot().productProjections().get().execute();
  return response.body.results.map((product) => adapt(product));
};
