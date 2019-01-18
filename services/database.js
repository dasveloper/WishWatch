const Sequelize = require('sequelize');

const keys = require("../config/keys.js");
// const sequelize = new Sequelize(keys.mysqlDatabase, keys.mysqlUserName, keys.mysqlPassword, {
//   dialect: "postgres",
//   host: keys.mysqlHost
// });

const sequelize = new Sequelize(keys.pgDatabase, {
  dialect: "postgres",
  
    dialectOptions: {
        ssl: true
    }
});

module.exports = sequelize;
