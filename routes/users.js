/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const User = require('../models/User');
// const Book = require('../models/User');
const { checkUsernameAndPasswordNotEmpty } = require('../middlewares'); //checkIfUserIsLoggedIn

/* GET users listing (for admin purposes), optional */
router.get('/users', (req, res, next) => {
	res.send('respond with a resource');
});

// Profile route
router.get('/profile', checkUsernameAndPasswordNotEmpty, (req, res, next) => {
	//  console.log('user', req.session.currentUser);
	res.json({ user: req.session.currentUser });
});

// profile edit
router.put('/:id', (req, res, next) => {
	const { username, password } = req.body;
	const { id } = req.params;

	User.findByIdAndUpdate(id, { username, password }, { new: true }).then(updatedUser => {
		res.json({
			updated: updatedUser,
		});
	});
});

// fav books
router.post('/favs/:id', async (req, res, next) => {
	const loggedInUser = req.session.currentUser;
	// eslint-disable-next-line no-underscore-dangle
	const user = await User.findById(loggedInUser._id);
	const { id } = req.params;
	user.favBooks.push(id);
	user.save();
	res.status(201).json(user);
});

// get user's favourite books
router.get('/favs', async (req, res) => {
	const loggedInUser = req.session.currentUser;
	// eslint-disable-next-line no-underscore-dangle
	const user = await User.findById(loggedInUser._id).populate('favBooks');
	res.status(201).json(user);
});

// get user's favourite books
router.get('/favids', async (req, res) => {
	const loggedInUser = req.session.currentUser;
	// eslint-disable-next-line no-underscore-dangle
	const user = await User.findById(loggedInUser._id);
	res.status(201).json(user);
});

module.exports = router;
