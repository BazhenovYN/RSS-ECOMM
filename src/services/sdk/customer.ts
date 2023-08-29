import {
  AddressDraft,
  ClientResponse,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { getAppApiRoot, getCustomerApiRoot, removeCustomerApiRoot } from 'services/sdk/client';
import type { UserDataUpdate, RegistrationFormAddress, RegistrationFormData } from 'types/types';
import dayjs from 'dayjs';

export const login = async (email: string = 'default', password: string = 'default'): Promise<void> => {
  await getCustomerApiRoot(email, password);
};

export const logout = () => {
  removeCustomerApiRoot();
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
    .customers()
    .post({ body: customerDraft })
    .execute();
  return response.body;
};

export const getUserCustomer = async (email = 'default', password = 'default'): Promise<Customer | undefined> => {
  const customerApiRoot = await getCustomerApiRoot(email, password);
  const response = await customerApiRoot?.me().get().execute();
  return response?.body;
};

const createCustomerUpdate = (version: number, userData: UserDataUpdate): MyCustomerUpdate => {
  const dateOfBirth: string = userData.dateOfBirth
    .add(userData.dateOfBirth.utcOffset(), 'minute')
    .toISOString()
    .slice(0, 10);
  return {
    version,
    actions: [
      {
        action: 'setFirstName',
        firstName: userData.firstName,
      },
      {
        action: 'setLastName',
        lastName: userData.lastName,
      },
      {
        action: 'changeEmail',
        email: userData.email,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth,
      },
    ],
  };
};

export const updateUserCustomer = async (userData: UserDataUpdate, version?: number): Promise<Customer | undefined> => {
  if (!version) {
    throw Error('Customer version undefined');
  }
  const customerUpdate = createCustomerUpdate(version, userData);
  const customerApiRoot = await getCustomerApiRoot('default', 'default');
  const response = await customerApiRoot?.me().post({ body: customerUpdate }).execute();
  return response?.body;
};
