const router = require('express').Router();

const { salesControl } = require('../controllers');
const { 
  saleValidation, saleUpdateValidation, saleUpdateValidationInfo } = require('../middlewares');

router.get('/', salesControl.getAllSales);

router.get('/:id', salesControl.getSaleById);

router.post('/', saleValidation, salesControl.createSale);

router.delete('/:id', salesControl.deleteSale);

router.put(
  '/:saleId/products/:productId/quantity',
  saleUpdateValidationInfo,
  saleUpdateValidation,
  salesControl.updateSale,
);

module.exports = router;