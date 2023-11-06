const Joi = require('joi');

const productId = Joi.number().required();
const quantity = Joi.number().required().min(1);

const validateSaleObject = Joi.object({
  productId,
  quantity,
}).messages({
  'any.required': '"{{#key}}" is required',
  'number.min': '"{{#key}}" must be greater than or equal to {{#limit}}',
});

const validateUpdateSake = Joi.object({
  productId,
  saleId: productId,
  quantity,
}).messages({
  'any.required': '"{{#key}}" is required',
  'number.min': '"{{#key}}" must be greater than or equal to {{#limit}}',

});

module.exports = {
  validateSaleObject,
  validateUpdateSake,
};