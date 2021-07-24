const express = require('express');

const router = express.Router();

// const createError = require('http-errors');

const Book = require('../models/Book');
const User = require('../models/User');

/* GET books listing. */
router.get('/', (req, res, next) => {
	Book.find().then(books => {
		res.json({ found: books });
	});
});

router.get('/:id', (req, res, next) => {
	const { id } = req.params;
	Book.findById(id)
		.then(book => {
			if (book === null) {
				return res.status(404).json({ error: 'not found' });
			}
			return res.json({ found: book });
		})
		.catch(error => {
			next(error);
		});
});

router.post('/', (req, res, next) => {
	const { title, author } = req.body;
	Book.create({ title, author }).then(book => {
		res.json({ created: book });
	});
});

router.put('/:id', (req, res, next) => {
	const { title, author } = req.body;
	const { id } = req.params;

	Book.findByIdAndUpdate(id, { title, author }, { new: true }).then(updatedBook => {
		res.json({
			updated: updatedBook,
		});
	});
});

router.delete('/:id', (req, res, next) => {
	const { id } = req.params;

	Book.findByIdAndDelete(id).then(deletedBook => {
		res.json({
			deleted: deletedBook,
		});
	});
});

// revisar con Ale
router.post('/favs/:id', (req, res, next) => {
	const bookId = req.params.id;
	// eslint-disable-next-line no-underscore-dangle
	const userId = req.session.currentUser._id;
	User.findByIdAndUpdate(userId, { $push: { myBooks: bookId } })
		.then(book => {
			res.json({ book });
		})
		.catch(error => {
			console.log('Problem adding', error);
		});
});

// router.get('/', async (req, res, next) => {
// 	if (req.session.currentUser) {
// 		try {
// 		const books = await Book.find({});
// 		if (books) {
// 			res.json({books})
// 		}
// 	} catch {
// 		next(createError(401));
// 	}
// };

// router.post('/signup', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
// 	const { username, password } = res.locals.auth;
// 	try {
// 		const user = await User.findOne({ username });
// 		if (user) {
// 			return next(createError(422));
// 		}

// 		const salt = bcrypt.genSaltSync(bcryptSalt);
// 		const hashedPassword = bcrypt.hashSync(password, salt);

// 		const newUser = await User.create({ username, hashedPassword });
// 		req.session.currentUser = newUser;
// 		return res.json(newUser);
// 	} catch (error) {
// 		return next(error);
// 	}
// });
// This is useful for nothing

// router.post('/login', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
// 	const { username, password } = res.locals.auth;
// 	try {
// 		const user = await User.findOne({ username });
// 		if (!user) {
// 			return next(createError(404));
// 		}
// 		if (bcrypt.compareSync(password, user.hashedPassword)) {
// 			req.session.currentUser = user;
// 			return res.json(user);
// 		}
// 		return next(createError(404));
// 	} catch (error) {
// 		return next(error);
// 	}
// });

// router.post('/logout', (req, res, next) => {
// 	req.session.destroy(err => {
// 		if (err) {
// 			next(err);
// 		}

// 		return res.status(204).send();
// 	});
// });

module.exports = router;
