import { Attribute, Category, Image, LocalizedString } from '@commercetools/platform-sdk';

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
  name: LocalizedString;
  description?: LocalizedString;
  price?: number;
  salePrice?: number;
  currency?: string;
  images?: Image[];
  attributes?: Attribute[];
}

export type AttributesList = Record<string, Set<string>>;

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
}
