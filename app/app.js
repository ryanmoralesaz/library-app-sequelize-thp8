const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const logger = require('morgan'); // uses Morgan to log requests

const { sequelize } = require('./models'); // Import Sequelize instance
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev')); // uses Morgan to log requests
app.use(express.json()); // parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // parses URL-encoded data
app.use(cookieParser());// parses cookies
app.use(express.static(path.join(__dirname, 'public'))); // serves static files from 'public' directory

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error('Page Not Found');
  error.status = 404;

  next(error);
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
  const db = require('./models');
  try {
    await sequelize.sync({ force: false }); // Set to true if you want to drop and recreate tables
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log('Database synced successfully.');

    // Start the server after the database is synced
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = app;
