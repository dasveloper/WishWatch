const Sequelize = require("sequelize");
const sequelize = require("../services/database");
const uuidv4 = require('uuid/v4');

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
  prodListVersion:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  prodListUpdated:{
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.fn('NOW')
  },
  verificationCode:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: function(){
      return `wishwatch-verification=${uuidv4()}`
    }
  },
  verified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false

  }
});

module.exports = Store;