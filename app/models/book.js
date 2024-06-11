'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      title: {
        // ensure book title is a string
        type: DataTypes.STRING,
        // book title can't be null or empty
        allowNull: false,
        // send a message to user that book title can't be empty
        validate: { notEmpty: { msg: 'Title is required' } }
      },
      author: {
        // ensure author name is a string
        type: DataTypes.STRING,
        // author name can't be null
        allowNull: false,
        // validation message to user that author is required
        validate: { notEmpty: { msg: 'Author is required' } }
      },
      genre: {
        // genre type has to be a string
        type: DataTypes.STRING,
        // genre can't be null or empty
        allowNull: false,
        // validation error to the user that genre is required
        validate: { notEmpty: { msg: 'Genre is required' } }
      },
      year: {
        // year has to be an integer
        type: DataTypes.INTEGER,
        // year can't be null or empty
        allowNull: false,
        // validation messages to the user that year is required and must be a number
        validate: {
          notEmpty: { msg: 'Year is required' },
          isInt: { msg: 'year must be a number' }
        }
      }
    },
    {
      sequelize,
      modelName: 'Book'
    }
  );
  return Book;
};
