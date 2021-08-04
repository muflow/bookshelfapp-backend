# Project's name: Bookshelf


## Description

Bookshelf is a personal library where you can add books you would like to read, books you have read and add them to your virtual collections.

## USER STORIES (MVP)

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Splashscreen** - As a user I want to be able to access the landing page so that I see what the app is about and login and signup

**Sign up** - As a user I want to be able to create an account to use the app and save my tasks

**Login** - As a user I want to be able to log in on the webpage 

**Logout** - As a user I want to be able to log out from the webpage

**Profile** - As a user I want to be able to see my profile

**Create a new book** - As a user I want to be able to create a new book and add it to my personal collection

**Edit a book** - As a user I want to be able to edit a book that I created

**Deleta a book** - As a user I want to be able to delete a book that I created

**Favorites** - As a user I want to be able to add books I like to 'Favorites'

## BACKLOG

- Add a review to a book I've read
- Rating a book
- Find the nearest book stores directly from the app (Google map API)
- Buy a book on amazon directly from the app
- Where is my book? Books I have lent
- Barcode scanner that lets you add books directly to my collections without having to search for them


## FRONTEND ROUTES

| Name            | Method | Endpoint                      | Description                                      | Body                                  |        |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home           | GET    | /books                            | view all books                              |                                       |                 |
| Sign up    | POST   | /signup                        | Sign up a user with an account                          | {  username, email, password }                                   |              |
| Log in          | POST   | /login                        | Log in the user                                  | { usernamel, password }                      |            |
| Logout   | POST    | /logout                            | Logout a user                       |                          
| Book details   | PUT    | /books/:id                            | View book details                      |            || Create Book   | POST    | /books                           | View form to create a new book                      | { title, author, category, description, imgUrl }                              |  |
| Edit Book   | PUT    | /books/:id                          | Edit book form                     | {{ title, author, category, description, imgUrl }                    
| Delete book   | DELETE    | /books/:id                         | Book delete button                      |       |         | Add to favorites   | POST    | /user/favs/:id                         | Add to favorite books button                      | 
| User profile   | GET    | /user/favs/                         | See user profile                      |

## MODELS

Book model

```js
{
    title: {
        type:String,
        required: true
    }
    author: {
        Type:String,
        required: true
    }    
    description: String,
    imgUrl: {
		type: String,
		default: 'https://....png',
		},
	category: {
		type: String,
	}
}
```

User model

```js
{
    username: {
		type: String,
		required: true,
		unique: true,
	},

	hashedPassword: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		unique: true,
	},

	favBooks: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Book',
	}
}
```

## LINKS

### Github project

- [Frontend project](https://github.com/muflow/bookshelfapp-frontend)
- [Backend project](https://github.com/muflow/bookshelfapp-backend)

### Deploy links

- [Frontend deploy](https://bookshelfapplication.netlify.app/)