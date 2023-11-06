const { salesModel, productsModel } = require('../models');

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  if (allSales.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sales not found' } };
  }
  return { status: 'OK', data: allSales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSalesById(id);
  if (sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'OK', data: sale };
};

const verifyProductId = async (sale) => {
  const { productId } = sale;
  const product = await productsModel.getProductById(productId);
  return product === undefined;
};

const createSaleProduct = async (sales) => {
  const verify = sales.map((sale) => verifyProductId(sale));
  const responses = await Promise.all(verify);
  if (responses.some((e) => e === true)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  const idSale = await salesModel.createSale();
  const saleProducts = sales.map((sale) => ({ ...sale, saleId: idSale }));
  await salesModel.createSaleProduct(saleProducts);
  const newSaleInfo = {
    id: idSale,
    itemsSold: sales,
  };
  return { status: 'CREATED', data: newSaleInfo };
};

const deleteSale = async (id) => {
  const rowSaleProduct = await salesModel.deleteSaleProducts(id);
  const rowSales = await salesModel.deleteSale(id);
  if (rowSaleProduct === 0 || rowSales === 0) {
    return { status: 'ERROR_SERVIDOR', data: { message: 'ERROR SERVIDOR' } };
  }
  return { status: 'NO_CONTENT' };
};

const updateSale = async (idProduct, idSale, quantity) => {
  const rowSaleProduct = await salesModel.updateSalesProducts(idSale, idProduct, quantity);
  if (rowSaleProduct === 0) {
    return { status: 'ERROR_SERVIDOR', data: { message: 'ERROR SERVIDOR' } };
  }
  const date = await salesModel.getSalesById(idSale);
  const dateSale = date.find((e) => e.productId === Number(idProduct));
  return { status: 'OK', data: { ...dateSale, saleId: Number(idSale) } };
};

module.exports = {
  getAllSales,
  getSaleById,
  createSaleProduct, 
  verifyProductId, 
  deleteSale,
  updateSale,
};