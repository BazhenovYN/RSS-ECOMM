import { DEFAULT_CURRENCY } from 'constants/const';
import { getAnonymousApiRoot, getCustomerApiRoot } from 'services/sdk/client';
import { Cart, MyCartDraft, MyCartUpdate } from '@commercetools/platform-sdk';

const createCartDraft = (): MyCartDraft => {
  return {
    currency: DEFAULT_CURRENCY,
  };
};

const createCart = async (isAuth: boolean = false): Promise<Cart> => {
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  const response = await getRoot().me().carts().post({ body: createCartDraft() }).execute();

  return response.body;
};

export const getActiveCart = async (isAuth: boolean = false): Promise<Cart> => {
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;

  try {
    const response = await getRoot().me().activeCart().get().execute();
    return response.body;
  } catch {
    return createCart(isAuth);
  }
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

export const addToCart = async (productId: string, isAuth: boolean = false): Promise<Cart> => {
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  const activeCart = await getActiveCart(isAuth);

  const response = await getRoot()
    .me()
    .carts()
    .withId({ ID: activeCart.id })
    .post({ body: createCartAddProductUpdate(activeCart.version, productId) })
    .execute();

  return response.body;
};
