import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  Client,
  PasswordAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import getEnvironmentVariable from '../../utils/getEnvironmentVariable';

export const projectKey: string = getEnvironmentVariable('REACT_APP_PROJECT_KEY');
const scopes: string[] = [getEnvironmentVariable('REACT_APP_SCOPES')];
const clientId: string = getEnvironmentVariable('REACT_APP_CLIENT_ID');
const clientSecret: string = getEnvironmentVariable('REACT_APP_SECRET');
const authURL: string = getEnvironmentVariable('REACT_APP_AUTH_URL');
const apiURL: string = getEnvironmentVariable('REACT_APP_API_URL');

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authURL,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
};

const appClient: Client = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getAppApiRoot = (): ApiRoot => {
  return createApiBuilderFromCtpClient(appClient);
};

const customerClientBuilder = (email: string, password: string): Client => {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username: email,
        password,
      },
    },
    tokenCache: {
      get: (): TokenStore => {
        const tokenStore: string | null = localStorage.getItem('tokenStore');
        return tokenStore ? JSON.parse(tokenStore) : {};
      },
      set: (tokenStore: TokenStore): void => {
        localStorage.setItem('tokenStore', JSON.stringify(tokenStore));
      },
    },
  };

  return new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};

export const getCustomerApiRoot = (email: string, password: string): ApiRoot => {
  const customerClient: Client = customerClientBuilder(email, password);
  return createApiBuilderFromCtpClient(customerClient);
};
