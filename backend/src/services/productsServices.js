const { productsModel } = require('../models');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  if (allProducts.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Products not found' } };
  }
  return { status: 'OK', data: allProducts };
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'OK', data: product };
};

const getProductsByName = async (name) => {
  const product = await productsModel.getProductsByName(name);
  console.log(product);
  
  return { status: 'OK', data: product };
};

const postProduct = async (product) => {
  const idProduct = await productsModel.postProduct(product);
  if (!idProduct) {
    return { status: 'ERROR_SERVIDOR', data: { message: 'ERROR SERVIDOR' } };
  }
  return { status: 'CREATED', data: { id: idProduct, ...product } };
};

const updateProduct = async (product, id) => {
  const productExist = await productsModel.getProductById(id);
  if (productExist === undefined) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  const affectedRows = await productsModel.updateProduct(product, id);
  if (affectedRows === 0) {
    return { status: 'ERROR_SERVIDOR', data: { message: 'ERROR SERVIDOR' } };
  }
  return { status: 'OK', data: { id, ...product } };
};

const deleteProduct = async (id) => {
  const productExist = await productsModel.getProductById(id);
  if (productExist === undefined) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  const affectedRows = await productsModel.deleteProduct(id);
  if (affectedRows === 0) {
    return { status: 'ERROR_SERVIDOR', data: { message: 'ERROR SERVIDOR' } };
  }
  return { status: 'NO_CONTENT' };
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductsByName,
};
