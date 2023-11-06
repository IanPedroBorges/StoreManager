const camelize = require('camelize');
const connection = require('./connection');
const { 
  getFormatedColumnNames,
  getFormatedQuantityValues, getFormatedUpdate } = require('../utils/getFormatedQuery');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT  sp.sale_id, s.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales AS s RIGHT JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id 
    ORDER BY sp.sale_id, sp.product_id`,
  );
  return camelize(sales);
};

const getUnicSaleById = async (id) => {
  const [sale] = await connection.execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);
  return camelize(sale);
};

const getSalesById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
        FROM StoreManager.sales_products AS sp 
        JOIN StoreManager.sales AS s ON s.id = sp.sale_id 
        WHERE sp.sale_id = ? ORDER BY sp.product_id`,
    [id],
  );
  return camelize(sale);
};

const createSale = async () => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (?)', [new Date()]);
  return insertId;
};

const createSaleProduct = async (sales) => {
  const promises = sales.map((sale) => {
    const keys = getFormatedColumnNames(sale);
    const placeHolders = getFormatedQuantityValues(sale);
    return connection.execute(`INSERT INTO StoreManager.sales_products 
     (${keys}) VALUES (${placeHolders})`, [...Object.values(sale)]);
  });
  await Promise.all(promises);
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(`DELETE FROM StoreManager.sales
  WHERE id = ?`, [id]);
  return affectedRows;
};

const deleteSaleProducts = async (id) => {
  const [{ affectedRows }] = await connection.execute(`DELETE FROM StoreManager.sales_products
  WHERE sale_id = ?`, [id]);
  return affectedRows;
};

const updateSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(`UPDATE StoreManager.sales
  SET date = ? WHERE id = ?`, [new Date(), id]);
  return affectedRows;
};

const updateSalesProducts = async (idSale, idProduct, quantity) => {
  const keysUpdate = getFormatedUpdate(quantity);
  const values = Object.values(quantity);
  const [{ affectedRows }] = await connection.execute(`UPDATE StoreManager.sales_products
  SET ${keysUpdate} WHERE sale_id = ? AND  product_id = ?`, [...values, idSale, idProduct]);
  return affectedRows;
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  createSaleProduct,
  deleteSale,
  deleteSaleProducts,
  updateSale,
  updateSalesProducts,
  getUnicSaleById,
};