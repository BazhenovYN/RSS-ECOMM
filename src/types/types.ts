import { Attribute, Image, LocalizedString } from '@commercetools/platform-sdk';

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

export type Language = 'en-US' | 'ru';

export interface Product {
  id: string;
  key: string;
  name: LocalizedString;
  description?: LocalizedString;
  price: number;
  hasDiscount: boolean;
  salePrice: number;
  currency: string;
  images?: Image[];
  attributes?: Attribute[];
}
