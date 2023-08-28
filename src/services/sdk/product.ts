import { getAppApiRoot } from 'services/sdk/client';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Product } from 'types/types';

const getCost = (product: ProductProjection): number | undefined => {
  return product.masterVariant.prices?.length
    ? product.masterVariant.prices[0].value.centAmount / 10 ** product.masterVariant.prices[0].value.fractionDigits
    : undefined;
};

const getDiscountCost = (product: ProductProjection): number | undefined => {
  return product.masterVariant.prices?.[0]?.discounted
    ? product.masterVariant.prices[0].discounted.value.centAmount /
        10 ** product.masterVariant.prices[0].discounted.value.fractionDigits
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
    discountedCost: getDiscountCost(product),
    currency: getCurrency(product),
    images: product.masterVariant.images,
    attributes: product.masterVariant.attributes,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const searchProducts = async (
  searchParameter: string,
  searchQuery: string,
  sortingField: string,
  sortingDirection: string
) => {
  const response = await getAppApiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        [searchParameter]: searchQuery,
        fuzzy: true,
        sort: `${sortingField} ${sortingDirection}`,
      },
    })
    .execute();

  return response.body.results.map((product) => adapt(product));
};
