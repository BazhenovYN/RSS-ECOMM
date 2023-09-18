import { DEFAULT_LANGUAGE } from 'constants/const';
import {
  MyShoppingListDraft,
  MyShoppingListUpdate,
  MyShoppingListUpdateAction,
  ShoppingList,
} from '@commercetools/platform-sdk';
import { getCustomerApiRoot } from 'services/sdk/client';
import { findLineItemInList } from 'utils/utils';
import { Product, WishList } from 'types/types';
import { getProductDetails } from './product';

const createShoppingListDraft = (): MyShoppingListDraft => {
  return {
    name: {
      [DEFAULT_LANGUAGE]: 'My shopping list',
    },
  };
};

export const createShoppingList = async () => {
  const response = await getCustomerApiRoot().me().shoppingLists().post({ body: createShoppingListDraft() }).execute();
  return response.body;
};

const updateShoppingList = async (shoppingList: ShoppingList, actions: MyShoppingListUpdateAction[]) => {
  const body: MyShoppingListUpdate = {
    version: shoppingList.version,
    actions,
  };
  const response = await getCustomerApiRoot()
    .me()
    .shoppingLists()
    .withId({ ID: shoppingList.id })
    .post({ body })
    .execute();
  return response.body;
};

export const getWishList = async (): Promise<WishList | undefined> => {
  const response = await getCustomerApiRoot().me().shoppingLists().get().execute();
  if (response.body.results.length > 0) {
    const shoppingList = response.body.results[0];
    const products = await Promise.all(shoppingList.lineItems.map((item) => getProductDetails(item.productId)));
    return { products, shoppingList };
  }
  return undefined;
};

export const addToWishlist = async (wishList: WishList, product: Product, quantity = 1): Promise<WishList> => {
  const actions: MyShoppingListUpdateAction[] = [
    {
      action: 'addLineItem',
      productId: product.id,
      quantity,
    },
  ];
  const shoppingList = await updateShoppingList(wishList.shoppingList, actions);
  const products = [...wishList.products, product];
  return { products, shoppingList };
};

export const removeFromWishlist = async (wishList: WishList, product: Product): Promise<WishList> => {
  const lineItemId = findLineItemInList(wishList.shoppingList.lineItems, product.id)?.id;
  if (!lineItemId) {
    return wishList; // the product is not on the list
  }
  const actions: MyShoppingListUpdateAction[] = [
    {
      action: 'removeLineItem',
      lineItemId,
    },
  ];
  const shoppingList = await updateShoppingList(wishList.shoppingList, actions);
  const products = wishList.products.filter((item) => item.id !== product.id);
  return { products, shoppingList };
};
