const Joi = require('joi');

const nameProduct = Joi.string().required().min(5);

const validateObjectProduct = Joi.object({
  name: nameProduct,
}).messages({
  'any.required': '"{{#key}}" is required',
  'string.min': '"{{#key}}" length must be at least {{#limit}} characters long',
});

module.exports = {
  validateObjectProduct,
};