import { DEFAULT_CURRENCY } from 'constants/const';
import { getAnonymousApiRoot, getAppApiRoot, getCustomerApiRoot } from 'services/sdk/client';
import { Cart, MyCartDraft, MyCartUpdate, MyCartUpdateAction } from '@commercetools/platform-sdk';

const createCartDraft = (): MyCartDraft => {
  return {
    currency: DEFAULT_CURRENCY,
  };
};

export const createCart = async (isAuth: boolean = false): Promise<Cart> => {
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  const response = await getRoot().me().carts().post({ body: createCartDraft() }).execute();

  return response.body;
};

export const getActiveCart = async (isAuth: boolean = false): Promise<Cart | undefined> => {
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  try {
    const response = await getRoot().me().activeCart().get().execute();
    return response.body;
  } catch {
    return undefined;
  }
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

export const addToCart = async (
  cart: Cart,
  productId: string,
  isAuth: boolean = false,
  count: number = 1
): Promise<Cart> => {
  const actions: MyCartUpdateAction[] = [
    {
      action: 'addLineItem',
      productId,
      quantity: count,
    },
  ];
  return updateCart(cart, actions, isAuth);
};

export const deleteActiveCart = async (cart: Cart, isAuth: boolean = false) => {
  const queryArgs = { version: cart.version };
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  await getRoot().me().carts().withId({ ID: cart.id }).delete({ queryArgs }).execute();
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

export const addDiscountCode = async (cart: Cart, code: string, isAuth: boolean = false) => {
  const actions: MyCartUpdateAction[] = [
    {
      action: 'addDiscountCode',
      code: code.toUpperCase(),
    },
  ];
  return updateCart(cart, actions, isAuth);
};

export const removeDiscountCode = async (cart: Cart, discountID: string, isAuth: boolean = false) => {
  const actions: MyCartUpdateAction[] = [
    {
      action: 'removeDiscountCode',
      discountCode: {
        typeId: 'discount-code',
        id: discountID,
      },
    },
  ];
  return updateCart(cart, actions, isAuth);
};

export const getDiscountCode = async (ID: string) => {
  const response = await getAppApiRoot().discountCodes().withId({ ID }).get().execute();
  return response.body;
};

export const getDiscountCodes = async () => {
  const response = await getAppApiRoot().discountCodes().get().execute();
  return response.body.results;
};
