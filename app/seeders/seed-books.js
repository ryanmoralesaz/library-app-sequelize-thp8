'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
    // up function inserts data into the database
    up: async (queryInterface, Sequelize) => {
        // get the seed books from the json file
        const booksPath = path.join(__dirname, './books.json');
        // read from the json file
        const booksData = fs.readFileSync(booksPath, 'utf-8');
        // parse the JSON into a books object
        const books = JSON.parse(booksData);
       // insert all of the book objects into the Books table using the map method
       // pass in all of the required validation parameters using the book object keys 
        await queryInterface.bulkInsert('Books', books.map(book => ({
            title: book.title,
            author: book.author,
            genre: book.genre,
            year: book.year,
            // create a timestamp for the modification
            createdAt: new Date(),
            updatedAt: new Date()
        })), {});
    },
    // down function reverts the seed and removes information from the database
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Books', null, {});
    }
};