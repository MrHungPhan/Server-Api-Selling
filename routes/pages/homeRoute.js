const express = require('express');
const router = express.Router();
const cors = require('cors');

var controller = require('../../controllers/pages/homeController');

router.use(cors());

router.get('/products', controller.getProductsHome);

module.exports = router;