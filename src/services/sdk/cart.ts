import { DEFAULT_CURRENCY } from 'constants/const';
import { getCustomerApiRoot } from 'services/sdk/client';
import { Cart, MyCartDraft, MyCartUpdate } from '@commercetools/platform-sdk';

const createCartDraft = (): MyCartDraft => {
  return {
    currency: DEFAULT_CURRENCY,
  };
};

const createCart = async (): Promise<Cart> => {
  const apiRoot = await getCustomerApiRoot();
  const response = await apiRoot.me().carts().post({ body: createCartDraft() }).execute();
  return response.body;
};

export const getActiveCart = async (): Promise<Cart> => {
  const apiRoot = await getCustomerApiRoot();
  let activeCart: Cart;

  try {
    const response = await apiRoot.me().activeCart().get().execute();
    activeCart = response.body;
  } catch {
    activeCart = await createCart();
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

export const addToCart = async (productId: string) => {
  const apiRoot = await getCustomerApiRoot();
  const activeCart = await getActiveCart();

  const response = await apiRoot
    .me()
    .carts()
    .withId({ ID: activeCart.id })
    .post({ body: createCartAddProductUpdate(activeCart.version, productId) })
    .execute();

  return response.body;
};
