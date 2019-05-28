const express = require('express');
const router = express.Router();
const cors = require('cors');

var controller = require('../../controllers/pages/postController');

router.use(cors());

router.get('/getPosts', controller.getPosts);

router.get('/:id', controller.getPostDetailt);

module.exports = router;