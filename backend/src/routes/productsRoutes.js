const router = require('express').Router();
const { productControl } = require('../controllers');
const { validateNameProduct } = require('../middlewares');

router.get('/search', productControl.getProductsByName);

router.get('/', productControl.getAllProducts);

router.get('/:id', productControl.getProductById);

router.post('/', validateNameProduct, productControl.postProduct);

router.put('/:id', validateNameProduct, productControl.updateProduct);

router.delete('/:id', productControl.deleteProduct);

module.exports = router;