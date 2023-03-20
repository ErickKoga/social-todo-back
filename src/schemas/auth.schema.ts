export const registerSchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
  response: {
    '201': {
      type: 'object',
      additionalProperties: false,
      required: ['accessToken'],
      properties: {
        accessToken: { type: 'string', format: 'uuid' },
      },
    },
    '409': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
    '500': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
  },
};

export const authenticateSchema = {
  param: {
    type: 'object',
    additionalProperties: false,
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
  response: {
    '201': {
      type: 'object',
      additionalProperties: false,
      required: ['accessToken'],
      properties: {
        accessToken: { type: 'string', format: 'uuid' },
      },
    },
    '404': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
    '500': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
  },
};
