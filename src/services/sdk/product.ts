import { getAppApiRoot } from 'services/sdk/client';
import { ProductProjection } from '@commercetools/platform-sdk';
import { AttributesList, Product, SearchData, SearchParams } from 'types/types';

interface ISellingPrice {
  price?: number;
  salePrice?: number;
  currency?: string;
}

const getSellingPrice = (product: ProductProjection): ISellingPrice => {
  if (!product.masterVariant.prices || product.masterVariant.prices.length === 0) {
    return {};
  }

  const currentPrice = product.masterVariant.prices[0];
  const price = currentPrice.value.centAmount / 10 ** currentPrice.value.fractionDigits;
  const currency = currentPrice.value.currencyCode;

  const discountedPrice = currentPrice.discounted;
  if (!discountedPrice) {
    return { price, currency };
  }
  const salePrice = discountedPrice.value.centAmount / 10 ** discountedPrice.value.fractionDigits;

  return { price, currency, salePrice };
};

const getProductData = (product: ProductProjection): Product => {
  const sellingPrice = getSellingPrice(product);
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: sellingPrice.price,
    salePrice: sellingPrice.salePrice,
    currency: sellingPrice.currency,
    images: product.masterVariant.images,
    attributes: product.masterVariant.attributes,
  };
};

export const getProductDetails = async (ID: string | undefined): Promise<Product> => {
  if (!ID) {
    throw Error('Product ID is not defined');
  }
  const response = await getAppApiRoot().productProjections().withId({ ID }).get().execute();
  return getProductData(response.body);
};

export const searchProducts = async (searchParams: SearchParams): Promise<SearchData> => {
  const {
    selectedAttributes = searchParams.selectedAttributes || {},
    searchTextParameter,
    searchQuery,
    categoryId,
    sortingField,
    sortingDirection,
    limit,
    offset,
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
        limit,
        offset,
      },
    })
    .execute();

  return {
    products: response.body.results.map((product) => getProductData(product)),
    total: response.body.total || 0,
  };
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
