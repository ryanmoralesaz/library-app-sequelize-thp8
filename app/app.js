const express = require('express');
const fs = require('fs');
const path = require('path');
const createError = require('http-errors');
const favicon = require('serve-favicon');
const logger = require('morgan'); // uses Morgan to log requests

const { sequelize } = require('./models'); // Import Sequelize instance
// const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];
// console.log('database config', config); // log the path of the config for testing correct paths
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// pass a favicon path to resolve some console errors
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // uses Morgan to log requests
app.use(express.json()); // parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // parses URL-encoded data
app.use(express.static(path.join(__dirname, 'public'))); // serves static files from 'public' directory
// utilize the routes
app.use('/', indexRouter);
app.use('/books', booksRouter);

// catch 404 if path doesn't resolve in routes and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Page Not Found'));
});

// global error handler for catching any kind of error
app.use(function (err, req, res, next) {
  // assign the status and message to the passed in created error or set it to a default server error
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  console.error(`Status: ${err.status}, Message: ${err.message}`);
  // render the 404 page if the resource was not found
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', { error: err });
  } else {
    // render the status and message of anything but a 404
    res.status(err.status);
    res.render('error', { error: err });
  }
});
// redundant seeding function that's now being called from the seeders folder but I want to 
// keep it for syntax reference
// async function seedDatabase() {
//   const bookCount = await Book.count(); // count the number of books
//   if (bookCount > 0) return; // if there are books already in the database abort the seed
//   const booksPath = path.join(__dirname, 'seeders/books.json');
//   const booksData = fs.readFileSync(booksPath, 'utf-8');
//   const books = JSON.parse(booksData);

//   // insert books into the database
//   for (const book of books) {
//     await Book.create(book);
//   }
//   // console.log('books have been loaded into the database');

// }
(async () => {
  try {
    await sequelize.sync({ force: false }); // Set to true if you want to drop and recreate tables
    await sequelize.authenticate(); // authenticate the sequelization
    console.log('Connection has been established successfully.');
    console.log('Database synced successfully.');

    // await seedDatabase(); // make a promise for the database seeding
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = app;
