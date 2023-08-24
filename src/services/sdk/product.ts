import { getAppApiRoot } from 'services/sdk/client';
import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

// eslint-disable-next-line import/prefer-default-export
export const getProducts = async (): Promise<ProductProjectionPagedQueryResponse> => {
  const response = await getAppApiRoot().productProjections().get().execute();
  return response.body;
};
