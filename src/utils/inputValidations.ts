export const emailValidationSchema = {
  required: {
    value: true,
    message: 'E-mail is required',
  },
  pattern: {
    value:
      // https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
      /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    message: 'Invalid e-mail address',
  },
};

export const passwordValidationSchema = {
  required: {
    value: true,
    message: 'Password is required',
  },
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters long',
  },
  maxLength: {
    value: 16,
    message: 'Password must be no more than 16 characters long',
  },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])[^\s].*[^\s]$/,
    message: `Password must contain at least one uppercase letter (A-Z), 
      one lowercase letter (a-z), one digit (0-9), one special character (!@#$%^&*_=+-) 
      and must not contain leading or trailing whitespaces`,
  },
};

export const firstNameValidationSchema = {
  required: {
    value: true,
    message: 'First name is required',
  },
  minLength: {
    value: 1,
    message: 'First name must be at least 1 characters long',
  },
};

export const lastNameValidationSchema = {
  required: {
    value: true,
    message: 'Last name is required',
  },
  minLength: {
    value: 1,
    message: 'Last name must be at least 1 characters long',
  },
};
