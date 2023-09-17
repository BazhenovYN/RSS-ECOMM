import { DEFAULT_LANGUAGE } from 'constants/const';
import {
  MyShoppingListDraft,
  MyShoppingListUpdate,
  MyShoppingListUpdateAction,
  ShoppingList,
} from '@commercetools/platform-sdk';
import { getAnonymousApiRoot, getCustomerApiRoot } from 'services/sdk/client';
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

const createShoppingList = async (isAuth: boolean = false) => {
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  const response = await getRoot().me().shoppingLists().post({ body: createShoppingListDraft() }).execute();
  return response.body;
};

const updateShoppingList = async (
  shoppingList: ShoppingList | undefined,
  actions: MyShoppingListUpdateAction[],
  isAuth: boolean
) => {
  if (!shoppingList) {
    return shoppingList;
  }
  const body: MyShoppingListUpdate = {
    version: shoppingList.version,
    actions,
  };
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  const response = await getRoot().me().shoppingLists().withId({ ID: shoppingList.id }).post({ body }).execute();
  return response.body;
};

export const getWishList = async (isAuth: boolean = false): Promise<WishList> => {
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;

  const response = await getRoot().me().shoppingLists().get().execute();
  if (response.body.results.length > 0) {
    const shoppingList = response.body.results[0];
    const products = await Promise.all(shoppingList.lineItems.map((item) => getProductDetails(item.productId)));
    return { products, shoppingList };
  }
  const shoppingList = await createShoppingList(isAuth);
  return { products: [], shoppingList };
};

export const addToWishlist = async (
  wishList: WishList,
  product: Product,
  isAuth: boolean,
  quantity = 1
): Promise<WishList> => {
  const actions: MyShoppingListUpdateAction[] = [
    {
      action: 'addLineItem',
      productId: product.id,
      quantity,
    },
  ];
  const shoppingList = await updateShoppingList(wishList.shoppingList, actions, isAuth);
  const products = [...wishList.products, product];
  return { products, shoppingList };
};

export const removeFromWishlist = async (wishList: WishList, product: Product, isAuth: boolean): Promise<WishList> => {
  const lineItemId = findLineItemInList(wishList.shoppingList?.lineItems ?? [], product.id)?.id;
  if (!lineItemId) {
    return wishList; // the product is not on the list
  }
  const actions: MyShoppingListUpdateAction[] = [
    {
      action: 'removeLineItem',
      lineItemId,
    },
  ];
  const shoppingList = await updateShoppingList(wishList.shoppingList, actions, isAuth);
  const products = wishList.products.filter((item) => item.id !== product.id);
  return { products, shoppingList };
};
