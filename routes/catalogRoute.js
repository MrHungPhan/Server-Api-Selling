const express = require('express');
const router = express.Router();
const cors = require('cors');

const Catalog = require('../models/Catalog');
const controller = require('../controllers/catalogController')

router.use(cors());


router.get('/', controller.getCatalog);

router.get('/:id', controller.getCatalogById)

module.exports = router;