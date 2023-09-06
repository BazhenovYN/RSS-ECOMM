import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  Client,
  PasswordAuthMiddlewareOptions,
  TokenStore,
  AnonymousAuthMiddlewareOptions,
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

export const removeCustomerApiRoot = (): void => {
  deleteCookie('authToken');
  deleteCookie('refreshToken');
};

export const getCustomerApiRoot = (
  email: string = 'default',
  password: string = 'default'
): ByProjectKeyRequestBuilder => {
  const customerClient: Client = customerClientBuilder(email, password);
  return createApiBuilderFromCtpClient(customerClient).withProjectKey({ projectKey });
};

const anonymousClientBuilder = (): Client => {
  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
    scopes: customerScopes,
    tokenCache: {
      get: (): TokenStore => {
        return {
          token: getCookie('anonymousToken') || '',
          expirationTime: getCookieExpiration('anonymousToken') || 0,
          refreshToken: getCookie('refreshAnonymousToken') || undefined,
        };
      },
      set: (tokenStore: TokenStore): void => {
        const msInYear = 31536000000;
        setCookie('anonymousToken', tokenStore.token, tokenStore.expirationTime);
        if (tokenStore.refreshToken) {
          setCookie('refreshAnonymousToken', tokenStore.refreshToken, new Date().getTime() + msInYear);
        }
      },
    },
  };

  return new ClientBuilder()
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};

export const getAnonymousApiRoot = (): ByProjectKeyRequestBuilder => {
  const anonymousClient: Client = anonymousClientBuilder();
  return createApiBuilderFromCtpClient(anonymousClient).withProjectKey({ projectKey });
};
