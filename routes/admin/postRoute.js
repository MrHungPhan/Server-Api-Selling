const express = require('express');
const router = express.Router();
const cors = require('cors');

const controller = require('../../controllers/admin/postController')

router.use(cors());

router.get('/', controller.getPosts);

router.post('/add', controller.addPost);

router.delete('/remove/:id', controller.removePost)

module.exports = router;