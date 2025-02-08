export const loginFields = [
  { property: 'email', validationChains: ['string', 'email', 'required'] },
  { property: 'password', validationChains: ['string', 'required'] },
]

export const menus = [
  {
    name: 'account-transactions',
    restricted: true,
    // showAll: [
    //   {
    //     property: 'title', key: 'transaction_title', associationLevel: 1,
    //     bg: 'warning', text: 'black', textPosition: 'left', xsL: 12, smL: 12, mdL: 6, lgL: 5, xlL: 4
    //   },
    //   {
    //     property: 'name', key: 'account_name', associationLevel: 1,
    //     textPosition: 'left', xsL: 12, smL: 8, mdL: 6, lgL: 5, xlL: 4
    //   },
    //   { 
    //     property: 'code', key: 'account_code', associationLevel: 1,
    //     xsL: 12, smL: 4, mdL: 2, xlL: 1
    //   },
    //   { 
    //     property: 'date', key: 'transaction_date', associationLevel: 1,
    //     xsL: 12, smL: 4, mdL: 3, lgL: 2
    //   },
    //   { property: 'value', currency: true, xsL: 12, smL: 4, mdL: 3, lgL: 2 },
    //   { property: 'entry', xsL: 12, smL: 4, mdL: 2, xlL: 1 }
    // ],
    // showDetail: [],
    // fields: [
    //   { property: 'AccountId', tag: 'option', endPoint: '/accounts/options' },
    //   { property: 'value', tag: 'input', type: 'text' },
    //   { property: 'entry', tag: 'option', options: ['debit', 'kredit'] },
    //   { property: 'TransactionId', tag: 'input', type: 'number' }
    // ],
  },
  {
    name: 'accounts',
    restricted: false,
    // showAll: [
    //   { property: 'name', bg: 'warning', text: 'black', textPosition: 'left', xsL: 12, smL: 12, mdL: 5 },
    //   { property: 'code', xsL: 12, smL: 4, mdL: 2 },
    //   { property: 'category', xsL: 12, smL: 4, mdL: 2 },
    //   { property: 'normally', xsL: 12, smL: 4, mdL: 2 }
    // ],
    // showDetail: [],
    // fields: [
    //   { property: 'name', tag: 'input', type: 'text' },
    //   { property: 'code', tag: 'input', type: 'text' },
    //   { property: 'category', tag: 'input', type: 'text' },
    //   { property: 'normally', tag: 'input', type: 'text' }
    // ]
  },
  {
    name: 'admins',
    restricted: true
  },
  {
    name: 'assignments',
    restricted: false
  },
  {
    name: 'customers',
    restricted: false,
    hasDetailPage: true,
    // detailPage: ['order', 'payment'],
    structureData: [
      {
        property: 'residentId', tag: 'input', type: 'text',
        validationChains: ['string', 'trim'],
        lgI: 5, lgF: 4
      },
      {
        property: 'firstName', tag: 'input', type: 'text',
        validationChains: ['string', 'required', 'trim'],
        lgF: 4
      },
      {
        property: 'lastName', tag: 'input', type: 'text',
        validationChains: ['string', 'trim'],
        lgF: 4
      },
      {
        property: 'name', bg: 'warning', text: 'black', link: 'customers',
        textPosition: 'left', firstNamePath: 'firstName', lastNamePath: 'lastName',
        xsL: 12, smL: 5, mdL: 4, lgL: 4, xlL: 4,
        lgI: 7
      },
      { 
        property: 'address', tag: 'input', type: 'text', textPosition: 'left',
        validationChains: ['string', 'trim'],
        xsL: 12, smL: 7, mdL: 7, lgL: 7, xlL: 7,
        lgI: 9, lgF: 12
      },
      {
        property: 'phone', tag: 'input', type: 'text',
        validationChains: ['string', 'trim'],
        lgI: 3, lgF: 4
      },
      {
        property: 'email', tag: 'input', type: 'email',
        validationChains: ['string', 'trim'],
        lgI: 6, lgF: 8
      },
      {
        property: 'createdAt', dateTime: true,
        lgI: 3
      },
      {
        property: 'updatedAt', dateTime: true,
        lgI: 3
      }
    ]
  },
  {
    name: 'datebooks',
    restricted: false
  },
  {
    name: 'divisions',
    restricted: true
  },
  {
    name: 'employees',
    restricted: true
  },
  {
    name: 'general-transactions',
    restricted: false
  },
  {
    name: 'internal-transactions',
    restricted: true,
    // showAll: [
    //   { property: 'title', value: '', property: '', bg: 'warning', text: 'black', xsL: 12, smL: 12, mdL: 5 },
    //   { property: 'date', xsL: 12, smL: 4, mdL: 2 },
    //   { property: 'value', xsL: 12, smL: 4, mdL: 2 },
    //   { property: 'report_status', xsL: 12, smL: 4, mdL: 2 }
    // ],
    // showDetail: [],
    // fields: [
    //   { property: 'name', tag: 'input', type: 'text'},
    //   { property: 'code', tag: 'input', type: 'text'},
    //   { property: 'category', tag: 'input', type: 'text'},
    //   { property: 'normally', tag: 'input', type: 'text'}
    // ]
  },
  {
    name: 'material-purchases',
    restricted: false,
    rearrangeable: true,
    structureData: [
      { 
        property: 'MaterialId', withId: false, key: 'material_name',
        tag: 'select', endPoint: '/materials/options', optionValueProperty: 'id',
        validationChains: ['number', 'integer', 'positive', 'required'],
        bg: 'warning', text: 'black', textPosition: 'left', autoFocusF: true,
        xsL: 12, smL: 12, mdL: 6, lgL: 5, xlL: 4,
        lgI: 6, lgF: 6
      },
      {
        property: 'size', tag: 'select', endPoint: '/sizes/options', dependency: 'MaterialId',
        association: 'SizeCategoryId',  validationChains: ['string', 'required', 'trim'],
        xsL: 12, smL: 3, mdL: 3, lgL: 2, xlL: 2,
        lgI: 3, lgF: 3
      },
      {
        property: 'correctedSize', tag: 'input', type: 'text',
        validationChains: ['string'],
        xsL: 12, smL: 3, mdL: 3, lgL:2, xlL: 2,
        lgI: 3, lgF: 3
      },
      {
        property: 'thickness', tag: 'input', type: 'text',
        validationChains: ['string'],
        xsL: 12, smL: 3, mdL: 2, lgL: 2, xlL: 1,
        lgI: 3, lgF: 3
      },
      {
        property: 'correctedThickness', tag: 'input', type: 'text',
        validationChains: ['string'],
        xsL: 12, smL: 3, mdL: 2, lgL: 2, xlL: 1,
        lgI: 3, lgF: 3
      },
      {
        property: 'unitPrice', currency: true, tag: 'input', type: 'number',
        validationChains: ['number', 'required', { name: 'min', args: 0 }],
        xsL: 12, smL: 4, mdL: 3, lgL: 2, xlL: 2,
        lgI: 3, lgF: 3
      },
      {
        property: 'quantity', tag: 'input', type: 'number',
        validationChains: ['number', 'integer', 'positive', 'required'],
        xsL: 12, smL: 4, mdL: 2, lgL: 2, xlL: 1,
        lgI: 3, lgF: 3
      },
      {
        property: 'date', key: 'purchase_date',
        xsL: 12, smL: 4, mdL: 3, lgL: 2, xlL: 2,
        lgI: 3
      },
      {
        property: 'supplier', key: 'purchase_supplier_name', link: 'suppliers', textPosition: 'left',
        xsL: 12, smL: 8, mdL: 6, lgL: 5, xlL: 4,
        lgI: 9
      },
      {
        property: 'stock', key: 'stock_quantity',
        lgI: 4
      },
      {
        property: 'BrandId', withId: false, key: 'brand_name', tag: 'select',
        endPoint: '/brands/options', dependency: 'MaterialId', association: 'BrandCategoryId',
        optionValueProperty: 'id', validationChains: ['number', 'integer', 'positive', 'required'],
        xsL: 12, smL: 4, mdL: 3, lgL: 3, xlL: 2,
        lgI: 4, lgF: 6
      },
      {
        property: 'PurchaseId', tag: 'input', type: 'number',
        autoFocusR: true, validationChains: ['number', 'integer', 'positive', 'required'],
        lgF: 3, xsR: 12
      },
      {
        property: 'orderIndex', tag: 'input', type: 'number',
        editOnly: true, validationChains: ['number', 'integer', 'positive', 'required'],
        lgI: 4, lgF: 3
      },
      {
        property: 'admin', firstNamePath: 'admin_firstName', lastNamePath: 'admin_lastName',
        lgI: 4
      },
      {
        property: 'createdAt', dateTime: true,
        lgI: 4
      },
      {
        property: 'updatedAt', dateTime: true,
        lgI: 4
      }
    ]
  },
  {
    name: 'materials',
    restricted: false,
    hasDetailPage: true,
    defaultKey: 'name',
    fields: [
      { property: 'name', tag: 'input', type: 'text'},
      { property: 'size_category', tag: 'select', type: ''}
    ]
  },
  {
    name: 'orders',
    restricted: false,
  },
  {
    name: 'payments',
    restricted: false,
  },
  {
    name: 'positions',
    restricted: true,
  },
  {
    name: 'product-materials',
    restricted: true,
  },
  {
    name: 'product-orders',
    restricted: false,
  },
  {
    name: 'products',
    restricted: false,
    // defaultKey: 'name',
    // fields: [
    //   { property: 'name', type: 'text'},
    //   { property: 'description', type: 'text'}
    // ]
  },
  {
    name: 'purchases',
    restricted: false,
  },
  {
    name: 'references',
    restricted: false,
  },
  {
    name: 'shopping-lists',
    restricted: false,
  },
  {
    name: 'size-categories',
    restricted: true,
  },
  {
    name: 'sizes',
    restricted: true,
  },
  {
    name: 'stock-employees',
    restricted: false,
  },
  {
    name: 'stocks',
    restricted: false,
  },
  {
    name: 'suppliers',
    restricted: false,
    hasDetailPage: true
  },
  {
    name: 'transactions',
    restricted: true,
  }
];

export const errors = {
  notFound: {
    title: 'Page Not Found',
    src: '/images/404-not-found.svg',
    alt: 'page not found icon',
    width: "256",
    messages: [
      'The page you are trying to access does not exist.',
      'It might have been deleted or moved to another page.'
    ]
  },
  forbidden: {
    title: 'Forbidden Access',
    src: '/images/403-forbidden.svg',
    alt: 'forbidden access icon',
    width: "256",
    messages: [
      'You do not have permission to view this page.'
    ]
  }
};
