const express = require('express');

const router = express.Router();
const User = require('../models/User');
const { checkUsernameAndPasswordNotEmpty } = require('../middlewares'); //checkIfUserIsLoggedIn

/* GET users listing (for admin purposes), optional */
router.get('/users', (req, res, next) => {
  res.send('respond with a resource');
});

// Profile route
router.get('/profile', checkUsernameAndPasswordNotEmpty, (req, res, next) => {
  //console.log('user', req.session.currentUser);
  res.json({ user: req.session.currentUser });
});



module.exports = router;