import { DEFAULT_CURRENCY } from 'constants/const';
import { getAnonymousApiRoot, getCustomerApiRoot } from 'services/sdk/client';
import { Cart, MyCartDraft, MyCartUpdate, MyCartUpdateAction } from '@commercetools/platform-sdk';

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

const createCartAddProductUpdate = (version: number, productId: string, quantity: number): MyCartUpdate => {
  return {
    version,
    actions: [
      {
        action: 'addLineItem',
        productId,
        quantity,
      },
    ],
  };
};

export const addToCart = async (productId: string, isAuth: boolean = false, count: number = 1): Promise<Cart> => {
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  const activeCart = await getActiveCart(isAuth);

  const response = await getRoot()
    .me()
    .carts()
    .withId({ ID: activeCart.id })
    .post({ body: createCartAddProductUpdate(activeCart.version, productId, count) })
    .execute();

  return response.body;
};

const updateCart = async (cart: Cart, actions: MyCartUpdateAction[], isAuth: boolean) => {
  const body: MyCartUpdate = {
    version: cart.version,
    actions,
  };
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  const response = await getRoot().me().carts().withId({ ID: cart.id }).post({ body }).execute();
  return response.body;
};

export const removeLineItem = async (cart: Cart, lineItemId: string, isAuth: boolean = false) => {
  const actions: MyCartUpdateAction[] = [
    {
      action: 'removeLineItem',
      lineItemId,
    },
  ];
  return updateCart(cart, actions, isAuth);
};
