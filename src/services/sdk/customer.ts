import { AddressDraft, ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { getAppApiRoot, getCustomerApiRoot, projectKey, removeCustomerApiRoot } from 'services/sdk/client';
import { RegistrationFormAddress, RegistrationFormData } from 'types/types';
import dayjs from 'dayjs';
import { deleteCookie } from 'utils/cookie';

export const login = async (email: string = 'default', password: string = 'default'): Promise<void> => {
  await getCustomerApiRoot(email, password);
};

export const logout = () => {
  removeCustomerApiRoot();
  deleteCookie('authToken');
  deleteCookie('refreshToken');
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

  const dateOfBirthDayjs: dayjs.Dayjs = dayjs(registrationFormData.dateOfBirth);
  const dateOfBirth: string = dateOfBirthDayjs.add(dateOfBirthDayjs.utcOffset(), 'minute').toISOString().slice(0, 10);

  return {
    email: registrationFormData.email,
    password: registrationFormData.password,
    firstName: registrationFormData.firstName,
    lastName: registrationFormData.lastName,
    dateOfBirth,
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
