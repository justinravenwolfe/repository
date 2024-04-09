require('dotenv').config();

const Sequelize = require('sequelize');
/*how to host this sql database */
const sequelize =  process.env.JAWSDB_URL ?
  new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize('ecommerce_db', 'root', 'password',{
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
