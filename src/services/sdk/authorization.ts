import { ClientResponse, CustomerSignInResult, CustomerToken } from '@commercetools/platform-sdk';
import { getApiRoot, projectKey } from './client';

export const getPasswordToken = async (email: string): Promise<CustomerToken> => {
  try {
    const response: ClientResponse<CustomerToken> = await getApiRoot()
      .withProjectKey({ projectKey })
      .customers()
      .passwordToken()
      .post({
        body: { email },
      })
      .execute();

    return response.body;
  } catch {
    throw new Error('Account with the given email not found.');
  }
};

export const login = async (email: string, password: string): Promise<CustomerSignInResult> => {
  try {
    const response: ClientResponse<CustomerSignInResult> = await getApiRoot()
      .withProjectKey({ projectKey })
      .login()
      .post({
        body: { email, password },
      })
      .execute();

    return response.body;
  } catch {
    throw new Error('Account with the given credentials not found.');
  }
};
