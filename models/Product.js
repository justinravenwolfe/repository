// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id:{
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
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      defaultValue: 10, 
    },
    category_id: {
      type: DataTypes.INTEGER,
    }
    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  },
);
  Product.belongsTo(Category, {
    foreignKey: {
      allowNull: false // Ensures that a product must have a category
    }
  });

module.exports = Product;
