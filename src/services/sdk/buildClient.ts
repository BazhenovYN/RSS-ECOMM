import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import getEnvironmentVariable from '../../utils/getEnvironmentVariable';

const projectKey: string = getEnvironmentVariable('REACT_APP_PROJECT_KEY');
const scopes: string[] = [getEnvironmentVariable('REACT_APP_SCOPE')];
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
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
  fetch,
};

export default new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
