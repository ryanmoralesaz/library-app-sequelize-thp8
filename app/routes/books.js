const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { Op } = require('sequelize');
const { Book } = require('../models');

// get books shows the full list of books
router.get('/', async function (req, res, next) {
  try {
    const search = req.query.search || '';
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 10; // Number of books per page
    const offset = (page - 1) * limit;

    const where = {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { author: { [Op.like]: `%${search}%` } },
        { genre: { [Op.like]: `%${search}%` } },
        { year: { [Op.like]: `%${search}%` } }
      ]
    };

    const { rows: books, count } = await Book.findAndCountAll({
      where,
      limit,
      offset
    });

    const pages = Math.ceil(count / limit);
    res.render('index', { title: 'Books', books, search, page, pages });
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

// GET /books/:id - shows book detail form
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

// POST /books/:id - updates book info in the database
router.post('/:id', async function (req, res, next) {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect('/books');
    } else {
      next(createError(404, 'Book Not Found'));
    }
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const book = await Book.build(req.body);
      book.id = req.params.id;
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
      await book.destroy();
      res.redirect('/books');
    } else {
      next(createError(404, 'Book Not Found'));
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
