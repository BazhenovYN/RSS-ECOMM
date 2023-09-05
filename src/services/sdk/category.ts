import { Category } from '@commercetools/platform-sdk';
import { CategoriesList } from 'types/types';
import { getAppApiRoot } from 'services/sdk/client';

const adaptCategories = async (categories: Category[]) => {
  const result: CategoriesList = { mains: [], subs: [] };
  categories.forEach((category) => {
    if (category.parent) {
      result.subs.push(category);
    } else {
      result.mains.push(category);
    }
  });
  return result;
};

// eslint-disable-next-line import/prefer-default-export
export const getCategories = async () => {
  const response = await getAppApiRoot().categories().get().execute();
  return adaptCategories(response.body.results);
};
