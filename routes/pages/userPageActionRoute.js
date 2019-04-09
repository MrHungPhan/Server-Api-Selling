const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
const passportConf = require('../../passport');

const passportSignIn = passport.authenticate('local', { session: false });
const passportSecret = passport.authenticate('jwt', {session : false});
const passportGoogle = passport.authenticate('googleToken', {session : false})
const passportFacebook = passport.authenticate('facebookToken', {session : false}) ;

var controller = require('../../controllers/pages/userActionController');

router.use(cors());

router.post('/signUp', controller.postSingUp);

router.post('/signIn',passportSignIn, controller.postSingIn);

router.post('/oauth/google', passportGoogle, controller.googleOauth)

router.post('/oauth/facebook', passportFacebook, controller.facebookOauth)

router.post('/profile',passportSecret, controller.getUserProfile);

module.exports = router;