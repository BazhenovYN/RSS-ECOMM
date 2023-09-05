import {
  Address,
  AddressDraft,
  ClientResponse,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  MyCustomerChangePassword,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { getAppApiRoot, getCustomerApiRoot, removeCustomerApiRoot } from 'services/sdk/client';
import type {
  AddressData,
  PasswordUpdate,
  RegistrationFormAddress,
  RegistrationFormData,
  UserDataUpdate,
} from 'types/types';
import dayjs from 'dayjs';

export const login = async (email: string = 'default', password: string = 'default'): Promise<void> => {
  await getCustomerApiRoot(email, password);
};

export const logout = () => {
  removeCustomerApiRoot();
};

export const createAddressDraft = (registrationFormAddress: RegistrationFormAddress | AddressData): AddressDraft => {
  return {
    key: registrationFormAddress.key,
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

const createCustomerUpdate = (userData: UserDataUpdate, version: number): MyCustomerUpdate => {
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

export const updateUserCustomer = async (userData: UserDataUpdate, version: number): Promise<Customer | undefined> => {
  const customerUpdate = createCustomerUpdate(userData, version);
  const customerApiRoot = await getCustomerApiRoot('default', 'default');
  const response = await customerApiRoot?.me().post({ body: customerUpdate }).execute();
  return response?.body;
};

const createPasswordUpdate = (data: PasswordUpdate, version: number): MyCustomerChangePassword => {
  return {
    version,
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  };
};

export const updateUserPassword = async (
  email: string,
  data: PasswordUpdate,
  version: number
): Promise<Customer | undefined> => {
  const passwordUpdate = createPasswordUpdate(data, version);
  const customerApiRoot = await getCustomerApiRoot('default', 'default');
  const response = await customerApiRoot?.me().password().post({ body: passwordUpdate }).execute();

  if (response?.statusCode === 200) {
    logout();
    await login(email, data.newPassword);
  }

  return response?.body;
};

export const getAddressesData = (user: Customer | undefined): AddressData[] => {
  const addresses: Address[] = user?.addresses || [];
  const billingAddressIds: string[] = user?.billingAddressIds || [];
  const defaultBillingAddressId: string | undefined = user?.defaultBillingAddressId;
  const shippingAddressIds: string[] = user?.shippingAddressIds || [];
  const defaultShippingAddressId: string | undefined = user?.defaultShippingAddressId;

  return addresses.map((address): AddressData => {
    const { id } = address;
    const isBilling = id ? billingAddressIds.includes(id) : false;
    const isShipping = id ? shippingAddressIds.includes(id) : false;
    const isDefaultBilling = id ? defaultBillingAddressId === id : false;
    const isDefaultShipping = id ? defaultShippingAddressId === id : false;

    return {
      id,
      country: address.country,
      city: address.city || '',
      postalCode: address.postalCode || '',
      street: address.streetName || '',
      isBilling,
      isBillingBefore: isBilling,
      isShipping,
      isShippingBefore: isShipping,
      isDefaultBilling,
      isDefaultBillingBefore: isDefaultBilling,
      isDefaultShipping,
      isDefaultShippingBefore: isDefaultShipping,
    };
  });
};

const createAddAddressUpdate = (address: AddressData, version: number): MyCustomerUpdate => {
  const addressKey = crypto.randomUUID();
  const actions: MyCustomerUpdateAction[] = [];
  actions.push({
    action: 'addAddress',
    address: createAddressDraft({ ...address, key: addressKey }),
  });
  if (address.isBilling) {
    actions.push({
      action: 'addBillingAddressId',
      addressKey,
    });
  }
  if (address.isDefaultBilling) {
    actions.push({
      action: 'setDefaultBillingAddress',
      addressKey,
    });
  }
  if (address.isShipping) {
    actions.push({
      action: 'addShippingAddressId',
      addressKey,
    });
  }
  if (address.isDefaultShipping) {
    actions.push({
      action: 'setDefaultShippingAddress',
      addressKey,
    });
  }
  return {
    version,
    actions,
  };
};

export const addAddress = async (address: AddressData, version: number): Promise<Customer | undefined> => {
  const apiRoot = await getCustomerApiRoot();
  const response = await apiRoot
    ?.me()
    .post({ body: createAddAddressUpdate(address, version) })
    .execute();

  return response?.body;
};

const createEditAddressUpdate = async (address: AddressData, version: number): Promise<MyCustomerUpdate> => {
  const addressId = address.id;
  if (!addressId) throw Error('Address not found');

  const actions: MyCustomerUpdateAction[] = [];

  actions.push({
    action: 'changeAddress',
    addressId,
    address: createAddressDraft(address),
  });

  if (address.isBilling) {
    actions.push({
      action: 'addBillingAddressId',
      addressId,
    });
  } else if (address.isBillingBefore) {
    actions.push({
      action: 'removeBillingAddressId',
      addressId,
    });
  }

  if (address.isDefaultBilling) {
    actions.push({
      action: 'setDefaultBillingAddress',
      addressId,
    });
  } else if (address.isDefaultBillingBefore) {
    actions.push({
      action: 'setDefaultBillingAddress',
      addressId: undefined,
    });
  }

  if (address.isShipping) {
    actions.push({
      action: 'addShippingAddressId',
      addressId,
    });
  } else if (address.isShippingBefore) {
    actions.push({
      action: 'removeShippingAddressId',
      addressId,
    });
  }

  if (address.isDefaultShipping) {
    actions.push({
      action: 'setDefaultShippingAddress',
      addressId,
    });
  } else if (address.isDefaultShippingBefore) {
    actions.push({
      action: 'setDefaultShippingAddress',
      addressId: undefined,
    });
  }

  return {
    version,
    actions,
  };
};

export const editAddress = async (address: AddressData, version: number): Promise<Customer | undefined> => {
  const apiRoot = await getCustomerApiRoot();
  const response = await apiRoot
    ?.me()
    .post({ body: await createEditAddressUpdate(address, version) })
    .execute();

  return response?.body;
};

const createAddressDeleteUpdate = (address: AddressData, version: number): MyCustomerUpdate => {
  return {
    version,
    actions: [
      {
        action: 'removeAddress',
        addressId: address.id,
      },
    ],
  };
};

export const deleteAddress = async (address: AddressData, version: number): Promise<Customer | undefined> => {
  const apiRoot = await getCustomerApiRoot();
  const response = await apiRoot
    ?.me()
    .post({ body: createAddressDeleteUpdate(address, version) })
    .execute();

  return response?.body;
};
