const { httpStatusCode } = require('../utils/httpStatus');
const { salesServices } = require('../services/index');

const getAllSales = async (req, res) => {
  const { data, status } = await salesServices.getAllSales();
  return res.status(httpStatusCode(status)).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await salesServices.getSaleById(id);
  return res.status(httpStatusCode(status)).json(data);
};

const createSale = async (req, res) => {
  const { body } = req;
  const { data, status } = await salesServices.createSaleProduct(body);
  return res.status(httpStatusCode(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesServices.deleteSale(id);
  return res.status(httpStatusCode(status)).json(data);
};

const updateSale = async (req, res) => {
  const { saleId, productId } = req.params;
  const { body } = req;
  const { status, data } = await salesServices.updateSale(productId, saleId, body);

  return res.status(httpStatusCode(status)).json(data);
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  deleteSale,
  updateSale,
};