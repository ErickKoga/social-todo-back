export const createUserSchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 255 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
  response: {
    '201': {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: 'string', format: 'date-time' },
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

export const getUserSchema = {
  param: {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    '200': {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: 'string', format: 'date-time' },
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

export const getAllUsersSchema = {
  response: {
    '200': {
      type: 'array',
      additionalProperties: false,
      required: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: 'string', format: 'date-time' },
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

export const updateUserSchema = {
  param: {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 255 },
      email: { type: 'string', format: 'email' },
    },
  },
  response: {
    '200': {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: 'string', format: 'date-time' },
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

export const deleteUserSchema = {
  param: {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    '200': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
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
