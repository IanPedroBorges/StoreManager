const { validateNameProduct } = require('./productValidations');
const { 
  saleValidation, saleUpdateValidation, saleUpdateValidationInfo } = require('./salesValidations');

module.exports = {
  validateNameProduct,
  saleValidation,
  saleUpdateValidation,
  saleUpdateValidationInfo,
};