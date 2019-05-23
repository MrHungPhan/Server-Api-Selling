const express = require('express');
const router = express.Router();
const cors = require('cors');

var controller = require('../../controllers/pages/searchController');

router.use(cors());

router.get('/', controller.searchProducts);

module.exports = router;