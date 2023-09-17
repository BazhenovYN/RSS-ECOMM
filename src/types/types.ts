import { Attribute, Category, Image, LocalizedString } from '@commercetools/platform-sdk';
import dayjs from 'dayjs';

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
  key?: string;
  country: string;
  city: string;
  postalCode: string;
  street: string;
  isDefault: boolean;
}

export interface AddressData {
  id?: string;
  key?: string;
  country: string;
  city: string;
  postalCode: string;
  street: string;
  isBilling: boolean;
  isShipping: boolean;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  isBillingBefore?: boolean;
  isShippingBefore?: boolean;
  isDefaultBillingBefore?: boolean;
  isDefaultShippingBefore?: boolean;
}

export type Language = 'en-US' | 'ru';

export interface Product {
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  price?: number;
  salePrice?: number;
  currency?: string;
  images?: Image[];
  attributes?: Attribute[];
}

export interface UserDataUpdate {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: dayjs.Dayjs;
}

export interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type AttributesList = Record<string, { label: string; list: Set<string> }>;

export type SelectedAttributesList = Record<string, string>;

export type CategoryListItem = Pick<Category, 'id' | 'name' | 'parent'>;

export interface CategoriesList {
  mains: CategoryListItem[];
  subs: CategoryListItem[];
}

export interface SearchParams {
  searchTextParameter: string;
  searchQuery: string;
  sortingField: string;
  sortingDirection: string;
  selectedAttributes?: SelectedAttributesList;
  categoryId?: string;
  limit?: number;
  offset?: number;
}

export interface SearchData {
  products: Product[];
  total: number;
}
