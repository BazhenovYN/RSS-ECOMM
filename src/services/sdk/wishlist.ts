import { DEFAULT_LANGUAGE } from 'constants/const';
import { MyShoppingListDraft, MyShoppingListUpdate, MyShoppingListUpdateAction } from '@commercetools/platform-sdk';
import { getAnonymousApiRoot, getCustomerApiRoot } from 'services/sdk/client';
import { findLineItemInList } from 'utils/utils';
import { WishList } from 'types/types';
import { getProductDetails } from './product';

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

const updateWishlist = async (wishList: WishList, actions: MyShoppingListUpdateAction[], isAuth: boolean) => {
  if (!wishList.shoppingList) {
    return wishList;
  }
  const body: MyShoppingListUpdate = {
    version: wishList.shoppingList.version,
    actions,
  };
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;
  const response = await getRoot()
    .me()
    .shoppingLists()
    .withId({ ID: wishList.shoppingList.id })
    .post({ body })
    .execute();
  const shoppingList = response.body;
  const products = await Promise.all(shoppingList.lineItems.map((item) => getProductDetails(item.productId)));
  return { products, shoppingList };
};

export const getWishList = async (isAuth: boolean = false): Promise<WishList> => {
  const getRoot = isAuth ? getCustomerApiRoot : getAnonymousApiRoot;

  const response = await getRoot().me().shoppingLists().get().execute();
  if (response.body.results.length > 0) {
    const shoppingList = response.body.results[0];
    const products = await Promise.all(shoppingList.lineItems.map((item) => getProductDetails(item.productId)));
    return { products, shoppingList };
  }
  const shoppingList = await createWishlist(isAuth);
  return { products: [], shoppingList };
};

export const addToWishlist = async (wishList: WishList, productId: string, isAuth: boolean, quantity = 1) => {
  const actions: MyShoppingListUpdateAction[] = [
    {
      action: 'addLineItem',
      productId,
      quantity,
    },
  ];
  return updateWishlist(wishList, actions, isAuth);
};

export const removeFromWishlist = (wishList: WishList, productId: string, isAuth: boolean) => {
  const lineItemId = findLineItemInList(wishList.shoppingList?.lineItems ?? [], productId)?.id;
  if (!lineItemId) {
    return wishList; // the product is not on the list
  }
  const actions: MyShoppingListUpdateAction[] = [
    {
      action: 'removeLineItem',
      lineItemId,
    },
  ];
  return updateWishlist(wishList, actions, isAuth);
};
