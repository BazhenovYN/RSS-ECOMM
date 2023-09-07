import { Cart, MyCartUpdate } from '@commercetools/platform-sdk';
import { getCustomerApiRoot } from './client';

export const getActiveCart = async () => {
  const apiRoot = await getCustomerApiRoot();
  const response = await apiRoot?.me().activeCart().get().execute();
  return response?.body;
};

export const changeLineItemQuantity = async (cart: Cart, lineItemId: string, quantity: number) => {
  const body: MyCartUpdate = {
    version: cart.version,
    actions: [
      {
        action: 'changeLineItemQuantity',
        lineItemId,
        quantity,
      },
    ],
  };
  const apiRoot = await getCustomerApiRoot();
  const response = await apiRoot?.me().carts().withId({ ID: cart.id }).post({ body }).execute();
  return response?.body;
};
