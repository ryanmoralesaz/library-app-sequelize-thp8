var express = require('express');
var router = express.Router();

const books = [
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    genre: 'Fantasy',
    year: 2008,
    url: '/books/1'
  },
  {
    title: 'Catching Fire',
    author: 'Suzanne Collins',
    genre: 'Fantasy',
    year: 2009,
    url: '/books/2'
  },
  {
    title: 'Mockingjay',
    author: 'Suzanne Collins',
    genre: 'Fantasy',
    year: 2010,
    url: '/books/3'
  },
  {
    title: 'The Ballad of Songbirds and Snakes',
    author: 'Suzanne Collins',
    genre: 'Fantasy',
    year: 2020,
    url: '/books/4'
  },
  {
    title: 'The Memory Police',
    author: 'Yoko Ogawa',
    genre: 'Science Fiction',
    year: 1994,
    url: '/books/5'
  },
  {
    title: 'Nickel Boys',
    author: 'Colson Whitehead',
    genre: 'Historical Fiction',
    year: 2019,
    url: '/books/6'
  },
  {
    title: 'The Book of Unknown Americans',
    author: 'Cristina Henriquez',
    genre: 'Fiction',
    year: 2014,
    url: '/books/7'
  },
  {
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    genre: 'Non Fiction',
    year: 1988,
    url: '/books/8'
  },
  {
    title: 'Armada',
    author: 'Ernest Cline',
    genre: 'Science Fiction',
    year: 2015,
    url: '/books/9'
  },
  {
    title: 'Emma',
    author: 'Jane Austen',
    genre: 'Classic',
    year: 1815,
    url: '/books/10'
  },
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
    genre: 'Horror',
    year: 1818,
    url: '/books/11'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Classic',
    year: 1813,
    url: '/books/12'
  },
  {
    title: 'Ready Player One',
    author: 'Ernest Cline',
    genre: 'Science Fiction',
    year: 2011,
    url: '/books/13'
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    year: 2014,
    url: '/books/14'
  },
  {
    title: 'The Universe in a Nutshell',
    author: 'Stephen Hawking',
    genre: 'Non Fiction',
    year: 2001,
    url: '/books/15'
  }
];

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Books', books: books });
});

module.exports = router;
