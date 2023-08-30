import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  Client,
  PasswordAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import getEnvironmentVariable from 'utils/getEnvironmentVariable';
import { deleteCookie, getCookie, getCookieExpiration, setCookie } from 'utils/cookie';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

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

export const getAppApiRoot = (): ByProjectKeyRequestBuilder => {
  return createApiBuilderFromCtpClient(appClient).withProjectKey({ projectKey });
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

let customerApiRoot: ByProjectKeyRequestBuilder | null = null;

const checkApiRoot = async (testedApiRoot: ByProjectKeyRequestBuilder): Promise<void> => {
  await testedApiRoot.me().get().execute();
};

export const removeCustomerApiRoot = (): void => {
  customerApiRoot = null;
  deleteCookie('authToken');
  deleteCookie('refreshToken');
};

const createCustomerApiRoot = (email: string, password: string): ByProjectKeyRequestBuilder => {
  const customerClient: Client = customerClientBuilder(email, password);
  return createApiBuilderFromCtpClient(customerClient).withProjectKey({ projectKey });
};

export const getCustomerApiRoot = async (
  email: string = 'default',
  password: string = 'default'
): Promise<ByProjectKeyRequestBuilder | null> => {
  customerApiRoot = createCustomerApiRoot(email, password);

  try {
    await checkApiRoot(customerApiRoot);
  } catch (error) {
    removeCustomerApiRoot();
    throw error;
  }

  return customerApiRoot;
};
