const express = require('express');
const router = express.Router();
const cors = require('cors');

var controller = require('../../controllers/pages/productDetailtPageController');

router.use(cors());

router.get('/:id', controller.getProductDetailt);

module.exports = router;