import {
  AddressDraft,
  ClientResponse,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { getAppApiRoot, getCustomerApiRoot, projectKey } from './client';
import { CountryCode } from '../../types/types';

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

export const createAddressDraft = (
  streetName: string,
  city: string,
  postalCode: string,
  country: CountryCode
): AddressDraft => {
  return {
    streetName,
    city,
    postalCode,
    country,
  };
};

export const createCustomerDraft = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  streetName: string,
  city: string,
  postalCode: string,
  country: CountryCode
): CustomerDraft => {
  return {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth: dateOfBirth.toISOString().slice(0, 10),
    addresses: [createAddressDraft(streetName, city, postalCode, country)],
  };
};

export const register = async (customerDraft: CustomerDraft): Promise<CustomerSignInResult> => {
  const response: ClientResponse<CustomerSignInResult> = await getAppApiRoot()
    .withProjectKey({ projectKey })
    .customers()
    .post({ body: customerDraft })
    .execute();
  return response.body;
};
