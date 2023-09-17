import cookieNames from 'constants/cookieNames';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  Client,
  PasswordAuthMiddlewareOptions,
  TokenStore,
  TokenCache,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import getEnvironmentVariable from 'utils/getEnvironmentVariable';
import { deleteCookie, getCookie, setCookie } from 'utils/cookie';
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

const createTokenCache = (tokenCookieName: string, refreshTokenCookieName: string): TokenCache => {
  return {
    get: () => {
      return {
        token: '',
        expirationTime: 0,
        refreshToken: '',
      };
    },
    set: (tokenStore: TokenStore) => {
      const msIn200days = 17280000000;
      setCookie(tokenCookieName, tokenStore.token, tokenStore.expirationTime);
      if (tokenStore.refreshToken) {
        setCookie(refreshTokenCookieName, tokenStore.refreshToken, new Date().getTime() + msIn200days);
      }
    },
  };
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
    tokenCache: createTokenCache(cookieNames.authToken, cookieNames.refreshAuthToken),
  };

  return new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};

export const removeAuthTokens = (): void => {
  deleteCookie(cookieNames.authToken);
  deleteCookie(cookieNames.refreshAuthToken);
};

export const getApiRootByRefreshToken = (refreshToken: string) => {
  const client = new ClientBuilder()
    .withRefreshTokenFlow({
      ...authMiddlewareOptions,
      credentials: {
        clientId,
        clientSecret,
      },
      refreshToken,
    })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

export const getApiRootByToken = (token: string) => {
  const client = new ClientBuilder()
    .withExistingTokenFlow(`Bearer ${token}`, { force: false })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

export const getCustomerApiRootByAuthorization = (
  email: string = 'default',
  password: string = 'default'
): ByProjectKeyRequestBuilder => {
  const customerClient: Client = customerClientBuilder(email, password);
  return createApiBuilderFromCtpClient(customerClient).withProjectKey({ projectKey });
};

export const getAnonymousApiRoot = (): ByProjectKeyRequestBuilder => {
  const anonymousClient = new ClientBuilder()
    .withAnonymousSessionFlow({
      ...authMiddlewareOptions,
      scopes: customerScopes,
      tokenCache: createTokenCache(cookieNames.authToken, cookieNames.refreshAuthToken),
    })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderFromCtpClient(anonymousClient).withProjectKey({ projectKey });
};

export const getCustomerApiRoot = (email?: string, password?: string): ByProjectKeyRequestBuilder => {
  if (email && password) return getCustomerApiRootByAuthorization(email, password);

  const token = getCookie(cookieNames.authToken);
  if (token) return getApiRootByToken(token);

  const refreshToken = getCookie(cookieNames.refreshAuthToken);
  if (refreshToken) return getApiRootByRefreshToken(refreshToken);

  return getAnonymousApiRoot();
};
