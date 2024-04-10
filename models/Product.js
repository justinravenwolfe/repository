// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
// import the Category model
const Category = require('./Category');
// import the Tag model
const Tag = require('./Tag');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false, 
      validate: {
        isNumeric: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      defaultValue: 10, 
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

// Define associations


module.exports = Product;
