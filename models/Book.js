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
			enum: ['Art', 'Biography', 'Comics', 'Crime', 'Fantasy', 'Thriller', 'Travel', 'Drama', 'Romance'],
		},
		description: {
			type: String,
		},
		imgUrl: {
			type: String,
			default: 'https://www.gimnasiodelnorte.edu.co/wp-content/uploads/2020/07/2cfc93d7665f5d7728782700e50596e3.png',
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
