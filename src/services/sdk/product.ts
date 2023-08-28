import { ProductProjection } from '@commercetools/platform-sdk';
import { getAppApiRoot } from 'services/sdk/client';
import type { Product } from 'types/types';

interface ISellingPrice {
  price: number;
  salePrice: number;
  hasDiscount: boolean;
  currency: string;
}

const EMPTY_PRICE: ISellingPrice = {
  price: 0,
  salePrice: 0,
  hasDiscount: false,
  currency: '',
};

const getSellingPrice = (product: ProductProjection): ISellingPrice => {
  if (!product.masterVariant.prices || product.masterVariant.prices.length === 0) {
    return EMPTY_PRICE;
  }

  const currentPrice = product.masterVariant.prices[0];
  const price = currentPrice.value.centAmount / 10 ** currentPrice.value.fractionDigits;
  const currency = currentPrice.value.currencyCode;

  const discountedPrice = currentPrice.discounted;
  if (!discountedPrice) {
    return { price, currency, hasDiscount: false, salePrice: price };
  }
  const salePrice = discountedPrice.value.centAmount / 10 ** discountedPrice.value.fractionDigits;

  return { price, currency, hasDiscount: true, salePrice };
};

const getProductData = (product: ProductProjection): Product => {
  const sellingPrice = getSellingPrice(product);
  return {
    id: product.id,
    key: product.key ?? '',
    name: product.name,
    description: product.description,
    price: sellingPrice.price,
    hasDiscount: sellingPrice.hasDiscount,
    salePrice: sellingPrice.salePrice,
    currency: sellingPrice.currency,
    images: product.masterVariant.images ?? [],
    attributes: product.masterVariant.attributes ?? [],
  };
};

export const getProductDetails = async (ID: string): Promise<Product> => {
  const response = await getAppApiRoot().productProjections().withId({ ID }).get().execute();
  return getProductData(response.body);
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await getAppApiRoot().productProjections().get().execute();
  return response.body.results.map((product) => getProductData(product));
};
