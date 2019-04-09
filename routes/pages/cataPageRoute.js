const express = require('express');
const router = express.Router();
const cors = require('cors');

var controller = require('../../controllers/pages/cataPageController');

router.use(cors());

router.get('/:name', controller.getProductsWithCatalog);

router.get('/:name/:childName', controller.getProductsWithChildName);

module.exports = router;