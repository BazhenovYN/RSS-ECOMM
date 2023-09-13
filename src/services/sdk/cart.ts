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

export const deleteActiveCart = async (cart: Cart, isAuth: boolean = false) => {
  const queryArgs = { version: cart.version };
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  await getRoot().me().carts().withId({ ID: cart.id }).delete({ queryArgs }).execute();
  return null;
};

const updateCart = async (cart: Cart, actions: MyCartUpdateAction[], isAuth: boolean) => {
  const body: MyCartUpdate = {
    version: cart.version,
    actions,
  };
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  const response = await getRoot().me().carts().withId({ ID: cart.id }).post({ body }).execute();
  return response?.body;
};

export const changeLineItemQuantity = async (
  cart: Cart,
  lineItemId: string,
  quantity: number,
  isAuth: boolean = false
) => {
  const actions: MyCartUpdateAction[] = [
    {
      action: 'changeLineItemQuantity',
      lineItemId,
      quantity,
    },
  ];
  return updateCart(cart, actions, isAuth);
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
