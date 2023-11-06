const camelize = require('camelize');

const connection = require('./connection');

const { getFormatedColumnNames,
  getFormatedQuantityValues, getFormatedUpdate } = require('../utils/getFormatedQuery');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return camelize(products);
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return camelize(product);
};

const getProductsByName = async (name) => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?',
    [`%${name}%`],
  );
  return camelize(products);
};

const postProduct = async (product) => {
  const keys = getFormatedColumnNames(product);
  const placeHolders = getFormatedQuantityValues(product);
  const [{ insertId }] = await connection.execute(`INSERT INTO StoreManager.products
   (${keys}) VALUE(${placeHolders})`, [...Object.values(product)]);
  return insertId;
};

const updateProduct = async (product, id) => {
  const keys = getFormatedUpdate(product);
  const [{ affectedRows }] = await connection.execute(`UPDATE StoreManager.products 
  SET ${keys} WHERE id = ?`, [...Object.values(product), id]);
  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(`DELETE FROM StoreManager.products
  WHERE id = ?`, [id]);
  return affectedRows;
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductsByName,
};
