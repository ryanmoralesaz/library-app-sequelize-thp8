const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { Book } = require('../models'); // Import Sequelize instance
// GET home page. redirects to /books
router.get('/', function (req, res, next) {
  // res.render("index", { title: "Express" });
  res.redirect('/books');
});

/* Route that throws an error for testing */
router.get('/error', function (req, res, next) {
  const error = new Error('Intentional Error');
  error.status = 500;
  next(error);
});
// route that throws an async error
router.get('/async-error', async (req, res, next) => {
  try {
    // simulate an asynchronous operation that fails
    await new Promise((resolve, reject) => setTimeout(() => reject(new Error('simulated async error')), 1000));
  } catch (err) {
    next(err);
  }
});
// route that throws a simulated database sync error for testing
router.get('/db-error', async (req, res, next) => {
  try {
    // simulated database operation that fails finding invalid id
    const book = await Book.findByPk(-1); // invalid id
    // if book doesn't exist
    if (!book) {
      throw new Error('Book not found');
    }
    // return the impossible book if found
    res.json(book);
  } catch (err) {
    // send error to global error handler middleware
    next(createError(400, err));
  }
});
module.exports = router;
