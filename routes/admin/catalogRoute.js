const express = require('express');
const router = express.Router();
const cors = require('cors');

const controller = require('../../controllers/admin/catalogController')

router.use(cors());


router.get('/', controller.getCatalog);

router.get('/:id', controller.getCatalogById)

module.exports = router;