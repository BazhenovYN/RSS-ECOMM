import { DEFAULT_CURRENCY } from 'constants/const';
import { getAnonymousApiRoot, getCustomerApiRoot } from 'services/sdk/client';
import { Cart, MyCartDraft, MyCartUpdate } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const createCartDraft = (): MyCartDraft => {
  return {
    currency: DEFAULT_CURRENCY,
  };
};

const createCart = async (getRoot: () => ByProjectKeyRequestBuilder): Promise<Cart> => {
  const response = await getRoot().me().carts().post({ body: createCartDraft() }).execute();
  return response.body;
};

export const getActiveCart = async (getRoot: () => ByProjectKeyRequestBuilder): Promise<Cart> => {
  let activeCart: Cart;

  try {
    const response = await getRoot().me().activeCart().get().execute();
    activeCart = response.body;
  } catch {
    activeCart = await createCart(getRoot);
  }

  return activeCart;
};

const createCartAddProductUpdate = (version: number, productId: string): MyCartUpdate => {
  return {
    version,
    actions: [
      {
        action: 'addLineItem',
        productId,
      },
    ],
  };
};

const addToCart = async (getRoot: () => ByProjectKeyRequestBuilder, productId: string) => {
  const activeCart = await getActiveCart(getRoot);

  const response = await getRoot()
    .me()
    .carts()
    .withId({ ID: activeCart.id })
    .post({ body: createCartAddProductUpdate(activeCart.version, productId) })
    .execute();

  return response.body;
};

export const addToCustomerCart = async (productId: string) => {
  return addToCart(getCustomerApiRoot, productId);
};

export const addToAnonymousCart = async (productId: string) => {
  return addToCart(getAnonymousApiRoot, productId);
};
