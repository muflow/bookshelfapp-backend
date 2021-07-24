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

// // My Books revisar con Ale
router.get('/mybooks', (req, res, next) => {
	const userId = req.session.currentUser.id;
	User.findById(userId)
		.populate('myBooks')
		.then(dbUser => {
			console.log(dbUser);
			res.json({ userbooks: dbUser.myBooks });
		})
		.catch(error => next(error));
});

module.exports = router;
