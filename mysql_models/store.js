const Sequelize = require("sequelize");
const sequelize = require("../services/database");

const Store = sequelize.define("store", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  website: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  owner: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  verified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false

  }
});

module.exports = Store;