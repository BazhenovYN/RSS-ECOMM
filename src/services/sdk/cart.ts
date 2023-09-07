import { Cart, MyCartUpdate, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { getCustomerApiRoot } from './client';

export const getActiveCart = async () => {
  const apiRoot = await getCustomerApiRoot();
  const response = await apiRoot?.me().activeCart().get().execute();
  return response?.body;
};

const updateCart = async (cart: Cart, actions: MyCartUpdateAction[]) => {
  const body: MyCartUpdate = {
    version: cart.version,
    actions,
  };
  const apiRoot = await getCustomerApiRoot();
  const response = await apiRoot?.me().carts().withId({ ID: cart.id }).post({ body }).execute();
  return response?.body;
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
