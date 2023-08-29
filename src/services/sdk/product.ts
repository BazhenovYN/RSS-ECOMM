import { getAppApiRoot } from 'services/sdk/client';
import { ProductProjection } from '@commercetools/platform-sdk';
import { AttributesList, Product, SearchParams } from 'types/types';

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
export const searchProducts = async (searchParams: SearchParams): Promise<Product[]> => {
  const {
    selectedAttributes = searchParams.selectedAttributes || {},
    searchTextParameter,
    searchQuery,
    categoryId,
    sortingField,
    sortingDirection,
  } = searchParams;
  const filterStrings = Object.keys(selectedAttributes).map((attributeName) => {
    const filterAttributeName = `variants.attributes.${attributeName}`;
    const filterAttributeValue = selectedAttributes[attributeName];
    return `${filterAttributeName}:"${filterAttributeValue}"`;
  });

  if (categoryId) {
    filterStrings.push(`categories.id:subtree("${categoryId}")`);
  }

  const response = await getAppApiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        [searchTextParameter]: searchQuery,
        fuzzy: true,
        sort: `${sortingField} ${sortingDirection}`,
        filter: filterStrings,
      },
    })
    .execute();

  return response.body.results.map((product) => adapt(product));
};

export const getAttributes = (products: Product[]): AttributesList => {
  const attributes: AttributesList = {};
  products.forEach((product) => {
    product.attributes?.forEach((productAttribute) => {
      if (!attributes[productAttribute.name]) attributes[productAttribute.name] = new Set();
      attributes[productAttribute.name].add(productAttribute.value);
    });
  });

  return attributes;
};
