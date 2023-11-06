const { httpStatusCode } = require('../utils/httpStatus');
const { productsService } = require('../services');

const getAllProducts = async (req, res) => {
  const { data, status } = await productsService.getAllProducts();
  return res.status(httpStatusCode(status)).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await productsService.getProductById(id);
  return res.status(httpStatusCode(status)).json(data);
};

const getProductsByName = async (req, res) => {
  const { q } = req.query;
  const { data, status } = await productsService.getProductsByName(q);
  return res.status(httpStatusCode(status)).json(data);
};

const postProduct = async (req, res) => {
  const { body } = req;
  const { data, status } = await productsService.postProduct(body);
  return res.status(httpStatusCode(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { data, status } = await productsService.updateProduct(body, Number(id));
  return res.status(httpStatusCode(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleteProduct(id);
  return res.status(httpStatusCode(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductsByName,
};