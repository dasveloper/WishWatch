const Sequelize = require('sequelize');
const host = "us-cdbr-iron-east-01.cleardb.net";
const userName = "b427a92fb703f0";
const password = "0d9671d6";
const databaseName = "heroku_f5a46445f508590";


const sequelize = new Sequelize(databaseName, userName, password, {
  dialect: "mysql",
  host: host
});

module.exports = sequelize;
