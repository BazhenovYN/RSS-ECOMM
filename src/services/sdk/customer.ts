import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { getCustomerApiRoot, projectKey } from './client';

// eslint-disable-next-line import/prefer-default-export
export const login = async (email: string, password: string): Promise<Customer> => {
  try {
    const response: ClientResponse<Customer> = await getCustomerApiRoot(email, password)
      .withProjectKey({ projectKey })
      .me()
      .get()
      .execute();
    return response.body;
  } catch {
    throw new Error('Customer account with the given credentials not found.');
  }
};
