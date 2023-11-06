const httpStatus = {
  OK: 200,    
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  ERRO_SERVIDOR: 500,
  'any.required': 400,
  'string.min': 422,
  'number.min': 422,
};

const httpStatusCode = (status) => httpStatus[status] || 500;

module.exports = {
  httpStatusCode,
};