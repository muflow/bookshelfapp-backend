const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Book = require('../models/User');
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
router.post('user/favs/:id', async (req, res, next) => {
	const loggedInUser = req.session.currentUser;
	const user = await User.findById(loggedInUser._id);
	const { id } = req.params;

	user.favBooks.push(id);
	user.save();
	// Book.findById(id)
	// 	.then(book => {
	// 		if (book === null) {
	// 			return res.status(404).json({ error: 'not found' });
	// 		}
	// 		return res.json({ title, author });
	// 	})
	// 	.catch(error => {
	// 		next(error);
	// 	});
	res.status(201).json(user);
});

module.exports = router;
