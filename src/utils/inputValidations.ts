export const emailValidationSchema = {
  required: {
    value: true,
    message: 'E-mail is required',
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
};
