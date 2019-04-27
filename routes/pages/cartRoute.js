const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
const passportConf = require('../../passport');

const passportSecret = passport.authenticate('jwt', {session : false});

var controller = require('../../controllers/pages/cartController');

router.use(cors());

router.post('/add', passportSecret, controller.addToCart);

router.get('/getCart', passportSecret, controller.getCart);

router.get('/hook', (req, res, next) => {
    res.json(req.query);
})

module.exports = router;