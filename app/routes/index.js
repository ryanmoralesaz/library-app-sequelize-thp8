var express = require('express');
var router = express.Router();

/* GET home page. */
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

module.exports = router;