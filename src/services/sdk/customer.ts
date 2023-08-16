import {
  AddressDraft,
  ClientResponse,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { getAppApiRoot, getCustomerApiRoot, projectKey } from 'services/sdk/client';

export interface RegistrationFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddress: RegistrationFormAddress;
  billingAddress: RegistrationFormAddress;
}

export interface RegistrationFormAddress {
  country: string;
  city: string;
  postalCode: string;
  street: string;
  isDefault: boolean;
}

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

export const createAddressDraft = (registrationFormAddress: RegistrationFormAddress): AddressDraft => {
  return {
    streetName: registrationFormAddress.street,
    city: registrationFormAddress.city,
    postalCode: registrationFormAddress.postalCode,
    country: registrationFormAddress.country,
  };
};

export const createCustomerDraft = (registrationFormData: RegistrationFormData): CustomerDraft => {
  const shippingAddress: AddressDraft = createAddressDraft(registrationFormData.shippingAddress);
  const billingAddress: AddressDraft = createAddressDraft(registrationFormData.billingAddress);

  let dateOfBirth: Date = new Date(registrationFormData.dateOfBirth);
  const timezoneOffsetMs: number = dateOfBirth.getTimezoneOffset() * 60 * 1000;
  dateOfBirth = new Date(dateOfBirth.valueOf() - timezoneOffsetMs);

  return {
    email: registrationFormData.email,
    password: registrationFormData.password,
    firstName: registrationFormData.firstName,
    lastName: registrationFormData.lastName,
    dateOfBirth: dateOfBirth.toISOString().slice(0, 10),
    addresses: [shippingAddress, billingAddress],
    shippingAddresses: [0],
    defaultShippingAddress: registrationFormData.shippingAddress.isDefault ? 0 : undefined,
    billingAddresses: [1],
    defaultBillingAddress: registrationFormData.billingAddress.isDefault ? 1 : undefined,
  };
};

export const createCustomer = async (registrationFormData: RegistrationFormData): Promise<CustomerSignInResult> => {
  const customerDraft: CustomerDraft = createCustomerDraft(registrationFormData);
  const response: ClientResponse<CustomerSignInResult> = await getAppApiRoot()
    .withProjectKey({ projectKey })
    .customers()
    .post({ body: customerDraft })
    .execute();
  return response.body;
};
