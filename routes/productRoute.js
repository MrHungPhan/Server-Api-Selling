const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const controller = require('../controllers/productCotroller');

router.get('/', controller.getProducts);

router.get('/:id', controller.getProductsById);

router.get('/page/:page', controller.getProductsWithPage)

router.post('/add', controller.addProduct);


module.exports = router;