const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema(
	{
		title: { type: String, required: true },
		author: { type: String, required: true },
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
