import { DEFAULT_CURRENCY } from 'constants/const';
import { getAppApiRoot, getCustomerApiRoot } from 'services/sdk/client';
import { Cart, MyCartDraft, MyCartUpdate, MyCartUpdateAction } from '@commercetools/platform-sdk';

const createCartDraft = (): MyCartDraft => {
  return {
    currency: DEFAULT_CURRENCY,
  };
};

export const createCart = async (): Promise<Cart> => {
  const response = await getCustomerApiRoot().me().carts().post({ body: createCartDraft() }).execute();

  return response.body;
};

export const getActiveCart = async (): Promise<Cart | undefined> => {
  try {
    const response = await getCustomerApiRoot().me().activeCart().get().execute();
    return response.body;
  } catch {
    return undefined;
  }
};

const updateCart = async (cart: Cart, actions: MyCartUpdateAction[]) => {
  const body: MyCartUpdate = {
    version: cart.version,
    actions,
  };
  const response = await getCustomerApiRoot().me().carts().withId({ ID: cart.id }).post({ body }).execute();
  return response.body;
};

export const addToCart = async (cart: Cart, productId: string, count: number = 1): Promise<Cart> => {
  const actions: MyCartUpdateAction[] = [
    {
      action: 'addLineItem',
      productId,
      quantity: count,
    },
  ];
  return updateCart(cart, actions);
};

export const deleteActiveCart = async (cart: Cart) => {
  const queryArgs = { version: cart.version };
  await getCustomerApiRoot().me().carts().withId({ ID: cart.id }).delete({ queryArgs }).execute();
};

export const changeLineItemQuantity = async (cart: Cart, lineItemId: string, quantity: number) => {
  const actions: MyCartUpdateAction[] = [
    {
      action: 'changeLineItemQuantity',
      lineItemId,
      quantity,
    },
  ];
  return updateCart(cart, actions);
};

export const removeLineItem = async (cart: Cart, lineItemId: string) => {
  const actions: MyCartUpdateAction[] = [
    {
      action: 'removeLineItem',
      lineItemId,
    },
  ];
  return updateCart(cart, actions);
};

export const addDiscountCode = async (cart: Cart, code: string) => {
  const actions: MyCartUpdateAction[] = [
    {
      action: 'addDiscountCode',
      code: code.toUpperCase(),
    },
  ];
  return updateCart(cart, actions);
};

export const removeDiscountCode = async (cart: Cart, discountID: string) => {
  const actions: MyCartUpdateAction[] = [
    {
      action: 'removeDiscountCode',
      discountCode: {
        typeId: 'discount-code',
        id: discountID,
      },
    },
  ];
  return updateCart(cart, actions);
};

export const getDiscountCode = async (ID: string) => {
  const response = await getAppApiRoot().discountCodes().withId({ ID }).get().execute();
  return response.body;
};

export const getDiscountCodes = async () => {
  const response = await getAppApiRoot().discountCodes().get().execute();
  return response.body.results;
};
