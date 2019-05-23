const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
const passportConf = require('../../passport');

const passportSecret = passport.authenticate('jwt', {session : false});

var controller = require('../../controllers/pages/cartController');

router.use(cors());

router.post('/add', passportSecret, controller.addToCart);

router.post('/deleteItem', passportSecret, controller.deleteCartItem);

router.post('/updateItem', passportSecret, controller.updateCartItem)

router.get('/getCart', passportSecret, controller.getCart);


module.exports = router;