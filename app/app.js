const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const favicon = require('serve-favicon');
const logger = require('morgan'); // uses Morgan to log requests

const { sequelize, Book } = require('./models'); // Import Sequelize instance
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // uses Morgan to log requests
app.use(express.json()); // parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // parses URL-encoded data
app.use(cookieParser()); // parses cookies
app.use(express.static(path.join(__dirname, 'public'))); // serves static files from 'public' directory

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Page Not Found'));
});

// error handler
app.use(function (err, req, res, next) {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  console.error(`Status: ${err.status}, Message: ${err.message}`);

  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', { error: err });
  } else {
    res.status(err.status);
    res.render('error', { error: err });
  }
});

(async () => {
  try {
    await sequelize.sync({ force: false }); // Set to true if you want to drop and recreate tables
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log('Database synced successfully.');
    // read the books.json file
    const bookCount = await Book.count();
    if (bookCount > 0) return;
    const booksPath = path.join(__dirname, 'data/books.json');
    const booksData = fs.readFileSync(booksPath, 'utf-8');
    const books = JSON.parse(booksData);

    // insert boooxs into the database
    for (const book of books) {
      await Book.create(book);
    }
    // console.log('books have been loaded into the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = app;
