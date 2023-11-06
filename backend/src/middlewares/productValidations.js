const { validateObjectProduct } = require('./schems/productSchems');
const { httpStatusCode } = require('../utils/httpStatus');

const validateNameProduct = (req, res, next) => {
  const { body } = req;
  const { error } = validateObjectProduct.validate(body);
  if (error) {
    return res
      .status(httpStatusCode(error.details[0].type))
      .json({ message: error.message });
  }
  next();
};
module.exports = {
  validateNameProduct,
};
