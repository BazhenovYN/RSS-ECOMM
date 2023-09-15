import { DEFAULT_LANGUAGE } from 'constants/const';
import {
  MyShoppingListDraft,
  MyShoppingListUpdate,
  MyShoppingListUpdateAction,
  ShoppingList,
} from '@commercetools/platform-sdk';
import { getAnonymousApiRoot, getCustomerApiRoot } from 'services/sdk/client';
import { findLineItemInList } from 'utils/utils';

const createShoppingListDraft = (): MyShoppingListDraft => {
  return {
    name: {
      [DEFAULT_LANGUAGE]: 'My shopping list',
    },
  };
};

const createWishlist = async (isAuth: boolean = false) => {
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  const response = await getRoot().me().shoppingLists().post({ body: createShoppingListDraft() }).execute();
  return response.body;
};

const updateWishlist = async (list: ShoppingList, actions: MyShoppingListUpdateAction[], isAuth: boolean) => {
  const body: MyShoppingListUpdate = {
    version: list.version,
    actions,
  };
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  const response = await getRoot().me().shoppingLists().withId({ ID: list.id }).post({ body }).execute();
  return response.body;
};

export const getWishList = async (isAuth: boolean = false) => {
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;

  const response = await getRoot().me().shoppingLists().get().execute();
  if (response.body.results.length > 0) {
    return response.body.results[0];
  }
  return createWishlist(isAuth);
};

export const addToWishlist = async (list: ShoppingList, productId: string, isAuth: boolean, quantity = 1) => {
  const actions: MyShoppingListUpdateAction[] = [
    {
      action: 'addLineItem',
      productId,
      quantity,
    },
  ];
  return updateWishlist(list, actions, isAuth);
};

export const removeFromWishlist = (list: ShoppingList, productId: string, isAuth: boolean) => {
  const lineItemId = findLineItemInList(list.lineItems, productId)?.id;
  if (!lineItemId) {
    return list; // the product is not on the list
  }
  const actions: MyShoppingListUpdateAction[] = [
    {
      action: 'removeLineItem',
      lineItemId,
    },
  ];
  return updateWishlist(list, actions, isAuth);
};

export const deleteWishlist = async (list: ShoppingList, isAuth: boolean = false) => {
  const queryArgs = { version: list.version };
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  await getRoot().me().shoppingLists().withId({ ID: list.id }).delete({ queryArgs }).execute();
  return null;
};
