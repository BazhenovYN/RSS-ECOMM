const validationSchemes = {
  email: {
    required: {
      value: true,
      message: 'E-mail is required',
    },
    pattern: {
      value: /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
      message: 'Invalid e-mail address',
    },
  },
  password: {
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
  },
  firstName: {
    required: {
      value: true,
      message: 'First name is required',
    },
    minLength: {
      value: 1,
      message: 'First name must be at least 1 characters long',
    },
    pattern: {
      value: /^(?=.*[a-zA-Z])[a-zA-Z]+$/,
      message: 'First name must contain at least 1 character [A-z] and no special characters or numbers',
    },
  },
  lastName: {
    required: {
      value: true,
      message: 'Last name is required',
    },
    minLength: {
      value: 1,
      message: 'Last name must be at least 1 characters long',
    },
    pattern: {
      value: /^(?=.*[a-zA-Z])[a-zA-Z]+$/,
      message: 'Last name must contain at least 1 character [A-z] and no special characters or numbers',
    },
  },
  country: {
    required: {
      value: true,
      message: 'Country is required',
    },
  },
  city: {
    required: {
      value: true,
      message: 'City is required',
    },
    minLength: {
      value: 1,
      message: 'City must be at least 1 characters long',
    },
    pattern: {
      value: /^(?=.*[a-zA-Z])[a-zA-Z]+$/,
      message: 'City must contain at least 1 character [A-z] and no special characters or numbers',
    },
  },
  street: {
    required: {
      value: true,
      message: 'Street is required',
    },
    minLength: {
      value: 1,
      message: 'Street must be at least 1 characters long',
    },
  },
  postalCode: {
    required: {
      value: true,
      message: 'Postal code is required',
    },
  },
  dateOfBirth: {
    required: {
      value: true,
      message: 'Date of birth is required',
    },
  },
};

export default validationSchemes;
