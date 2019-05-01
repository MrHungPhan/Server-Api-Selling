const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
const passportConf = require('../../passport');

const passportSecret = passport.authenticate('jwt', {session : false});

var controller = require('../../controllers/pages/orderController');

router.use(cors());

router.get('/getDistricts', controller.getDistricts);

router.post('/getWards', controller.getWards);

router.post('/getServices', controller.getServices);

router.post('/checkoutOrder',passportSecret, controller.checkoutOrder);

router.get('/verify', controller.verifyOrder)

module.exports = router;