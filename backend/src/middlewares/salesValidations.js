const { validateSaleObject, validateUpdateSake } = require('./schems/salesSchems');
const { salesServices, productsService } = require('../services');
const { httpStatusCode } = require('../utils/httpStatus');

const saleValidation = (req, res, next) => {
  const { body } = req;
  const response = body.reduce((acc, curr) => {
    const { error } = validateSaleObject.validate(curr);
    if (error) {
      return error;
    }
    return acc;
  }, {});
  if (response.details) {
    return res
      .status(httpStatusCode(response.details[0].type))
      .json({ message: response.message });
  }
  next();
};

const saleUpdateValidationInfo = (req, res, next) => {
  const { body } = req;
  const { saleId, productId } = req.params;
  const response = validateUpdateSake.validate({ ...body, saleId, productId });
  if (response.error) {
    return res
      .status(httpStatusCode(response.error.details[0].type))
      .json({ message: response.error.message });
  }
  next();
};

const saleUpdateValidation = async (req, res, next) => {
  const { saleId, productId } = req.params;
  const sale = await salesServices.getSaleById(saleId);
  if (sale.status === 'NOT_FOUND') {
    return res.status(httpStatusCode('NOT_FOUND')).json(sale.data);
  }
  const product = await productsService.getProductById(productId);
  if (product.status === 'NOT_FOUND') {
    return res.status(httpStatusCode('NOT_FOUND')).json({ message: 'Product not found in sale' });
  }
  next();
};

module.exports = {
  saleValidation,
  saleUpdateValidationInfo,
  saleUpdateValidation,
};