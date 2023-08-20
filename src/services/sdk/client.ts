import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  Client,
  PasswordAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import getEnvironmentVariable from 'utils/getEnvironmentVariable';
import { deleteCookie, getCookie, getCookieExpiration, setCookie } from 'utils/cookie';

export const projectKey: string = getEnvironmentVariable('REACT_APP_PROJECT_KEY');
const scopes: string[] = [getEnvironmentVariable('REACT_APP_SCOPES')];
const customerScopes: string[] = [getEnvironmentVariable('REACT_APP_CUSTOMER_SCOPES')];
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
    scopes: customerScopes,
    tokenCache: {
      get: (): TokenStore => {
        return {
          token: getCookie('authToken') || '',
          expirationTime: getCookieExpiration('authToken') || 0,
          refreshToken: getCookie('refreshToken') || undefined,
        };
      },
      set: (tokenStore: TokenStore): void => {
        const msInYear = 31536000000;
        setCookie('authToken', tokenStore.token, tokenStore.expirationTime);
        if (tokenStore.refreshToken) {
          setCookie('refreshToken', tokenStore.refreshToken, new Date().getTime() + msInYear);
        }
      },
    },
  };

  return new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};

let customerApiRoot: ApiRoot | null = null;

export const getCustomerApiRoot = async (email: string, password: string): Promise<ApiRoot | null> => {
  if (customerApiRoot) {
    return customerApiRoot;
  }

  const customerClient: Client = customerClientBuilder(email, password);
  const newCustomerApiRoot: ApiRoot = createApiBuilderFromCtpClient(customerClient);
  await newCustomerApiRoot.withProjectKey({ projectKey }).me().get().execute();
  customerApiRoot = newCustomerApiRoot;
  return customerApiRoot;
};

export const removeCustomerApiRoot = (): void => {
  customerApiRoot = null;
  deleteCookie('authToken');
  deleteCookie('refreshToken');
};
