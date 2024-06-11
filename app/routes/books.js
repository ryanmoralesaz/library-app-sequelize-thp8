const express = require('express');
const router = express.Router();
// utilize http-errors module
const createError = require('http-errors');
const { Book } = require('../models');

// GET / redirects to /books shows the full list of books
router.get('/', async function (req, res, next) {
  try {
    const books = await Book.findAll();
    // render all of the books from the database Book model to the pug index template
    res.render('index', { title: 'Books', books });
  } catch (err) {
    next(err);
  }
});

// GET /books/new - shows the create new book form
router.get('/new', function (req, res, next) {
  res.render('new-book', { title: 'New Book' });
});

// POST /books/new - posts a new book to the database
router.post('/new', async function (req, res, next) {
  try {
    const book = await Book.create(req.body);
    res.redirect('/books');
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const book = await Book.build(req.body);
      res.render('new-book', { title: 'New Book', book, errors: err.errors });
    } else {
      next(err);
    }
  }
});

// GET /books/:id - shows book details form updating
router.get('/:id', async function (req, res, next) {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render('update-book', { title: 'Update Book', book });
    } else {
      next(createError(404, 'Book Not Found'));
    }
  } catch (err) {
    next(err);
  }
});

// POST /books/:id - updates book info in the database based on the book id
router.post('/:id', async function (req, res, next) {
  try {
    // find the book by its primary key matching to the request parameters id
    const book = await Book.findByPk(req.params.id);
    if (book) {
      // update the book with the request body if its found
      await book.update(req.body);
      // go back to the books route which should display the updated books
      res.redirect('/books');
    } else {
      // if the book is not found throw an error to the global error handler
      next(createError(404, 'Book Not Found'));
    }
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      // build a book from the current form information but don't save to the database
      const book = await Book.build(req.body);
      book.id = req.params.id;
      // render the update book page but with the error messages for the pug template to render
      res.render('update-book', {
        title: 'Update Book',
        book,
        errors: err.errors
      });
    } else {
      next(err);
    }
  }
});

// POST /books/:id/delete - deletes a book
router.post('/:id/delete', async function (req, res, next) {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      // delete the book with the matching Pk 
      await book.destroy();
      res.redirect('/books');
    } else {
      // if the book matching the Pk isn't found in the database redirect to 404 error page
      next(createError(404, 'Book Not Found'));
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
