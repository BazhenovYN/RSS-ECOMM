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
