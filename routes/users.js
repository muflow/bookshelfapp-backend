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
  const userId = req.session.currentUser._id;
  User.findById(userId)
    .populate('myBooks')
    .then(dbUser => {
      console.log(dbUser);
      res.json({ book: dbUser.myBooks });
    })
    .catch(error => next(error));
});



// Edit profile form
// router.put('/profile', (req, res, next) => {
// 	console.log(req.session.currentUser);
// 	res.json({ user: req.session.currentUser });
// });

// router.post('/profile/edit', (req, res, next) => {
//   const id = req.session.currentUser._id;
//   const { firstName, lastName, email } = req.body;
//   console.log(id, req.body);
//   User.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true })
//     .then(updatedUser => {
//       req.session.currentUser = updatedUser;
//     })
//     .then(() => {
//       res.redirect('/users/profile');
//     })
//     .catch(error => {
//       console.log('Could not update user', error);
//       res.render('error');
//     });
//   //res.redirect('/users/profile');
// });

// // My events
// router.get('/myevents', (req, res, next) => {
//   const userId = req.session.currentUser._id;
//   User.findById(userId)
//     .populate('myEvents')
//     .then(dbUser => {
//       console.log(dbUser);
//       res.render('events/events-fav', { event: dbUser });
//     })
//     .catch(error => next(error));
// });
// Delete user

module.exports = router;