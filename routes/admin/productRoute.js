const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

// const multer = require("multer");

// const storage = multer.diskStorage({
//    destination: function(req, file, cb){
//    		cb(null, './uploads/')
//    },
//    filename: function(req, file, cb){
//       cb(null, new Date().toISOString() + file.originalname);
//    }
// });

// var upload = multer({storage : storage})


const controller = require('../../controllers/admin/productController');

router.get('/', controller.getProducts);

router.get('/style', controller.getStyle)

router.post('/add', controller.addProduct);

router.delete('/removeImage', controller.removeImage)

router.delete('/remove/:id', controller.removeProduct)

router.get('/:id', controller.getProductsById);

router.get('/page/:page', controller.getProductsWithPage)

router.post('/uploadImage',controller.uploadImage);

module.exports = router;