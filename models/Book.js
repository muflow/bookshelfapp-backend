const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			// enum: ['Art', 'Biography', 'Comics', 'Crime', 'Fantasy', 'Thriller', 'Travel', 'Drama', 'Romance'],
		},
		description: {
			type: String,
		},
		imgUrl: {
			type: String,
			default: 'https://www.pinclipart.com/picdir/big/169-1690579_book-icon-png-clip-art-transparent-download-book.png',
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
