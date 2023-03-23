export const createFollowSchema = {
  body: {
    type: "object",
    additionalProperties: false,
    required: ["followerId", "followingId"],
    properties: {
      followerId: { type: "string", format: "uuid" },
      followingId: { type: "string", format: "uuid" },
    },
  },
  response: {
    "201": {
      type: "object",
      additionalProperties: false,
      required: ["id", "followerId", "followingId"],
      properties: {
        id: { type: "string", format: "uuid" },
        followerId: { type: "string", format: "uuid" },
        followingId: { type: "string", format: "uuid" },
      },
    },
    "404": {
      type: "object",
      additionalProperties: false,
      properties: {
        statusCode: { type: "number" },
        message: { type: "string" },
      },
    },
    "500": {
      type: "object",
      additionalProperties: false,
      properties: {
        statusCode: { type: "number" },
        message: { type: "string" },
      },
    },
  },
};

export const deleteFollowSchema = {
  param: {
    type: "object",
    additionalProperties: false,
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    "200": {
      type: "object",
      additionalProperties: false,
      properties: {
        statusCode: { type: "number" },
        message: { type: "string" },
      },
    },
    "404": {
      type: "object",
      additionalProperties: false,
      properties: {
        statusCode: { type: "number" },
        message: { type: "string" },
      },
    },
    "500": {
      type: "object",
      additionalProperties: false,
      properties: {
        statusCode: { type: "number" },
        message: { type: "string" },
      },
    },
  },
};
