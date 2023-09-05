import { getCustomerApiRoot } from './client';

// eslint-disable-next-line import/prefer-default-export
export const getActiveCart = async () => {
  const apiRoot = await getCustomerApiRoot();
  const response = await apiRoot?.me().activeCart().get().execute();
  return response?.body;
};
