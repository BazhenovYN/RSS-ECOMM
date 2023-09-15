import { Cart, LineItem } from '@commercetools/platform-sdk';

export const item1: LineItem = {
  id: '33de13d2-adf3-4c5a-bce6-1c92a4b80b00',
  productId: '38323c95-5651-414e-a561-ff0b65f8166b',
  productKey: 'f-orange',
  name: {
    'en-US': 'Orange',
  },
  productType: {
    typeId: 'product-type',
    id: 'eee6b34a-9592-4c9b-b74d-a599e63c16fc',
  },
  productSlug: {
    'en-US': 'orange',
  },
  variant: {
    id: 1,
    sku: 'f-orange-1',
    key: 'f-orange-1',
    prices: [
      {
        id: 'c3fe8fe6-ec71-4d02-a9f2-0488f8946249',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 700,
          fractionDigits: 2,
        },
      },
    ],
    images: [
      {
        url: 'https://example.com/1-1.jpg',
        dimensions: {
          w: 1500,
          h: 994,
        },
      },
      {
        url: 'https://example.com/1-2.jpg',
        dimensions: {
          w: 1500,
          h: 1001,
        },
      },
      {
        url: 'https://example.com/1-3.jpg',
        dimensions: {
          w: 1500,
          h: 1000,
        },
      },
    ],
    attributes: [
      {
        name: 'country',
        value: 'Spain',
      },
      {
        name: 'color',
        value: 'orange',
      },
    ],
    assets: [],
  },
  price: {
    id: 'c3fe8fe6-ec71-4d02-a9f2-0488f8946249',
    value: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 700,
      fractionDigits: 2,
    },
  },
  quantity: 2,
  discountedPricePerQuantity: [],
  perMethodTaxRate: [],
  addedAt: '2023-09-10T13:28:16.605Z',
  lastModifiedAt: '2023-09-11T12:39:44.216Z',
  state: [
    {
      quantity: 2,
      state: {
        typeId: 'state',
        id: '2987ae3a-a454-430a-83af-2d989b63aa07',
      },
    },
  ],
  priceMode: 'Platform',
  lineItemMode: 'Standard',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 1400,
    fractionDigits: 2,
  },
  taxedPricePortions: [],
};

export const item2: LineItem = {
  id: 'b45e9ca9-51f2-4b06-9b1f-d620dfe66555',
  productId: 'd5f4f536-8d02-4f3d-b951-7bd40aa7aedf',
  productKey: 'o-dorado',
  name: {
    'en-US': 'Dorado',
  },
  productType: {
    typeId: 'product-type',
    id: 'ffe041e1-ab71-4df8-b5b0-bb20532dc797',
  },
  productSlug: {
    'en-US': 'dorado',
  },
  variant: {
    id: 1,
    sku: 'o-dorado-1',
    key: 'o-dorado-1',
    prices: [
      {
        id: '9ec56f8b-b8fd-43fe-879e-0ddcf220f7f2',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 1690,
          fractionDigits: 2,
        },
      },
    ],
    images: [
      {
        url: 'https://example.com/2-1.jpg',
        dimensions: {
          w: 1500,
          h: 1001,
        },
      },
      {
        url: 'https://example.com/2-2.jpg',
        dimensions: {
          w: 1500,
          h: 1000,
        },
      },
      {
        url: 'hhttps://example.com/2-3.jpg',
        dimensions: {
          w: 1500,
          h: 1000,
        },
      },
    ],
    attributes: [
      {
        name: 'country',
        value: 'Italy',
      },
      {
        name: 'color',
        value: 'silver',
      },
    ],
    assets: [],
  },
  price: {
    id: '9ec56f8b-b8fd-43fe-879e-0ddcf220f7f2',
    value: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 1690,
      fractionDigits: 2,
    },
  },
  quantity: 1,
  discountedPricePerQuantity: [
    {
      quantity: 1,
      discountedPrice: {
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 1521,
          fractionDigits: 2,
        },
        includedDiscounts: [
          {
            discount: {
              typeId: 'cart-discount',
              id: '36ff3179-d14b-4537-8d09-bb685ce3e47d',
            },
            discountedAmount: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 169,
              fractionDigits: 2,
            },
          },
        ],
      },
    },
  ],
  perMethodTaxRate: [],
  addedAt: '2023-09-10T13:31:24.152Z',
  lastModifiedAt: '2023-09-11T11:26:50.521Z',
  state: [
    {
      quantity: 1,
      state: {
        typeId: 'state',
        id: '2987ae3a-a454-430a-83af-2d989b63aa07',
      },
    },
  ],
  priceMode: 'Platform',
  lineItemMode: 'Standard',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 1521,
    fractionDigits: 2,
  },
  taxedPricePortions: [],
};

export const cart: Cart = {
  id: '37fdccc4-3a08-4518-bd83-5195ecb3754c',
  version: 97,
  createdAt: '2023-09-10T13:28:14.109Z',
  lastModifiedAt: '2023-09-11T16:13:01.855Z',
  lastModifiedBy: {
    clientId: '47unAb3JT_3X6HLfAxs-T7mv',
    customer: {
      typeId: 'customer',
      id: 'd7938faa-db42-48e3-a202-e48c763f8a52',
    },
  },
  createdBy: {
    clientId: '47unAb3JT_3X6HLfAxs-T7mv',
    customer: {
      typeId: 'customer',
      id: 'd7938faa-db42-48e3-a202-e48c763f8a52',
    },
  },
  customerId: 'd7938faa-db42-48e3-a202-e48c763f8a52',
  lineItems: [item1, item2],
  cartState: 'Active',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 2921,
    fractionDigits: 2,
  },
  shippingMode: 'Single',
  shipping: [],
  customLineItems: [],
  discountCodes: [
    {
      discountCode: {
        typeId: 'discount-code',
        id: '6ae4afcc-6025-4aeb-a593-f712cbb033fc',
      },
      state: 'MatchesCart',
    },
  ],
  directDiscounts: [],
  inventoryMode: 'None',
  taxMode: 'Platform',
  taxRoundingMode: 'HalfEven',
  taxCalculationMode: 'LineItemLevel',
  deleteDaysAfterLastModification: 90,
  refusedGifts: [],
  origin: 'Customer',
  itemShippingAddresses: [],
  totalLineItemQuantity: 3,
};
