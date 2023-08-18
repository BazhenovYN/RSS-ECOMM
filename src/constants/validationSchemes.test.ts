import validationSchemes from './validationSchemes';

describe('email validated correct', () => {
  const regExp = validationSchemes.email.pattern.value;
  const testData = [
    { string: 'example@example', expected: true },
    { string: 'example@example.com', expected: true },
    { string: 'example123456@example.com', expected: true },
    { string: 'example_example@example.com', expected: true },
    { string: 'example-example@example.com', expected: true },
    { string: 'e@e.c', expected: true },
    { string: 'example@example.com ', expected: false },
    { string: ' example@example.com', expected: false },
    { string: ' example@example.com ', expected: false },
    { string: 'example', expected: false },
    { string: 'example.', expected: false },
    { string: 'example.com', expected: false },
    { string: 'example@', expected: false },
    { string: 'example@example@example.com', expected: false },
  ];
  testData.forEach((data) => {
    test(`test: ${data.string}`, () => {
      expect(regExp.test(data.string)).toEqual(data.expected);
    });
  });
});

describe('password validated correct', () => {
  const regExp = validationSchemes.password.pattern.value;
  const testData = [
    { string: 'aB1#', expected: true },
    { string: 'aaBBaa1122##', expected: true },
    { string: '^hsdj=JD+FH87s#&', expected: true },
    { string: 'aaaBBB', expected: false },
    { string: 'aaa+=%', expected: false },
    { string: 'AAA^%$', expected: false },
    { string: 'asdsdsdsds', expected: false },
    { string: 'BKGJHDIHLBD', expected: false },
    { string: '123456789', expected: false },
    { string: 'a', expected: false },
    { string: 'A', expected: false },
    { string: '1', expected: false },
    { string: '#', expected: false },
  ];
  testData.forEach((data) => {
    test(`test: ${data.string}`, () => {
      expect(regExp.test(data.string)).toEqual(data.expected);
    });
  });
});

const testData = [
  { string: 'a', expected: true },
  { string: 'asdfg', expected: true },
  { string: 'Fdfdb', expected: true },
  { string: '1', expected: false },
  { string: '123', expected: false },
  { string: 'fff^%$', expected: false },
  { string: '#', expected: false },
  { string: '123asdf', expected: false },
];

describe('first name validated correct', () => {
  const regExp = validationSchemes.firstName.pattern.value;
  testData.forEach((data) => {
    test(`test: ${data.string}`, () => {
      expect(regExp.test(data.string)).toEqual(data.expected);
    });
  });
});

describe('last name validated correct', () => {
  const regExp = validationSchemes.lastName.pattern.value;
  testData.forEach((data) => {
    test(`test: ${data.string}`, () => {
      expect(regExp.test(data.string)).toEqual(data.expected);
    });
  });
});

describe('city validated correct', () => {
  const regExp = validationSchemes.city.pattern.value;
  testData.forEach((data) => {
    test(`test: ${data.string}`, () => {
      expect(regExp.test(data.string)).toEqual(data.expected);
    });
  });
});
