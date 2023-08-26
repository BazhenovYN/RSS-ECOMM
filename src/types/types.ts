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

export interface Image {
  readonly url: string;
}

interface Attribute {
  readonly name: string;
  readonly value: string;
}

export interface Product {
  id: string;
  key: string;
  name: string;
  description: string;
  price: number;
  hasDiscount: boolean;
  salePrice: number;
  currency: string;
  images: Image[];
  attributes: Attribute[];
}
