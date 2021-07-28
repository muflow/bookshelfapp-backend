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
	const { title, author, category, description, imgUrl } = req.body;
	Book.create({ title, author, category, description, imgUrl }).then(book => {
		res.json({ created: book });
	});
});

router.put('/:id', (req, res, next) => {
	const { title, author, category, description, imgUrl } = req.body;
	const { id } = req.params;

	Book.findByIdAndUpdate(id, { title, author, category, description, imgUrl }, { new: true }).then(updatedBook => {
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

// add books a favoritos
router.post('/favs/:id', (req, res, next) => {
	const bookId = req.params.id;
	const userId = req.session.currentUser._id;
	User.findByIdAndUpdate(userId, { $push: { myBooks: bookId } })
		.then(book => {
			res.json({ book });
		})
		.catch(error => {
			console.log('Problem adding', error);
		});
});

module.exports = router;
