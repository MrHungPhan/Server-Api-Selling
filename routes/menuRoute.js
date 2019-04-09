const express = require('express');
const router = express.Router();
const cors = require('cors');

var controller = require('../controllers/menuController');

router.use(cors());

router.get('/', controller.getMenu);

module.exports = router;